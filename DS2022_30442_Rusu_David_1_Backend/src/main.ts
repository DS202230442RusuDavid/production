import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
var ip = require('what-is-my-ip-address');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  
  const publicIP = await ip.v4();
  console.log("PUBLIC IP IS: " + publicIP);
  app.enableCors({
    origin: publicIP,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Access-Control-Allow-Origin',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
