import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import cors from "cors";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions ={
    origin:'*', 
    credentials:true, //access-control-allow-credentials:true
     optionSuccessStatus:200,
}

app.use(cors(corsOptions)) 
  app.useGlobalPipes(new ValidationPipe());

  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
