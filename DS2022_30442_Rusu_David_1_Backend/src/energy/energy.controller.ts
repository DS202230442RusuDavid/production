import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import Energy from 'src/db/entities/energy.entity';
import Role from 'src/roles/role.enum';
import RoleGuard from 'src/roles/role.guard';
import CreateEnergyDto from './dto/create.energy.dts';
import UpdateEnergyDto from './dto/update.energy.dto';
import { EnergyService } from './energy.service';

@Controller('energy')
export default class EnergyController {
  constructor(private readonly energyService: EnergyService) {}

  @Post('/getEnergy')
  @UseGuards(RoleGuard(Role.User))
  public async getEnergy(@Body() energy: Energy){
    return await this.energyService.getEnergy(energy);
  }

  @Post()
  @UseGuards(RoleGuard(Role.Admin))
  public async createEnergy(@Body() energy: CreateEnergyDto): Promise<Energy> {
    return await this.energyService.createEnergy(energy);
  }

  @Patch()
  @UseGuards(RoleGuard(Role.Admin))
  public async updateEnergy(@Body() energy: Energy): Promise<Energy> {
    return await this.energyService.updateEnergy(energy);
  }

  @Delete()
  @UseGuards(RoleGuard(Role.Admin))
  public async deleteEnergy(@Body() energy: Energy) {
    return await this.energyService.deleteEnergy(energy);
  }

}
