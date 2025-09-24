import { Component, OnInit } from '@angular/core';
import { Header } from "../../shared-components/header/header";
import { Footer } from "../../shared-components/footer/footer";
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BackendapiService } from '../../services/backendapi.service/backendapi.service';

@Component({
  selector: 'app-checkout-success',
  imports: [Header, Footer, CommonModule],
  templateUrl: './checkout-success.html',
  styleUrls: ['./checkout-success.css']
})
export class CheckoutSuccess implements OnInit {
  checkout_id: string = '';
  checkoutData: any = null;        // main checkout info
  checkoutItems: any[] = [];       // items array

  subtotal: number = 0;
  shipping: number = 0;
  total: number = 0;

  constructor(
    private checkoutService: BackendapiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    const totals = JSON.parse(localStorage.getItem('checkoutTotals') || '{}');
    this.subtotal = totals.subtotal || 0;
    this.shipping = totals.shipping || 0;
    this.total = totals.total || 0;
    // Get checkoutId from query params
    this.route.queryParams.subscribe(params => {
      this.checkout_id = params['checkout_id'];
      if (this.checkout_id) {
        this.loadCheckoutById(this.checkout_id);
      }
    });
  }

  loadCheckoutById(checkoutId: string) {
    this.checkoutService.getCheckoutDetailsById(checkoutId).subscribe({
      next: (res) => {
        if (res.success && res.data.length > 0) {
          this.checkoutData = res.data[0];
          this.checkoutItems = this.checkoutData.im_Checkoutlists;
          console.log('Checkout Items:', this.checkoutItems);
        }
      },
      error: (err) => {
        console.error('Error fetching checkout by ID', err);
      }
    });
  }

  getSubtotal(): number {
    return this.checkoutItems.reduce((sum, item) => sum + item.price * item.stock_quantity, 0);
  }

  getTotal(): number {
    // you can add shipping or other charges here
    return this.getSubtotal();
  }
}
