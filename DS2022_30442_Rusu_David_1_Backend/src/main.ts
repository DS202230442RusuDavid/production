import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const serverIP = await app.getUrl();
  console.log("APP IS RUNNING ON: " + serverIP);
  app.enableCors({
    origin: serverIP,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    credentials: true,
  });
  
  app.useGlobalPipes(new ValidationPipe());

  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
