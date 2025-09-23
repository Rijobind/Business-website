import { Component, OnInit } from '@angular/core';
import { Footer } from "../../shared-components/footer/footer";
import { Header } from "../../shared-components/header/header";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartItem, CartService } from '../../services/cart.service/cart.service';
import { BackendapiService } from '../../services/backendapi.service/backendapi.service';

@Component({
  selector: 'app-cart',
  imports: [Footer, Header, CommonModule, FormsModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class Cart implements OnInit {
  cartItems: CartItem[] = [];
  shippingCost = 5;
  loadingCheckout = false;
  isLoggedIn: boolean = false;

  constructor(
    private cartService: CartService,
    private backendApi: BackendapiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cartItems = this.cartService.getItems();
    this.cartService.cart$.subscribe(items => this.cartItems = items);

    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    this.isLoggedIn = !!(token && userStr);
  }

  get subtotal(): number {
    return this.cartService.getSubtotal();
  }

  get total(): number {
    return this.subtotal + this.shippingCost;
  }

  incrementQuantity(index: number) {
    const id = this.cartItems[index].product_id;
    this.cartService.increment(id);
  }

  decrementQuantity(index: number) {
    const id = this.cartItems[index].product_id;
    this.cartService.decrement(id);
  }

  updateTotalPrice(index: number) {
    const item = this.cartItems[index];
    if (!item) return;
    const q = Math.max(1, Math.floor(Number(item.quantity) || 1));
    this.cartService.updateQuantity(item.product_id, q);
  }

  removeItem(index: number) {
    const id = this.cartItems[index].product_id;
    this.cartService.removeItem(id);
  }

  goToLogin() {
    localStorage.setItem('redirectAfterLogin', 'cart');
    this.router.navigate(['/login']);
  }

  checkout() {
    if (!this.isLoggedIn || this.cartItems.length === 0) return;

    const userStr = localStorage.getItem('user');
    if (!userStr) return;

    try {
      const userObj = JSON.parse(userStr);
      const userId = userObj?.id || userObj?.userId;
      if (!userId) return;

      this.proceedToCheckout(userId);
    } catch (err) {
      console.error('Failed to parse user from localStorage:', err);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.isLoggedIn = false;
    }
  }


  private proceedToCheckout(userId: string) {
    this.loadingCheckout = true;

    const checkoutPayload = this.cartItems.map(item => ({
      userId: userId,
      product_id: item.product_id,
      stock_quantity: item.quantity
    }));

    this.backendApi.postCheckout(checkoutPayload).subscribe({
      next: () => {
        this.cartService.clearCart();
        this.loadingCheckout = false;
        this.router.navigate(['/checkout-success']);
      },
      error: (err) => {
        console.error('Checkout failed', err);

        if (err.status === 400 || err.status === 401) {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        }

        this.loadingCheckout = false;
      }
    });
  }

  OnShop() {
    this.router.navigate(['/shop']);
  }
}
