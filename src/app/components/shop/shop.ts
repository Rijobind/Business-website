import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { Header } from "../../shared-components/header/header";
import { Footer } from "../../shared-components/footer/footer";
import { Router } from '@angular/router';
import { BackendapiService } from '../../services/backendapi.service/backendapi.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service/cart.service';
import { SignalRService } from '../../services/signalr.service/signalr.service';

@Component({
  selector: 'shop-page',
  imports: [Header, Footer, CommonModule],
  templateUrl: './shop.html',
  styleUrl: './shop.css'
})
export class Shop implements OnInit {

  products: any[] = [];
  loading: boolean = true;

  constructor(private router: Router, private backendApi: BackendapiService, private cartService: CartService, private signalRService: SignalRService, private ngZone: NgZone, private cdr: ChangeDetectorRef) { }
  timestamp = new Date().getTime();

  async ngOnInit(): Promise<void> {

    try {
      await this.signalRService.startConnection();

      this.signalRService.onSingleProductUpdate(async (productId: string) => {
        this.ngZone.run(async () => {
          await new Promise(res => setTimeout(res, 200));
          await this._refreshSingleProduct(productId);
        });
      });

      this.signalRService.onProductDeleted((productId: string) => {
        this.ngZone.run(() => {
          const index = this.products.findIndex(p => p.product_id === productId);
          if (index !== -1) {
            this.products.splice(index, 1);
            this.products = [...this.products];
            this.cdr.detectChanges();
          }
        });
      });

    } catch (error) {
      console.error("❌ SignalR connection failed", error);
    }

    this._prodctDetails();
  }


  async _refreshSingleProduct(productId: string) {
    try {
      const res = await this.backendApi.getProductById(productId).toPromise();
      const updatedProduct = res.data;
      if (!updatedProduct || !updatedProduct.product_id) {
        console.error("❌ Invalid product data from API:", updatedProduct);
        return;
      }
      const index = this.products.findIndex(p => p.product_id === updatedProduct.product_id);
      updatedProduct.imageTimestamp = new Date().getTime();

      if (updatedProduct.status === 'F') {
        if (index !== -1) {
          this.products.splice(index, 1);
          this.products = [...this.products];
          this.cdr.detectChanges();
        }
        return;
      }
      if (index !== -1) {
        this.products[index] = updatedProduct;
      } else {
        this.products.push(updatedProduct);
      }
      this.products = [...this.products];
      this.cdr.detectChanges();

    } catch (err) {
      console.error("❌ Failed to fetch updated product", err);
    }
  }

  _prodctDetails() {
    this.loading = true;
    this.backendApi.getProductList().subscribe({

      next: (res) => {
        this.timestamp = new Date().getTime();

        this.products = res.data;
        this.loading = false
      },
      error: (err) => {
        console.error("Error fetching product list", err);
      }
    });
  }
  OnRegistration() {
    this.router.navigate(['/registration']);
  }

  onBook(product: any) {
    this.cartService.addToCart(product);

    const toast = document.createElement('div');
    toast.innerText = "✅ Product added to cart!";
    toast.className = "fixed top-20 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg";
    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 2000);
  }


  onProductDetails(product: any) {
    if (!product || !product.product_id) {
      console.error("Product id missing:", product);
      return;
    }
    this.router.navigate(['/product-details', product.product_id]);
  }


}

