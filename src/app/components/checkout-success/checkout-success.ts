import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Header } from "../../shared-components/header/header";
import { Footer } from "../../shared-components/footer/footer";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendapiService } from '../../services/backendapi.service/backendapi.service';
import { AuthService } from '../../services/auth.service/auth.service';

declare var paypal: any;

@Component({
  selector: 'app-checkout-success',
  standalone: true,
  imports: [Header, Footer, CommonModule, FormsModule],
  templateUrl: './checkout-success.html',
  styleUrls: ['./checkout-success.css']
})
export class CheckoutSuccess implements OnInit, AfterViewInit {
  @ViewChild('paypalContainer', { static: false }) paypalContainer!: ElementRef;
  checkout_id: string = '';
  checkoutData: any = null;
  checkoutItems: any[] = [];
  subtotal: number = 0;
  shipping: number = 0;
  total: number = 0;

  addresses: any[] = [];
  selectedAddress: any = null;
  selectedAddressId: string = '';
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

  ngAfterViewInit(): void {
    if (this.selectedPayment === 'paypal') {
      this.renderPayPalButton();
    }
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
    this.router.navigate(['/user-profile']);
  }

  onAddressChange() {
    this.selectedAddress = this.addresses.find(a => a.address_id === this.selectedAddressId) || null;
  }

  selectPayment(method: string) {
    this.selectedPayment = method;

    if (method === 'paypal') {
      setTimeout(() => this.renderPayPalButton(), 0);
    }
  }

  renderPayPalButton() {
    if (!this.paypalContainer) return;

    const container = this.paypalContainer.nativeElement;
    container.innerHTML = '';

    paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: { value: this.total.toFixed(2) },
            description: 'Order from Inno Grafiks'
          }]
        });
      },
      onApprove: async (data: any, actions: any) => {
        const details = await actions.order.capture();
        console.log('✅ Payment Successful:', details);
        this.completePurchaseWithPayPal(details);
      },
      onError: (err: any) => {
        console.error('❌ PayPal Error:', err);
        alert('PayPal payment failed. Please try again.');
      }
    }).render(container);
  }

  completePurchaseWithPayPal(details: any) {
    const payload = {
      checkout_id: this.checkout_id,
      address_id: this.selectedAddressId,
      payment_method: 'paypal',
      transaction_id: details.id,
      payer_email: details.payer.email_address,
    };

    console.log('Sending to backend:', payload);
    // Example:
    this.checkoutService.completeCheckout(payload).subscribe({
      next: () => alert('Purchase completed successfully!'),
      error: (err) => alert('Error completing purchase.')
    });
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

    if (this.selectedPayment === 'stripe') {
      alert('Stripe payment integration coming soon!');
    }
  }
}
