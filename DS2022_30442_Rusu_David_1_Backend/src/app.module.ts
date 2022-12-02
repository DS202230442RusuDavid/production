import { Module } from '@nestjs/common';
import DBModule from './db/db.model';
import { UsersModule } from './user/user.module';
import { AuthenticationModule } from './authentification/authentication.module';
import DeviceModule from './device/device.module';
import EnergyModule from './energy/energy.modules';
import { RabbitModule } from './rabbitMQ/mq.model';
import { AlertModule } from './websocket/alert.module';
@Module({
  imports: [
    DBModule,
    AuthenticationModule,
    UsersModule, 
    DeviceModule,
    EnergyModule,
    RabbitModule,
    AlertModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
