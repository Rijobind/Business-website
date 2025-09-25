import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, OnDestroy } from '@angular/core';
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
export class Home {

  products: any[] = [];

  constructor(private router: Router, private apiService: BackendapiService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.apiService.getProduct().subscribe({
      next: (res: any) => {
        console.log('API response:', res);
        this.products = res?.data || [];
      },
      error: (err) => console.error('Error fetching products', err)
    });
  }

  OnContact() {
    this.router.navigate(['/contact']);
  }

  OnProductContact(title: string) {
    this.router.navigate(['/contact'], { queryParams: { title } });
  }

}
