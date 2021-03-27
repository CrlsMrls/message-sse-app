import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm';

import { AppController } from './app.controller';
import { MessagesModule } from './messages/messages.module';
import { GcpModule } from './gcp/gcp.module';

@Module({
  imports: [
    // when deployed, serve Angular application from dist/message-ui folder
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'messages-ui'),
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    MessagesModule,
    GcpModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
