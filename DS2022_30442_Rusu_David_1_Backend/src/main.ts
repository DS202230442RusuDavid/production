import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   app.enableCors({
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: ['http://int32.duckdns.org:4000/','http://int32.duckdns.org:3000/','http://int32.duckdns.org:8000/','http://int32.duckdns.org'],
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());


  await app.listen(3000);
}
bootstrap();
