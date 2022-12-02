import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Device from 'src/db/entities/device.entity';
import User from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';
import CreateDeviceDto from './dto/createDevice.dto';
import UpdateDeviceDto from './dto/updateDevice.dto';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private deviceRepository: Repository<Device>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async delete(device: Device) {
    const deleteResponse = await this.deviceRepository.delete({
      ...device,
    });
    if (!deleteResponse.affected) {
      throw new HttpException('Device not found', HttpStatus.NOT_FOUND);
    }
  }

  async update(device: UpdateDeviceDto) {
    const deviceToUpdate = await this.deviceRepository.findOne({
      where: { id: device.id },
    });

    if (deviceToUpdate) {
      if (device.userId) {
        //see if user exists
        const user = await this.userRepository.findOne({
          where: { id: device.userId },
        });

        if (user) {
          deviceToUpdate.user = user;
        } else {
          
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
      }else if(device.userId === null){
        deviceToUpdate.user = null;
      }
      return await this.deviceRepository.save({ ...deviceToUpdate, ...device });
    }
    throw new HttpException('Device not found', HttpStatus.NOT_FOUND);
  }

  async create(device: CreateDeviceDto) {
    const newDevice = this.deviceRepository.create(device);
    await this.deviceRepository.save(newDevice);
    return newDevice;
  }

  async find(device: Device) {
    return await this.deviceRepository.find({ where: { ...device } });
  }
}
