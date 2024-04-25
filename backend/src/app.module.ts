import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MulterModule } from '@nestjs/platform-express';
import { ScheduleModule } from '@nestjs/schedule';
import { APP_PIPE } from '@nestjs/core';
import * as path from 'path';
import {
  I18nModule,
  I18nJsonParser,
  HeaderResolver,
  AcceptLanguageResolver,
  QueryResolver,
  CookieResolver,
} from 'nestjs-i18n';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';
import { UsersModule } from './web/users/users.module';
import { TasksModule } from './web/tasks/tasks.module';
import { AdminModule } from './web/admin/admin.module';
import { CronJobModule } from './web/cron-job/cron-job.module';
import { ChatModule } from './web/chat/chat.module';
import { LANGUAGE } from './utils/enums';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: LANGUAGE.EN, // fallback Language incase user req for any invalid language
      parser: I18nJsonParser,
      parserOptions: {
        path: path.join(__dirname, '/i18n/'),
        // watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang', 'locale', 'l'] }, // query parameter in URL to get language
        new HeaderResolver(['Accept-Language']), //  Headers parameter to get language
        AcceptLanguageResolver,
        new CookieResolver(['lang', 'locale', 'l']), // Cookie parameter to get language
      ],
    }),
    ScheduleModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: process.env.SENDGRID_HOST,
        port: process.env.SENDGRID_PORT,
        secure: true,
        auth: {
          user: process.env.SENDGRID_USER,
          pass: process.env.SENDGRID_API,
        },
      },
      defaults: {
        from: `<${process.env.SENDGRID_API}>`,
      },
      template: {
        dir: process.cwd() + '/templates/',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    MulterModule.register({
      dest: './files',
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    TasksModule,
    AdminModule,
    CronJobModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    AppService,
  ],
})
export class AppModule {}
