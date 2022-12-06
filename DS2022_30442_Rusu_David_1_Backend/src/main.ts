import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  

  app.enableCors({
    allowedHeaders: ['content-type','Access-Control-Expose-Headers','Access-Control-Allow-Methods','Access-Control-Allow-Headers'],
    origin: ['http://int32.duckdns.org/'],
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
