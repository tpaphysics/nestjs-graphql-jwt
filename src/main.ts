import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { graphqlUploadExpress } from 'graphql-upload';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      //transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.use(graphqlUploadExpress({ maxFiles: 1, maxFileSize: 10 * 1024 * 1024 }));
  await app.listen(3000);
}
bootstrap();
