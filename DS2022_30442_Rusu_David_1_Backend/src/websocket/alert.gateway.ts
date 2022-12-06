import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

const frontedIP = process.env.frontedIP || 'http://int32.duckdns.org:4000';

@WebSocketGateway({ cors: { origin: frontedIP } })
export class AlertGateway {
  @WebSocketServer()
  server: Server;

 
  @SubscribeMessage('alert')
  sendAlert(@MessageBody() data: string) {
    console.log(data);
    this.server.emit('alert', data);
  }

  @SubscribeMessage('message')
  handleConnection(@ConnectedSocket() client: any) {
        console.log('connected');
  }


  handleDisconnect(@ConnectedSocket() client: any) {
   console.log('disconnected');
  }

}
