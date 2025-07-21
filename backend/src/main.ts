import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS for all origins (for development). Restrict origin in production.
  app.enableCors({
    origin: 'http://localhost:3001', // or use an array for multiple origins
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
