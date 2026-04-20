import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { RoomManagerService } from './room-manager.service';
import { QueueService } from './queue.service';

@Module({
  providers: [ChatGateway, RoomManagerService, QueueService],
})
export class ChatModule {}