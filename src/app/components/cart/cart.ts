import { AuthService } from './../../services/auth.service/auth.service';
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
  standalone: true,
  imports: [Footer, Header, CommonModule, FormsModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class Cart implements OnInit {
  cartItems: CartItem[] = [];
  shippingCost = 5;
  loadingCheckout = false;
  isLoggedIn = false;

  constructor(
    private cartService: CartService,
    private backendApi: BackendapiService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.cartItems = this.cartService.getItems();
    this.cartService.cart$.subscribe(items => this.cartItems = items);
    this.authService.user$.subscribe(user => {
      this.isLoggedIn = !!user;
    });
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

  onCheckoutAction() {
    if (!this.isLoggedIn) {
      this.goToLogin();
    } else {
      this.checkout();
    }
  }

  private goToLogin() {
    localStorage.setItem('redirectAfterLogin', 'cart');
    this.router.navigate(['/login']);
  }

  private checkout() {
    if (this.cartItems.length === 0) return;

    const user = this.authService.currentUser;
    if (!user) {
      this.goToLogin();
      return;
    }

    const userId = user?.id || user?.userId;
    if (!userId) return;

    this.proceedToCheckout(userId);
  }

  private proceedToCheckout(userId: string) {
    this.loadingCheckout = true;

    const checkoutId = `CHK_${Date.now()}`;
    const createdAt = new Date().toISOString();

    const payload = {
      checkout_id: checkoutId,
      userId: userId,
      product_id: this.cartItems[0]?.product_id ?? '',
      price: this.subtotal,
      stock_quantity: this.cartItems.reduce((sum, item) => sum + item.quantity, 0),
      seller_id: this.cartItems[0]?.seller_id ?? '',
      im_Checkoutlists: this.cartItems.map(item => ({
        checkoutlist_id: `${checkoutId}_${item.product_id}`,
        userId: userId,
        product_id: item.product_id,
        seller_id: item.seller_id ?? '',
        checkout_id: checkoutId,
        price: item.perPieceRate,
        stock_quantity: item.quantity,
        created_at: createdAt,
        address: '',
        digital_key: '',
        url: '',
        isdigital: 'F',
        status: 'T'
      }))
    };

    localStorage.setItem('checkoutTotals', JSON.stringify({
      subtotal: this.subtotal,
      shipping: this.shippingCost,
      total: this.total
    }));

    console.log("post checkout : ", payload)

    this.backendApi.postCheckout(payload).subscribe({
      next: () => {
        this.cartService.clearCart();
        this.loadingCheckout = false;

        localStorage.setItem('lastCheckout', JSON.stringify(payload));

        this.router.navigate(['/checkout-success'], {
          queryParams: { checkoutId: checkoutId }
        });
      },
      error: (err) => {
        console.error('Checkout failed', err);
        this.loadingCheckout = false;
      }
    });
  }

  OnShop() {
    this.router.navigate(['/shop']);
  }
}
