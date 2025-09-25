import { Component, OnInit } from '@angular/core';
import { Header } from "../../shared-components/header/header";
import { Footer } from "../../shared-components/footer/footer";
import { Router } from '@angular/router';
import { BackendapiService } from '../../services/backendapi.service/backendapi.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service/cart.service';

@Component({
  selector: 'shop-page',
  imports: [Header, Footer, CommonModule],
  templateUrl: './shop.html',
  styleUrl: './shop.css'
})
export class Shop implements OnInit {

  products: any[] = [];

  constructor(private router: Router, private backendApi: BackendapiService, private cartService: CartService) { }

  ngOnInit(): void {
    this.backendApi.getProductList().subscribe({
      next: (res) => {
        this.products = res.data;
        console.log("Products loaded:", this.products);
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
