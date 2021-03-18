import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgZone } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  Message,
  MessageStatus,
  MessagesSummary,
} from 'src/api/app/messages/message.model';

@Injectable()
export class MessageStoreService {
  private messages: Message[] = [];

  private messagesSubject = new BehaviorSubject(this.messages);

  // full list of messages stream
  public readonly messages$: Observable<Message[]>;

  // quantity of unread messages stream
  public readonly newMessages$: Observable<number>;

  constructor(private http: HttpClient, private ngZone: NgZone) {
    this.messages$ = this.messagesSubject.asObservable();
    this.newMessages$ = this.messages$.pipe(
      map(
        (msgs) => msgs.filter((msg) => msg.status == MessageStatus.NEW).length
      )
    );
    this.loadMessages();
    this.setupServerEvent();
  }

  loadMessages() {
    this.http.get<Message[]>('/api/messages').subscribe((msgs) => {
      this.messages = msgs;
      this.messagesSubject.next(this.messages);
    });
  }

  setupServerEvent(): void {
    const eventSource = new EventSource('/api/messages-summary');

    eventSource.onmessage = (eventSourceData: MessagesSummary) => {
      this.ngZone.run(() => {
        this.loadMessages();
      });
    };
    eventSource.onerror = console.error;
  }

  markRead(message: Message) {
    // we could potentially update first locally, so changes are seen instantaneously
    // this.messages.forEach((msg) => {
    //   if (msg.id === message.id) {
    //     message.status = MessageStatus.OPENED;
    //   }
    //   this.messagesSubject.next(this.messages);
    // });

    this.http.patch(`/api/messages/${message.id}/read`, {}).subscribe(
      (resp) => console.log,
      (error) => console.error
    );
  }

  markUnRead(message: Message) {
    this.http.patch(`/api/messages/${message.id}/unread`, {}).subscribe(
      (resp) => console.log,
      (error) => console.error
    );
  }

  delete(message: Message) {
    // update first locally
    // this.messages = this.messages.filter((msg) => msg.id !== message.id);
    // this.messagesSubject.next(this.messages);

    this.http.patch(`/api/messages/${message.id}/delete`, {}).subscribe(
      (resp) => console.log,
      (error) => console.error
    );
  }

  sendMessage(messageText: string) {
    this.http.post(`/api/messages/`, { text: messageText }).subscribe(
      (resp) => console.log,
      (error) => console.error
    );
  }
}
