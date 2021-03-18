import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { Message } from './message.model';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dtos/create-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Post()
  async newMessage(
    @Body() createMessageDto: CreateMessageDto
  ): Promise<Message> {
    return this.messagesService.addMessage(createMessageDto);
  }

  @Get()
  async getAll(): Promise<Message[]> {
    return this.messagesService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Message> {
    return this.messagesService.getMessageById(id);
  }

  @Patch(':id/read')
  async markRead(@Param('id') id: string): Promise<Message> {
    return this.messagesService.openMessage(id);
  }

  @Patch(':id/unread')
  async markUnRead(@Param('id') id: string): Promise<Message> {
    return this.messagesService.unreadMessage(id);
  }

  @Patch(':id/delete')
  async markDelete(@Param('id') id: string): Promise<Message> {
    return this.messagesService.deleteMessage(id);
  }
}
