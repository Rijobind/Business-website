import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from '../../environment/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;
  signialr: string = environment.SiginalR;

  public startConnection(): Promise<void> {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.signialr + 'producthub')
      .build();

    return this.hubConnection
      .start()
      .then(() => {
      })
      .catch(err => {
      });
  }

  public onProductListUpdate(callback: () => void): void {
    this.hubConnection.on('ReceiveProductListUpdate', () => {
      callback();
    });
  }

  public onSingleProductUpdate(callback: (productId: string) => void): void {
    this.hubConnection.on('UpdatedProduct', (productId: string) => {
      callback(productId);
    });
  }
}