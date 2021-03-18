import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT || 8081);

  console.log(`REST API running in ${process.env.PORT || 8081}`);
}
bootstrap();
