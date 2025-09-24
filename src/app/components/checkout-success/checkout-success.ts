import { Component } from '@angular/core';
import { Header } from "../../shared-components/header/header";
import { Footer } from "../../shared-components/footer/footer";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout-success',
  imports: [Header, Footer, CommonModule],
  templateUrl: './checkout-success.html',
  styleUrl: './checkout-success.css'
})
export class CheckoutSuccess {
  checkout: any;
  items: any[] = [];
  subtotal = 0;
  total = 0;
  shippingCost = 5;
  baseUrl = 'http://216.183.222.46:8081/';

  ngOnInit() {
    const data = localStorage.getItem('lastCheckout');
    if (data) {
      this.checkout = JSON.parse(data);
      this.items = (this.checkout.im_Checkoutlists || []).map((item: any) => ({
        ...item,
        image: item.image ? this.baseUrl + item.image : 'assets/no-image.jpg',
        name: item.name || 'Unknown Product',
        model: item.model || 'N/A',
        hsCode: item.hsCode || 'N/A'
      }));

      this.subtotal = this.items.reduce(
        (sum, item) => sum + (item.price * item.stock_quantity),
        0
      );
      this.total = this.subtotal + this.shippingCost;
    }
    console.log('Checkout Items:', this.items);
  }
}
