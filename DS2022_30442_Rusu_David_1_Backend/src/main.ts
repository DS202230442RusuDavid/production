import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
  app.useGlobalPipes(new ValidationPipe());

  app.use(cookieParser());
  await app.listen(3000);

  const serverIP = await app.getUrl();
  console.log("APP IS RUNNING ON: " + serverIP);
  app.enableCors({
    origin: serverIP,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Access-Control-Allow-Origin',
    credentials: true,
  });
}
bootstrap();
