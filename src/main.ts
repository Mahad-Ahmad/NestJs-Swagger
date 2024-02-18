import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

const port = process.env.PORT;

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // Config OpenAPI
  const config = new DocumentBuilder()
    .setTitle('Nest-Js Backend')
    .addBearerAuth()
    .setDescription('The Nest API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // app.enableCors({ origin: ['http://localhost:3000'] });
  app.enableCors();

  await app.listen(port || 3000);
  console.log(`Server started running on http://localhost:${port}`);
}

bootstrap();
