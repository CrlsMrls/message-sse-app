import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    // when deployed, serve Angular application from dist/message-ui folder
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'messages-ui'),
    }),
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
