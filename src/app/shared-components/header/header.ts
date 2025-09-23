// import { CommonModule } from '@angular/common';
// import { Component, HostListener } from '@angular/core';
// import { Router } from '@angular/router';
// import { CartService } from '../../services/cart.service/cart.service';
// import { AuthService } from '../../services/auth.service/auth.service';
// import { Observable } from 'rxjs';

// @Component({
//   selector: 'app-header',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './header.html',
//   styleUrls: ['./header.css']
// })
// export class Header {
//   isScrolled = false;
//   isHomePage = false;
//   cartCount = 0;

//   user$: Observable<any | null>; // Observable for async pipe

//   constructor(
//     private router: Router,
//     private cartService: CartService,
//     private auth: AuthService
//   ) {
//     this.isHomePage = this.router.url === '/';
//     this.cartCount = 0;

//     this.user$ = this.auth.user$; // assign observable

//     // Update cart count
//     this.cartService.cart$.subscribe(items => this.cartCount = items.length);
//     console.log("Header constructor - current user from AuthService:", this.auth.currentUser);
//   }

//   onLogout() {
//     this.auth.clearUser();
//     this.router.navigate(['/login']);
//   }

//   @HostListener('window:scroll', [])
//   onWindowScroll() {
//     this.isScrolled = window.scrollY > 50;
//   }

//   // Navigation methods
//   onContact() { this.router.navigate(['/contact']); }
//   onTermsOfService() { this.router.navigate(['/terms-of-service']); }
//   onReturnsPolicy() { this.router.navigate(['/returns-policy']); }
//   onAcceptableUsePolicy() { this.router.navigate(['/acceptable-use-policy']); }
//   onCookiePolicy() { this.router.navigate(['/cookie-policy']); }
//   oncancellationsbilling() { this.router.navigate(['/cancellations-billing']); }
//   onPrivacyPolicy() { this.router.navigate(['/privacy-policy']); }
//   onShop() { this.router.navigate(['/shop']); }
//   onCart() { this.router.navigate(['/cart']); }
//   goToProfile() { this.router.navigate(['/profile']); }
//   goToLogin() { this.router.navigate(['/login']); }
// }

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

  user$: Observable<any | null>; // Observable from AuthService

  constructor(
    private router: Router,
    private cartService: CartService,
    private auth: AuthService
  ) {
    this.user$ = this.auth.user$; // reactive user observable
  }

  ngOnInit() {
    this.isHomePage = this.router.url === '/';

    // Update cart count dynamically
    this.cartService.cart$.subscribe(items => this.cartCount = items.length);

    // Optional: log user for debugging
    this.user$.subscribe(u => console.log('Header user$', u));
  }

  onLogout() {
    this.auth.clearUser();
    this.router.navigate(['/login']);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  // Navigation methods
  onContact() { this.router.navigate(['/contact']); }
  onTermsOfService() { this.router.navigate(['/terms-of-service']); }
  onReturnsPolicy() { this.router.navigate(['/returns-policy']); }
  onAcceptableUsePolicy() { this.router.navigate(['/acceptable-use-policy']); }
  onCookiePolicy() { this.router.navigate(['/cookie-policy']); }
  oncancellationsbilling() { this.router.navigate(['/cancellations-billing']); }
  onPrivacyPolicy() { this.router.navigate(['/privacy-policy']); }
  onShop() { this.router.navigate(['/shop']); }
  onCart() { this.router.navigate(['/cart']); }
  goToProfile() { this.router.navigate(['/profile']); }
}
