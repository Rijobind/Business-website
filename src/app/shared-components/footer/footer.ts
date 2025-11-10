import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {

  constructor(private router: Router) { }

  OnHome() {
    this.router.navigate(['/']);
  }
  onContact() {
    this.router.navigate(['/contact']);
  }
  onTermsOfService() {
    this.router.navigate(['/terms-of-service']);
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
  onTermsOfcancellationsbilling() {
    this.router.navigate(['/cancellations-and-billing']);
  }
  onPrivacyPolicy() {
    this.router.navigate(['/privacy-policy']);
  }
  onOrderPage() {
    this.router.navigate(['/order-page']);
  }
}
