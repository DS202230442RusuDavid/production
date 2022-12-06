import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import Device from "src/db/entities/device.entity";
import Role from "src/roles/role.enum";
import RoleGuard from "src/roles/role.guard";
import { DeviceService } from "./device.service";
import CreateDeviceDto from "./dto/createDevice.dto";
import UpdateDeviceDto from "./dto/updateDevice.dto";

@Controller("device")
export default class DeviceController {
    constructor(private readonly deviceService: DeviceService) {}

    @Post("/getDevices")
    // @UseGuards(RoleGuard(Role.User))
    async find(@Body() device : Device){
        console.log(device);
        return this.deviceService.find(device);
    }

    @Post()
    @UseGuards(RoleGuard(Role.Admin))
    async create(@Body() device: CreateDeviceDto){
        return this.deviceService.create(device);
    }

    @Patch()
    @UseGuards(RoleGuard(Role.Admin))
    async update(@Body() device: UpdateDeviceDto){
        return this.deviceService.update(device);
    }

    @Delete()
    @UseGuards(RoleGuard(Role.Admin))
    async delete(@Body() device: Device){
        return this.deviceService.delete(device);
    }
}

