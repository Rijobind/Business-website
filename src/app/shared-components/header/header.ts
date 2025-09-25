import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service/cart.service';
import { AuthService } from '../../services/auth.service/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnInit {
  isScrolled = false;
  isHomePage = false;
  cartCount = 0;
  mobileMenuOpen = false;

  user$: Observable<any | null>;

  constructor(private router: Router, private cartService: CartService, private auth: AuthService) {
    this.user$ = this.auth.user$;
  }

  ngOnInit() {
    this.isHomePage = this.router.url === '/';
    this.cartService.cart$.subscribe(items => this.cartCount = items.length);
    this.user$.subscribe(u => console.log('Header user$', u));
  }

  onLogout() {
    this.auth.clearUser();
    this.router.navigate(['/login']);
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  onContact() { this.router.navigate(['/contact']); }
  onTermsOfService() { this.router.navigate(['/terms-of-service']); }
  onReturnsPolicy() { this.router.navigate(['/returns-policy']); }
  onAcceptableUsePolicy() { this.router.navigate(['/acceptable-use-policy']); }
  onCookiePolicy() { this.router.navigate(['/cookie-policy']); }
  oncancellationsbilling() { this.router.navigate(['/cancellations-billing']); }
  onPrivacyPolicy() { this.router.navigate(['/privacy-policy']); }
  onShop() { this.router.navigate(['/shop']); }
  onCart() { this.router.navigate(['/cart']); }
  goToProfile() { this.router.navigate(['/user-profile']); }
}
