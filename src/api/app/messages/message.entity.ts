import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class MessageEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  text: string;

  @Column('text')
  status: MessageEntityStatus;
}

export type MessageEntityStatus = 'NEW' | 'OPENED' | 'DELETED';
