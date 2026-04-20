import { Server, Socket } from 'socket.io';
import { QueueService } from './queue.service';
interface Room {
    user1: string;
    user2: string;
}
export declare class RoomManagerService {
    private io;
    private queue;
    private rooms;
    private userRoom;
    constructor(queue: QueueService);
    setIo(io: Server): void;
    addUser(socket: Socket): void;
    validate(socketId: string, roomId: string): boolean;
    getReceiver(socketId: string, room: Room): string;
    handleOffer(socketId: string, roomId: string, offer: any): void;
    handleAnswer(socketId: string, roomId: string, answer: any): void;
    handleIceCandidates(socketId: string, roomId: string, candidate: any): void;
    handleMessage(socketId: string, roomId: string, message: any): void;
    leaveRoom(socketId: string, requeue?: boolean): void;
    disconnect(socketId: string): void;
}
export {};
