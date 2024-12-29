import * as SignalR from '@microsoft/signalr';
import { SIGNAL_URL } from '../utils/config';

export interface IMessage {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  createdDate: string;
  isSeen: boolean;
}

class SignalRService {
  private static instance: SignalRService;
  private connection: SignalR.HubConnection | null = null;
  private userId: number | null = null;
  private isConnecting: boolean = false; 
  private constructor() {}

  public static getInstance(): SignalRService {
    if (!SignalRService.instance) {
      SignalRService.instance = new SignalRService();
    }
    return SignalRService.instance;
  }

  async initializeConnection(userId: number) {
    this.userId = userId;

    if (this.isConnecting || this.connection?.state === SignalR.HubConnectionState.Connected) {
      console.log('Connection already in progress or established.');
      return;
    }

    this.isConnecting = true; 
    this.connection = new SignalR.HubConnectionBuilder()
      .withUrl(`${SIGNAL_URL}`)
      .withAutomaticReconnect()
      .build();

    this.connection.onclose((error) => {
      console.error('Connection closed:', error);
      this.isConnecting = false;
    });

    this.connection.onreconnecting((error) => {
      console.log('Attempting to reconnect:', error);
    });

    this.connection.onreconnected((connectionId) => {
      console.log('Reconnected with connectionId:', connectionId);
      this.invokeConnect(userId);
    });

    try {
      await this.connection.start();
      console.log('SignalR Connection started...');
      await this.invokeConnect(userId);
    } catch (error) {
      console.error('Error in SignalR connection:', error);
      throw error;
    } finally {
      this.isConnecting = false; 
    }
  }

  private async invokeConnect(userId: number) {    
    try {
      await this.connection?.invoke('Connect', userId);
      console.log('Successfully connected with userId:', userId);
    } catch (error) {
      console.error('Error invoking Connect method:', error);
      throw error;
    }
  }

  async on(event: string, handler: (...args: any[]) => void) {
    await this.ensureConnection();
    if (!this.connection || this.connection.state !== SignalR.HubConnectionState.Connected) {
      console.error('Cannot add event handler: Connection not initialized or not connected');
      return;
    }
    this.connection.on(event, handler);
  }

  async off(event: string, handler: (...args: any[]) => void) {
    await this.ensureConnection();
    if (!this.connection || this.connection.state !== SignalR.HubConnectionState.Connected) {
      console.error('Cannot remove event handler: Connection not initialized or not connected');
      return;
    }
    this.connection.off(event, handler);
  }

  async invoke(method: string, ...args: any[]) {
    if (!this.connection) {
      throw new Error('Connection not initialized');
    }
    try {
      return await this.connection.invoke(method, ...args);
    } catch (error) {
      console.error(`Error invoking method ${method}:`, error);
      throw error;
    }
  }

  async stopConnection() {
    if (this.connection) {
      try {
        await this.connection.stop();
        this.connection = null;
        this.userId = null;
        console.log('SignalR Connection stopped');
      } catch (error) {
        console.error('Error stopping SignalR connection:', error);
      }
    } else {
      console.log('No active connection to stop');
    }
  }

  isConnected(): boolean {
    const connected = this.connection?.state === SignalR.HubConnectionState.Connected;
    console.log(`SignalR connection status: ${connected ? 'Connected' : 'Not Connected'}`);
    return connected;
  }

  async ensureConnection() {
    if (this.connection?.state === SignalR.HubConnectionState.Disconnected && !this.isConnecting && this.userId !== null) {
      console.log('Connection lost. Attempting to reconnect...');
      await this.initializeConnection(this.userId);
    }
  }
}

export default SignalRService;
