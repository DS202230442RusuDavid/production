import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  

  // const publicIP = await extIP.get();
  // console.log("PUBLIC IP IS: " + publicIP);
  // app.enableCors({
  //   origin: publicIP,
  //   credentials: true,
  // });

  app.enableCors({
    origin: ['/.*:4000'],
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
