import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { io } from 'socket.io-client';
import Device from 'src/db/entities/device.entity';
import Energy from 'src/db/entities/energy.entity';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import CreateEnergyDto from './dto/create.energy.dts';
import UpdateEnergyDto from './dto/update.energy.dto';

const SOCKET_SERVER = process.env.SOCKET_SERVER!;

const socket = io(SOCKET_SERVER);

@Injectable()
export class EnergyService {
  constructor(
    @InjectRepository(Energy)
    private readonly energyRepository: Repository<Energy>,
    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>,
  ) {}

  public async getEnergy(energy: Energy) {
    return await this.energyRepository.find({ where: { ...energy} });
  }

  public async createEnergy(energy: CreateEnergyDto): Promise<Energy> {
    const newEnergy = this.energyRepository.create(energy);
    if (await this.energyRepository.save(newEnergy)) {
      if (
        await this.deviceRepository.findOne({ where: { id: energy.deviceId } })
      ) {
        newEnergy.device = (await this.deviceRepository.findOne({
          where: { id:  energy.deviceId },
        }));
        return this.energyRepository.save(newEnergy);
      }
      throw new HttpException('Device not found', HttpStatus.NOT_FOUND);
    }
  }

  public async updateEnergy(energy: Energy): Promise<Energy> {
    const itemToUpdate = await this.energyRepository.findOne({ where: { ...energy } });
    if (itemToUpdate) {
      if (
        await this.energyRepository.save({...itemToUpdate, ...energy})
      ) {
        return await this.energyRepository.findOne({
          where: { ...energy },
        });
      }
      throw new HttpException('Energy not updated', HttpStatus.BAD_REQUEST);
    }
    throw new HttpException('Energy not found', HttpStatus.NOT_FOUND);
  }

  public async deleteEnergy(energy: Energy) {
    const deleteResponse = await this.energyRepository.delete({
     ...energy
    });
    if (!deleteResponse.affected) {
      throw new HttpException('Energy not found', HttpStatus.NOT_FOUND);
    }
  }

  //Get the first and last entry of the energy consumption for a device in the provided hour
  public async getHourlyConsumption(deviceId: number, date: Date) {
    //Get the last entry of the hour
    const lastEntry = await this.energyRepository.findOne({
      where: { device: { id: deviceId
      }, timeStamp: LessThanOrEqual(date) },
      order: { timeStamp: 'DESC' },
    });

    //Get the first entry of the hour
    date.setMinutes(0);
    date.setSeconds(0);
    const firstEntry = await this.energyRepository.findOne({
      where: { device: { id: deviceId }, timeStamp: MoreThanOrEqual(date) },
      order: { timeStamp: 'ASC' },
    });

    if (firstEntry && lastEntry) {
      return lastEntry.consumption - firstEntry.consumption;
    }
  }
  
  public async handleEnergyEvent(energy: Energy) {
    //add the energy to the database
    await this.createEnergy({deviceId: energy.device.id, consumption: energy.consumption, timeStamp: energy.timeStamp} as CreateEnergyDto);

    //If the energy consumption in the last hour is greater then the device threshold, send an alert
    const hourlyConsumption = await this.getHourlyConsumption(energy.device.id, energy.timeStamp);
    const device = await this.deviceRepository.findOne({ where: { id: energy.device.id } });
    if (
      hourlyConsumption > device.maximumHourlyConsumption) {
      socket.emit('alert', {
        deviceId: device.id,
        deviceName: device.address,
        hourlyConsumption: hourlyConsumption,
      });
    }
  }
}
