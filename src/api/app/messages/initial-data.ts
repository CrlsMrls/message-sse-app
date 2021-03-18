import { Message, MessageStatus } from './message.model';

export const initialMessages: Message[] = [
  {
    id: '12345',
    text: 'Since this is a new message, you could mark it as read',
    status: MessageStatus.NEW,
  },
  {
    id: '23456',
    text: 'This short message was already opened',
    status: MessageStatus.OPENED,
  },
];
