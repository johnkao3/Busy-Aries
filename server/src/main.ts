import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { VersioningType } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const isDEV = process.env.NODE_ENV === 'development' ? true : false;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.set('trust proxy', 1);
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'my-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: isDEV ? false : true,
        maxAge: 60 * 60 * 1000,
      },
      proxy: true,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  // Server Config
  const PORT = process.env.PORT || 3000;
  // Setting GlobalPrefix
  app.setGlobalPrefix('api');
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });
  await app.listen(PORT);
}
bootstrap();
