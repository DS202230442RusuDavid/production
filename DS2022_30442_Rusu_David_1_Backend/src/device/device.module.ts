import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import Device from "src/db/entities/device.entity";
import User from "src/db/entities/user.entity";
import DeviceController from "./device.controller";
import { DeviceService } from "./device.service";

@Module({
    imports: [TypeOrmModule.forFeature([Device]),TypeOrmModule.forFeature([User])],
    providers: [DeviceService],
    controllers: [DeviceController],
    exports: [DeviceService]
  })

export default class DeviceModule {}