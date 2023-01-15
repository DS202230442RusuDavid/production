import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { gRPCOptions } from './gRPC/gRPC.options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   app.enableCors({
    origin: ['http://int32.duckdns.org:4000',"http://localhost:4000"],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 200,
  });

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  
  app.connectMicroservice<MicroserviceOptions>(gRPCOptions);

  await app.startAllMicroservices();

  await app.listen(3000);
}
bootstrap();
