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
  public onOonsoftproducts(callback: (Oonsoft_product_id: string) => void): void {
    this.hubConnection.on('UpdatedOonsoftproducts', (Oonsoft_product_id: string) => {
      callback(Oonsoft_product_id);
    })
  }
  public onProductDeleted(callback: (productId: string) => void): void {
    this.hubConnection.on('ProductDeleted', (productId: string) => {
      callback(productId);
    });
  }
  public Delete_onOonsoftproducts(callback: (Oonsoft_product_id: string) => void): void {
    this.hubConnection.on('OonsoftProductDeleted', (Oonsoft_product_id: string) => {
      callback(Oonsoft_product_id);
    })
  }
}

