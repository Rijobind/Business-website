import { Component } from '@angular/core';
import { Header } from "../../shared-components/header/header";
import { Footer } from "../../shared-components/footer/footer";
import { BackendapiService } from '../../services/backendapi.service/backendapi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service/cart.service';

@Component({
  selector: 'app-product-details',
  imports: [Header, Footer, CommonModule],
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.css']
})
export class ProductDetails {
  product: any;

  constructor(private route: ActivatedRoute, private router: Router, private backendApi: BackendapiService, private cartService: CartService) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.backendApi.getProductById(productId).subscribe({
        next: (res) => {
          this.product = res.data;
        },
        error: (err) => {
        }
      });
    }
  }

  addToCart() {
    if (!this.product) return;
    this.cartService.addToCart(this.product, 1);
  }

  onCart() {
    this.router.navigate(['/cart'])
  }

}
