import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MoodInterface } from './interfaces/mood.interface';
import { RoomService } from './rooms/room.service';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  room = {};
  roomMood: any = [];
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    this.server = server;
    console.log(`Init`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    // throw new Error('Method not implemented.');
    console.log(`Client: ${client.id} is connected`);
  }

  handleDisconnect(client: Socket) {
    // throw new Error('Method not implemented.');
    client.leave(this.room[client.id]);
    console.log(`Client: ${client.id} is disconnected`);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): string {
    return `Client: ${client.id} says ${payload}`;
  }

  @SubscribeMessage('join-room')
  joinRoom(client: Socket, { roomId }: any): boolean {
    //join room
    client.join(roomId);
    this.room[client.id] = roomId;
    return client.emit('join-room-status', roomId);
  }

  @SubscribeMessage('network-configuration')
  configureNetwork(
    client: Socket,
    { roomId, candidate, description }: any,
  ): boolean {
    // handle network configuration
    if (!roomId) {
      console.log(`room id not set...!`);
      return;
    }
    return this.server.to(roomId).emit('remote-configuration', {
      clientId: client.id,
      candidate,
      description,
    });
  }

  @SubscribeMessage('mood')
  mood(client: Socket, { roomId, mood }: any): boolean {
    if (!roomId) {
      console.log(`room id not set...!`);
      return;
    }
    if (!!!this.roomMood[roomId]) {
      this.roomMood[roomId] = {};
    }
    this.roomMood[roomId][mood.expression] = {
      emoji: mood.emoji,
      expression: mood.expression,
      index: this.average(
        Number(this.roomMood[roomId]?.[mood.expression]?.index ?? 0),
        Number(mood.index),
      ).toFixed(0),
    } as MoodInterface;
    return this.server
      .to(roomId)
      .emit('remote-mood', { moods: this.roomMood[roomId] });
  }

  private average(num1: number, num2: number): number {
    const n1 = num1 ? num1 : 0;
    const n2 = num2 ? num2 : 0;
    const result = (n1 + n2) / 2;
    return Number(result);
  }
}
