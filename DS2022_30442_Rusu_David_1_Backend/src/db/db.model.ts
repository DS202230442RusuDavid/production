import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import User from "./entities/user.entity";
import Device from "./entities/device.entity";
import Energy from "./entities/energy.entity";

@Module({
    imports: [    
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
        type: 'mysql',
        host:  process.env.MYSQL_CONTAINER_NAME || 'localhost', 
        port: parseInt(process.env.MYSQL_TCP_PORT) || 3306,
        username:  process.env.DATABASE_LOGIN_USER || 'root',
        password:  process.env.MYSQL_ROOT_PASSWORD || 'root',
        database:  process.env.MYSQL_DATABASE || 'oeup',
        entities: [User, Device, Energy],
        synchronize: true,
      })],
    controllers: [],
    providers: [],
})

export default class DBModule {}