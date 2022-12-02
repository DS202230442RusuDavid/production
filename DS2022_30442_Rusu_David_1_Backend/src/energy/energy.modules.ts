import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Device from 'src/db/entities/device.entity';
import Energy from 'src/db/entities/energy.entity';
import EnergyController from './energy.controller';
import { EnergyService } from './energy.service';

@Module({
  imports: [TypeOrmModule.forFeature([Energy]), TypeOrmModule.forFeature([Device])],
  providers: [EnergyService],
  controllers: [EnergyController],
  exports: [EnergyService],
})
export default class EnergyModule {}
