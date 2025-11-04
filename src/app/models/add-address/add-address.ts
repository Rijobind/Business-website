import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service/auth.service';
import { BackendapiService } from '../../services/backendapi.service/backendapi.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-address',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-address.html',
  styleUrls: ['./add-address.css']
})
export class AddAddress implements OnInit {
  @Input() user: any;
  @Input() existingAddress: any = null;
  @Output() close = new EventEmitter<void>();
  @Output() addressSaved = new EventEmitter<any>();

  countries: any[] = [];
  isSavingAddress = false;

  address = {
    email: '',
    country: '',
    city: '',
    state: '',
    address_1: '',
    address_2: '',
    postalCode: '',
    contactPerson: '',
    contactNumber: ''
  };

  constructor(private auth: AuthService, private backend: BackendapiService) { }

  ngOnInit(): void {
    this.loadCountries();

    if (this.existingAddress) {
      this.address = {
        email: this.user?.email,
        country: this.existingAddress.country || '',
        city: this.existingAddress.city || '',
        state: this.existingAddress.state || '',
        address_1: this.existingAddress.address_1 || '',
        address_2: this.existingAddress.address_2 || '',
        postalCode: this.existingAddress.postal_code || '',
        contactPerson: this.existingAddress.contact_person || '',
        contactNumber: this.existingAddress.contact_no || ''
      };
    } else if (this.user) {
      this.address.email = this.user.email;
    }
  }

  loadCountries() {
    this.backend.getCountryList().subscribe({
      next: (res: any) => {
        this.countries = res.data || [];
      },
    });
  }

  isContactNumberInvalid(): boolean {
    return this.address.contactNumber ? !/^\d{10}$/.test(this.address.contactNumber) : false;
  }

  saveAddress(addressForm: NgForm) {
    if (!addressForm.valid || this.isContactNumberInvalid()) return;
    this.isSavingAddress = true;

    const currentUser = this.auth.currentUser;
    const userId = currentUser?.userId || this.user?.userId;

    const payload = {
      user_id: userId,
      email: currentUser?.email || this.user?.email,
      country: this.address.country,
      city: this.address.city,
      state: this.address.state,
      address_1: this.address.address_1,
      address_2: this.address.address_2,
      postal_code: this.address.postalCode,
      contact_person: this.address.contactPerson,
      contact_no: this.address.contactNumber
    };

    this.backend.postAddressByUserId(userId, payload).subscribe({
      next: (res) => {
        const savedAddress = res.data || payload;
        this.addressSaved.emit(savedAddress);
        this.close.emit();
        this.isSavingAddress = false;
      },
      error: (err) => {
        alert('Failed to save address.');
        this.isSavingAddress = false;
      }
    });

  }

  closeModal() {
    this.close.emit();
  }
}
