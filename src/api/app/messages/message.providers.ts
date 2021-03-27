import { Connection, Repository } from 'typeorm';
import { MessageEntity } from './message.entity';

export const messageProviders = [
  {
    provide: 'MESSAGE_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(MessageEntity),
    inject: ['DATABASE_CONNECTION'],
  },
];
