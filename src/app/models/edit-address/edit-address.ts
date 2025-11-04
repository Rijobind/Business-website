import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service/auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BackendapiService } from '../../services/backendapi.service/backendapi.service';

@Component({
  selector: 'app-edit-address',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-address.html',
  styleUrls: ['./edit-address.css']
})
export class EditAddress implements OnInit {
  @Input() user: any;
  @Input() addressToEdit: any;
  @Output() close = new EventEmitter<void>();
  @Output() addressUpdated = new EventEmitter<any>();

  countries: any[] = [];
  isSaving = false;

  address = {
    email: '',
    country: '',
    city: '',
    state: '',
    postalCode: '',
    contactPerson: '',
    contactNumber: '',
    address_1: '',
    address_2: ''
  };

  constructor(private auth: AuthService, private backend: BackendapiService) { }

  ngOnInit(): void {
    this.loadCountries();

    if (this.addressToEdit) {
      this.address = {
        email: this.user?.email || '',
        country: this.addressToEdit.country || '',
        city: this.addressToEdit.city || '',
        state: this.addressToEdit.state || '',
        postalCode: this.addressToEdit.postal_code || '',
        contactPerson: this.addressToEdit.contact_person || '',
        contactNumber: this.addressToEdit.contact_no || '',
        address_1: this.addressToEdit.address_1 || '',
        address_2: this.addressToEdit.address_2 || ''
      };
    }
  }

  loadCountries() {
    this.backend.getCountryList().subscribe({
      next: (res: any) => (this.countries = res.data || []),
    });
  }

  isContactNumberInvalid(): boolean {
    return this.address.contactNumber ? !/^\d{10}$/.test(this.address.contactNumber) : false;
  }

  updateAddress(editForm: NgForm) {
    if (!editForm.valid || this.isContactNumberInvalid()) return;
    this.isSaving = true;

    const userId = this.auth.currentUser?.userId || this.user?.userId;

    const payload = {
      address_id: this.addressToEdit.address_id,
      user_id: userId,
      country: this.address.country,
      city: this.address.city,
      state: this.address.state,
      postal_code: this.address.postalCode,
      contact_person: this.address.contactPerson,
      contact_no: this.address.contactNumber,
      address_1: this.address.address_1,
      address_2: this.address.address_2
    };


    this.backend.postEditedAddressByAddressId(this.addressToEdit.address_id, payload).subscribe({
      next: (res) => {
        const updated = res.data || payload;
        this.addressUpdated.emit(updated);
        this.close.emit();
        this.isSaving = false;
      },
      error: (err) => {
        alert('Failed to update address.');
        this.isSaving = false;
      }
    });
  }

  closeModal() {
    this.close.emit();
  }
}
