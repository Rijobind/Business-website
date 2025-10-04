import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Header } from "../../shared-components/header/header";
import { AnimateOnScrollDirective } from '../../animate-on-scroll.directive';
import { Contact } from "../../shared-components/contact/contact";
import { Router } from '@angular/router';
import { BackendapiService } from '../../services/backendapi.service/backendapi.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Header, AnimateOnScrollDirective, Contact, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  products: any[] = [];
  loading: boolean = true;

  constructor(
    private router: Router,
    private apiService: BackendapiService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.apiService.getProduct().subscribe({
      next: (res: any) => {
        console.log('API response:', res);
        this.products = res?.data || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching products', err);
        this.loading = false;
      }
    });
  }

  OnContact() {
    this.router.navigate(['/contact']);
  }

  OnProductContact(title: string) {
    this.router.navigate(['/contact'], { queryParams: { title } });
  }

}
