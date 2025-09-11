// import { CommonModule } from '@angular/common';
// import { AfterViewInit, Component, HostListener } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-header',
//   imports: [CommonModule],
//   templateUrl: './header.html',
//   styleUrl: './header.css'
// })
// export class Header {
//   isScrolled = false;

//   constructor(private router: Router) { }


//   @HostListener('window:scroll', [])
//   onWindowScroll() {
//     this.isScrolled = window.scrollY > 50;
//   }

//   onContact() {
//     this.router.navigate(['/contact'])
//   }
//   onReturnsPolicy() {
//     this.router.navigate(['/returns-policy'])
//   }
//   onAcceptableUsePolicy() {
//     this.router.navigate(['/acceptable-use-policy'])
//   }
//   onCookiePolicy() {
//     this.router.navigate(['/cookie-policy'])
//   }
//   onTermsOfService() {
//     this.router.navigate(['/terms-of-service'])
//   }
//   onPrivacyPolicy() {
//     this.router.navigate(['/privacy-policy'])
//   }
// }

import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
  isScrolled = false;
  isHomePage = false;

  constructor(private router: Router) {
    this.isHomePage = this.router.url === '/'; // detect if current page is home
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  onContact() { this.router.navigate(['/contact']); }
  onReturnsPolicy() { this.router.navigate(['/returns-policy']); }
  onAcceptableUsePolicy() { this.router.navigate(['/acceptable-use-policy']); }
  onCookiePolicy() { this.router.navigate(['/cookie-policy']); }
  onTermsOfService() { this.router.navigate(['/terms-of-service']); }
  onPrivacyPolicy() { this.router.navigate(['/privacy-policy']); }
}
