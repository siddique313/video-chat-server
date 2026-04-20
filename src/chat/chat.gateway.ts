import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomManagerService } from './room-manager.service';

@WebSocketGateway({
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private userCount = 0;

  constructor(private roomManager: RoomManagerService) {
    this.roomManager.setIo(this.server);
  }

  handleConnection(client: Socket): void {
    this.userCount++;
    this.server.emit('user-count', this.userCount);
    console.log('Connected:', client.id);
  }

  handleDisconnect(client: Socket): void {
    this.userCount = Math.max(0, this.userCount - 1);
    this.server.emit('user-count', this.userCount);
    this.roomManager.disconnect(client.id);
  }

  @SubscribeMessage('join')
  handleJoin(client: Socket): void {
    this.roomManager.addUser(client);
  }

  @SubscribeMessage('offer')
  handleOffer(client: Socket, payload: { roomId: string; offer: any }): void {
    this.roomManager.handleOffer(client.id, payload.roomId, payload.offer);
  }

  @SubscribeMessage('answer')
  handleAnswer(client: Socket, payload: { roomId: string; answer: any }): void {
    this.roomManager.handleAnswer(client.id, payload.roomId, payload.answer);
  }

  @SubscribeMessage('ice-candidates')
  handleIceCandidates(client: Socket, payload: { roomId: string; candidate: any }): void {
    this.roomManager.handleIceCandidates(client.id, payload.roomId, payload.candidate);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: { roomId: string; message: any }): void {
    this.roomManager.handleMessage(client.id, payload.roomId, payload.message);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket): void {
    this.roomManager.leaveRoom(client.id);
  }
}