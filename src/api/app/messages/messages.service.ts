import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { Message, MessageStatus, MessagesSummary } from './message.model';
import { CreateMessageDto } from './dtos/create-message.dto';
import { Observable, Subject } from 'rxjs';
import { initialMessages } from './initial-data';

/*
 * This class stores the messages in an Array.
 * In a real environment it should be backed in a database.
 * For each call, it fakes async calls like it would happen with a real DB.
 *
 * For every change in the data, it updates the messagesSummary$ observable.
 * This observable will later be used by the Server-sent events to update the clients
 *
 */

@Injectable()
export class MessagesService {
  private messages: Message[] = initialMessages;

  private messagesSummary: Subject<MessagesSummary>;
  public readonly messagesSummary$: Observable<MessagesSummary>;

  constructor() {
    this.messagesSummary = new Subject();
    this.messagesSummary$ = this.messagesSummary.asObservable();
    this.updateObservers();
  }

  updateObservers() {
    const total = this.messages.length;
    // get how many new messages there are
    const newFilter = (msg) => msg.status === MessageStatus.NEW;
    const unread = this.messages.filter(newFilter).length;

    const notDeletedFilter = (msg) => msg.status !== MessageStatus.DELETED;
    const notDeleted = this.messages.filter(notDeletedFilter).length;

    const updatedData: MessagesSummary = {
      data: {
        total,
        unread,
        notDeleted,
      },
    };

    // update observers
    this.messagesSummary.next(updatedData);
  }

  addMessage(createMessageDto: CreateMessageDto): Promise<Message> {
    const { text } = createMessageDto;

    const message = {
      id: uuidv4(),
      text,
      status: MessageStatus.NEW,
    };
    // add at beginning (otherwise add a creation date and then sort by creation)
    this.messages = [message, ...this.messages];
    this.updateObservers();

    return Promise.resolve(message);
  }

  getAll(): Promise<Message[]> {
    return Promise.resolve(
      this.messages.filter((msg) => msg.status !== MessageStatus.DELETED)
    );
  }

  getMessageById(id: string): Promise<Message> {
    const message = this.messages.find((msg) => msg.id === id);
    if (message != undefined) {
      return Promise.resolve(message);
    }

    console.error(`Message with ${id} NOT found`);
    return Promise.reject(`Message with ${id} NOT found`);
  }

  async openMessage(id: string): Promise<Message> {
    const message = await this.getMessageById(id);
    message.status = MessageStatus.OPENED;

    this.updateObservers();

    return Promise.resolve(message);
  }

  async unreadMessage(id: string): Promise<Message> {
    const message = await this.getMessageById(id);
    message.status = MessageStatus.NEW;

    this.updateObservers();

    return Promise.resolve(message);
  }

  async deleteMessage(id: string): Promise<Message> {
    const message = await this.getMessageById(id);
    message.status = MessageStatus.DELETED;

    this.updateObservers();

    return Promise.resolve(message);
  }
}
