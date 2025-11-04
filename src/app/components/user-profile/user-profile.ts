import { Component, OnInit } from '@angular/core';
import { Header } from "../../shared-components/header/header";
import { Footer } from "../../shared-components/footer/footer";
import { AuthService } from '../../services/auth.service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { BackendapiService } from '../../services/backendapi.service/backendapi.service';
import { AddAddress } from "../../models/add-address/add-address";
import { EditAddress } from "../../models/edit-address/edit-address";
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [Header, Footer, CommonModule, FormsModule, AddAddress, EditAddress],
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.css']
})
export class UserProfile implements OnInit {
  user$: Observable<any | null>;
  userData: any;
  userAddress: any[] = [];
  OrderHistory: any[] = [];
  isLoading = true;
  showAddressModal = false;
  showEditAddressModal = false;
  selectedAddress: any = null;
  isAddressLoading = true;

  constructor(private auth: AuthService, private backendapi: BackendapiService, private router: Router) {
    this.user$ = this.auth.user$;
  }

  ngOnInit() {
    this.user$.subscribe(user => {
      if (user) {
        this.userData = user;
        this.loadAddress();
        this.getOrderHistory();
      }
    });
  }

  loadAddress() {
    const userId = this.auth.currentUser?.userId;
    if (!userId) return;

    this.isAddressLoading = true;
    this.backendapi.getAddressByUserId(userId).subscribe({
      next: (res: any) => {
        this.userAddress = res?.data?.am_customer_shipping_addresses || [];
        this.isAddressLoading = false;
      },
      error: err => {
        this.isAddressLoading = false;
      }
    });
  }

  getOrderHistory() {
    const userId = this.auth.currentUser?.userId;
    if (!userId) return;

    this.isLoading = true;
    this.backendapi.getOrderHistoryByUserId(userId).subscribe({
      next: (res: any) => {
        this.OrderHistory = res.data || [];
        this.isLoading = false;
      },
      error: err => {
        this.isLoading = false;
      }
    });
  }

  onShop() {
    this.router.navigate(['/shop']);
  }

  openAddressModal() {
    this.showAddressModal = true;
  }

  closeAddressModal() {
    this.showAddressModal = false;
    this.loadAddress();
  }

  openEditAddressModal(address: any) {
    this.selectedAddress = address;
    this.showEditAddressModal = true;
  }

  closeEditAddressModal() {
    this.showEditAddressModal = false;
    this.selectedAddress = null;
    this.loadAddress();
  }

  onAddressSaved(addressData: any) {
    if (addressData) this.userAddress.unshift(addressData);
    this.closeAddressModal();
  }

  onAddressUpdated(updatedAddress: any) {
    const index = this.userAddress.findIndex(addr => addr.address_id === updatedAddress.address_id);
    if (index !== -1) this.userAddress[index] = updatedAddress;
    this.closeEditAddressModal();
  }
}
