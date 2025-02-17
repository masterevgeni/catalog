import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true, // here should be specified frontend url
  });
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT);
}
bootstrap();
