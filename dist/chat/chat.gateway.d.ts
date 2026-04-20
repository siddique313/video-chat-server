import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomManagerService } from './room-manager.service';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private roomManager;
    server: Server;
    private userCount;
    constructor(roomManager: RoomManagerService);
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleJoin(client: Socket): void;
    handleOffer(client: Socket, payload: {
        roomId: string;
        offer: any;
    }): void;
    handleAnswer(client: Socket, payload: {
        roomId: string;
        answer: any;
    }): void;
    handleIceCandidates(client: Socket, payload: {
        roomId: string;
        candidate: any;
    }): void;
    handleMessage(client: Socket, payload: {
        roomId: string;
        message: any;
    }): void;
    handleLeaveRoom(client: Socket): void;
}
