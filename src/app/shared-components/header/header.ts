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
    this.isHomePage = this.router.url === '/';
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  onContact() {
    this.router.navigate(['/contact']);
  }
  onReturnsPolicy() {
    this.router.navigate(['/returns-policy']);
  }
  onAcceptableUsePolicy() {
    this.router.navigate(['/acceptable-use-policy']);
  }
  onCookiePolicy() {
    this.router.navigate(['/cookie-policy']);
  }
  onTermsOfService() {
    this.router.navigate(['/terms-of-service']);
  }
  onPrivacyPolicy() {
    this.router.navigate(['/privacy-policy']);
  }
}
