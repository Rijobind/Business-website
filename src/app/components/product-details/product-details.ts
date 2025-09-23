import { Component } from '@angular/core';
import { Header } from "../../shared-components/header/header";
import { Footer } from "../../shared-components/footer/footer";
import { BackendapiService } from '../../services/backendapi.service/backendapi.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [Header, Footer, CommonModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails {
  product: any;

  constructor(private route: ActivatedRoute, private backendApi: BackendapiService) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.backendApi.getProductById(productId).subscribe({
        next: (res) => {
          this.product = res.data; // or res, depends on API
          console.log("Product details:", this.product);
        },
        error: (err) => {
          console.error("Error fetching product details", err);
        }
      });
    }
  }

}
