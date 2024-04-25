import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as morgan from 'morgan';
import * as Sentry from '@sentry/node';
import * as session from 'express-session';
import { config } from 'dotenv';
import { join } from 'path';
import { ClassValidatorExceptionsFilter } from './validations/ClassValidatorExceptionfilter';
import { AppModule } from './app.module';

config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    credentials: true,
    origin: [
      'http://localhost:3000',
      'http://csdev.site/marketplace',
    ],
  });
  app.use(morgan('tiny'));

  // Sentry Entry point
  Sentry.init({
    dsn: process.env.SENTRY_DNS,
  });

  app.use(session({ secret: process.env.JWT_SECRET }));

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(new ClassValidatorExceptionsFilter());

  // Serve Static Files
  app.useStaticAssets(join(__dirname, '..', 'public'));

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
