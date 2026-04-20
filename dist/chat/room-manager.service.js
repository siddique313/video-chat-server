"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomManagerService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const queue_service_1 = require("./queue.service");
let RoomManagerService = class RoomManagerService {
    constructor(queue) {
        this.rooms = new Map();
        this.userRoom = new Map();
        this.queue = queue;
    }
    setIo(io) {
        this.io = io;
    }
    addUser(socket) {
        const socketId = socket.id;
        if (this.queue.has(socketId) || this.userRoom.has(socketId))
            return;
        this.queue.enqueue(socketId);
        console.log('User queued:', socketId);
        this.queue.print();
        while (this.queue.size() >= 2) {
            const user1 = this.queue.dequeue();
            const user2 = this.queue.dequeue();
            if (!user1 || !user2)
                return;
            const roomId = (0, uuid_1.v4)();
            this.rooms.set(roomId, { user1, user2 });
            this.userRoom.set(user1, roomId);
            this.userRoom.set(user2, roomId);
            this.io.sockets.sockets.get(user1)?.join(roomId);
            this.io.sockets.sockets.get(user2)?.join(roomId);
            this.io.to(roomId).emit('joined', { roomId });
            const offerer = Math.random() > 0.5 ? user1 : user2;
            this.io.to(offerer).emit('send-offer');
            console.log('Room created:', roomId);
        }
    }
    validate(socketId, roomId) {
        return this.userRoom.get(socketId) === roomId;
    }
    getReceiver(socketId, room) {
        return room.user1 === socketId ? room.user2 : room.user1;
    }
    handleOffer(socketId, roomId, offer) {
        if (!this.validate(socketId, roomId))
            return;
        const room = this.rooms.get(roomId);
        if (!room)
            return;
        const receiver = this.getReceiver(socketId, room);
        this.io.to(receiver).emit('offer', { offer });
    }
    handleAnswer(socketId, roomId, answer) {
        if (!this.validate(socketId, roomId))
            return;
        const room = this.rooms.get(roomId);
        if (!room)
            return;
        const receiver = this.getReceiver(socketId, room);
        this.io.to(receiver).emit('answer', { answer });
    }
    handleIceCandidates(socketId, roomId, candidate) {
        if (!this.validate(socketId, roomId))
            return;
        const room = this.rooms.get(roomId);
        if (!room)
            return;
        const receiver = this.getReceiver(socketId, room);
        this.io.to(receiver).emit('ice-candidates', { candidate });
    }
    handleMessage(socketId, roomId, message) {
        if (!this.validate(socketId, roomId))
            return;
        const room = this.rooms.get(roomId);
        if (!room)
            return;
        const receiver = this.getReceiver(socketId, room);
        this.io.to(receiver).emit('message', { message });
    }
    leaveRoom(socketId, requeue = true) {
        const roomId = this.userRoom.get(socketId);
        if (!roomId)
            return;
        const room = this.rooms.get(roomId);
        if (!room)
            return;
        const otherUser = this.getReceiver(socketId, room);
        this.io.to(otherUser).emit('leaveRoom');
        this.io.sockets.sockets.get(socketId)?.leave(roomId);
        this.io.sockets.sockets.get(otherUser)?.leave(roomId);
        this.rooms.delete(roomId);
        this.userRoom.delete(socketId);
        this.userRoom.delete(otherUser);
        if (requeue)
            this.queue.enqueue(otherUser);
        console.log('Room deleted:', roomId);
    }
    disconnect(socketId) {
        console.log('Disconnected:', socketId);
        this.queue.remove(socketId);
        this.leaveRoom(socketId, false);
    }
};
exports.RoomManagerService = RoomManagerService;
exports.RoomManagerService = RoomManagerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [queue_service_1.QueueService])
], RoomManagerService);
//# sourceMappingURL=room-manager.service.js.map