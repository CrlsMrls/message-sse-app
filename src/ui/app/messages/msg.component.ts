import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Message } from 'src/api/app/messages/message.model';
import { MessageStoreService } from './messages.service';

@Component({
  templateUrl: './msg.component.html',
  styleUrls: ['./msg.component.scss'],
})
export class MessageComponent {
  messageText: string;
  messages$: Observable<Message[]>;

  constructor(private messageStore: MessageStoreService) {
    this.messageText = '';
    this.messages$ = this.messageStore.messages$;
  }

  markRead(message: Message) {
    this.messageStore.markRead(message);
  }

  markUnRead(message: Message) {
    this.messageStore.markUnRead(message);
  }

  delete(message: Message) {
    this.messageStore.delete(message);
  }

  sendMessage() {
    this.messageStore.sendMessage(this.messageText);
    this.messageText = '';
  }
}
