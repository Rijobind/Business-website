import { Component, OnInit } from '@angular/core';
import { Header } from "../../shared-components/header/header";
import { Footer } from "../../shared-components/footer/footer";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendapiService } from '../../services/backendapi.service/backendapi.service';
import { AuthService } from '../../services/auth.service/auth.service'; // for userId

@Component({
  selector: 'app-checkout-success',
  standalone: true,
  imports: [Header, Footer, CommonModule, FormsModule],
  templateUrl: './checkout-success.html',
  styleUrls: ['./checkout-success.css']
})
export class CheckoutSuccess implements OnInit {
  checkout_id: string = '';
  checkoutData: any = null;
  checkoutItems: any[] = [];
  subtotal: number = 0;
  shipping: number = 0;
  total: number = 0;
  selectedAddress: any = null;

  addresses: any[] = [];
  selectedAddressId: string = '';
  address: string = '';

  selectedPayment: string = '';

  constructor(
    private checkoutService: BackendapiService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const totals = JSON.parse(localStorage.getItem('checkoutTotals') || '{}');
    this.subtotal = totals.subtotal || 0;
    this.shipping = totals.shipping || 0;
    this.total = totals.total || 0;

    this.route.queryParams.subscribe(params => {
      this.checkout_id = params['checkoutId'];
      if (this.checkout_id) {
        this.loadCheckoutById(this.checkout_id);
      }
    });

    this.loadUserAddresses();
  }

  loadCheckoutById(checkoutId: string) {
    this.checkoutService.getCheckoutDetailsById(checkoutId).subscribe({
      next: (res) => {
        if (res.success && res.data.length > 0) {
          this.checkoutData = res.data[0];
          this.checkoutItems = this.checkoutData.im_Checkoutlists;
        }
      },
      error: (err) => console.error('Error loading checkout:', err)
    });
  }

  // loadUserAddresses() {
  //   const userId = this.authService.currentUser?.id || this.authService.currentUser?.userId;
  //   if (!userId) return;

  //   this.checkoutService.getAddressByUserId(userId).subscribe({
  //     next: (res: any) => {
  //       this.addresses = res.data?.am_customer_shipping_addresses || [];
  //       if (this.addresses.length > 0) {
  //         this.selectedAddressId = this.addresses[0].address_id;
  //         this.address = this.addresses[0].address;
  //       }
  //     },
  //     error: (err) => console.error('Error fetching addresses:', err)
  //   });
  // }

  loadUserAddresses() {
    const userId = this.authService.currentUser?.id || this.authService.currentUser?.userId;
    if (!userId) return;

    this.checkoutService.getAddressByUserId(userId).subscribe({
      next: (res: any) => {
        this.addresses = res.data?.am_customer_shipping_addresses || [];
        if (this.addresses.length > 0) {
          this.selectedAddressId = this.addresses[0].address_id;
          this.selectedAddress = this.addresses[0];
        }
      },
      error: (err) => console.error('Error fetching addresses:', err)
    });
  }

  onUserProfile() {
    this.router.navigate(['/user-profile'])
  }

  // onAddressChange() {
  //   const selected = this.addresses.find(a => a.address_id === this.selectedAddressId);
  //   this.address = selected?.address || '';
  // }

  onAddressChange() {
    this.selectedAddress = this.addresses.find(a => a.address_id === this.selectedAddressId) || null;
  }

  selectPayment(method: string) {
    this.selectedPayment = method;
  }

  completePurchase() {
    if (!this.selectedAddressId) {
      alert('Please select your shipping address.');
      return;
    }
    if (!this.selectedPayment) {
      alert('Please select a payment method.');
      return;
    }

    const payload = {
      checkout_id: this.checkout_id,
      address_id: this.selectedAddressId,
      payment_method: this.selectedPayment
    };

    // Example API call to complete checkout
    // this.checkoutService.completeCheckout(payload).subscribe({
    //   next: () => alert(`Purchase completed with ${this.selectedPayment.toUpperCase()}!`),
    //   error: (err) => alert('Error completing purchase.')
    // });
  }
}
