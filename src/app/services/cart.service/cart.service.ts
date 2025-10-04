import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CheckoutPalyload } from '../backendapi.service/backendapi.service';

export interface CartItem {
  product_id: string;
  name: string;
  model?: string;
  hsCode?: string;
  quantity: number;
  perPieceRate: number;
  totalPrice: number;
  image?: string;
  seller_id?: string;
  [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private storageKey = 'my_cart_v1';
  private items: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);

  cart$ = this.cartSubject.asObservable();

  constructor() {
    const raw = localStorage.getItem(this.storageKey);
    this.items = raw ? JSON.parse(raw) : [];
    this.cartSubject.next([...this.items]);
  }

  private persist() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    this.cartSubject.next([...this.items]);
  }


  addToCart(product: any, qty = 1) {
    const id = product.product_id ?? product.id ?? product.productId ?? product.sku;
    if (!id) {
      return;
    }

    const existing = this.items.find(i => i.product_id == id);
    const perPieceRate = Number(product.price ?? product.perPieceRate ?? 0) || 0;

    if (existing) {
      existing.quantity += qty;
      existing.totalPrice = Number((existing.quantity * existing.perPieceRate).toFixed(2));
    } else {
      const item: CartItem = {
        product_id: id,
        name: product.title ?? product.name ?? product.brand ?? 'Product',
        model: product.brand ?? product.model,
        hsCode: product.hsCode ?? '',
        quantity: qty,
        perPieceRate,
        totalPrice: Number((perPieceRate * qty).toFixed(2)),
        image: product?.im_ProductImages[0]?.image_url,
        seller_id: product.seller_id ?? ''
      };
      this.items.push(item);
    }

    this.persist();
  }

  updateQuantity(product_id: string, quantity: number) {
    const it = this.items.find(i => i.product_id == product_id);
    if (!it) return;
    const q = Math.max(1, Math.floor(Number(quantity) || 1));
    it.quantity = q;
    it.totalPrice = Number((it.quantity * it.perPieceRate).toFixed(2));
    this.persist();
  }

  increment(product_id: string) {
    const it = this.items.find(i => i.product_id == product_id);
    if (!it) return;
    it.quantity++;
    it.totalPrice = Number((it.quantity * it.perPieceRate).toFixed(2));
    this.persist();
  }

  decrement(product_id: string) {
    const it = this.items.find(i => i.product_id == product_id);
    if (!it) return;
    if (it.quantity <= 1) return;
    it.quantity--;
    it.totalPrice = Number((it.quantity * it.perPieceRate).toFixed(2));
    this.persist();
  }

  removeItem(product_id: string) {
    this.items = this.items.filter(i => i.product_id != product_id);
    this.persist();
  }

  clearCart() {
    this.items = [];
    this.persist();
  }

  getItems(): CartItem[] {
    return [...this.items];
  }

  getSubtotal(): number {
    return this.items.reduce((s, i) => s + (i.totalPrice || 0), 0);
  }

  getTotalCount(): number {
    return this.items.reduce((s, i) => s + (i.quantity || 0), 0);
  }

  toBackendPayloads(userId = 'guest') {
    return this.items.map(it => ({
      checkout_id: `CHK_${Date.now()}`,
      userId,
      product_id: it.product_id,
      price: it.perPieceRate,
      stock_quantity: it.quantity,
      seller_id: it.seller_id ?? ''
    }));
  }

  toCheckoutPayloads(userId: string, address: string): CheckoutPalyload[] {
    const checkoutId = `chk_${Date.now()}`;
    const createdAt = new Date().toISOString();

    return this.items.map(item => ({
      checkoutlist_id: `${checkoutId}_${item.product_id}`,
      userId: userId,
      product_id: item.product_id,
      seller_id: item.seller_id ?? '',
      price: item.perPieceRate,
      stock_quantity: item.quantity,
      created_at: createdAt,
      checkout_id: checkoutId,
      address: address,
      digital_key: '',
      url: '',
      isdigital: 'F',
      status: 'T'
    }));
  }


}
