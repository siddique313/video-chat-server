import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT, CORS_ORIGIN } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: CORS_ORIGIN,
    credentials: true,
  });
  await app.listen(PORT, '0.0.0.0');
  console.log(`🚀 Server running on port ${PORT}`);
}
bootstrap();