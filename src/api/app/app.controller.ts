import { Controller, Get, Header, Sse } from '@nestjs/common';

import { Observable } from 'rxjs';
import { MessagesSummary } from './messages/message.model';

import { MessagesService } from './messages/messages.service';

@Controller()
export class AppController {
  constructor(private messagesService: MessagesService) {}

  @Get()
  getHello(): string {
    return 'REST API is up and running';
  }

  // Server sent events
  // this keeps updating the client with the number of messages
  // @Header('X-Accel-Buffering', 'no')
  @Sse('messages-summary')
  serverSentEvents(): Observable<MessagesSummary> {
    return this.messagesService.messagesSummary$;
  }
}
