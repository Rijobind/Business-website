import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { BackendapiService, ContactPayload } from '../../services/backendapi.service/backendapi.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [Header, Footer, ReactiveFormsModule, CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {
  contactForm: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder, private api: BackendapiService) {
    this.contactForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isLoading = true;
      const payload: ContactPayload = this.contactForm.value;

      this.api.postContactDetails(payload).subscribe({
        next: (res) => {
          alert('Your message has been sent successfully!');
          this.contactForm.reset();
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
        }
      });
    }
  }
}
