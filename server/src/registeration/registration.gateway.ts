import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
  } from '@nestjs/websockets';
  import { Server } from 'socket.io';
  
  @WebSocketGateway({ cors: true })
  export class RegistrationGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
  {
    @WebSocketServer()
    server: Server;
  
    afterInit() {
      console.log('Socket initialized');
    }
  
    handleConnection(client: any) {
      console.log(`Client connected: ${client.id}`);
    }
  
    handleDisconnect(client: any) {
      console.log(`Client disconnected: ${client.id}`);
    }
  
    // Method to broadcast registration data to all connected clients
    broadcastRegistrations(data: any) {
      this.server.emit('registrationUpdate', data);
    }
  
    // You can emit a registration event, e.g., when data is updated
    @SubscribeMessage('newRegistration')
    handleNewRegistration(client: any, data: any): void {
      console.log('New registration data:', data);
      this.broadcastRegistrations(data);  // Send data to all connected clients
    }
  }
  