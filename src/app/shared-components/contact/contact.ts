import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BackendapiService, ContactPayload } from '../../services/backendapi.service/backendapi.service';
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.html',
  imports: [Header, Footer, ReactiveFormsModule, CommonModule],
})
export class Contact implements OnInit {
  productTitle: string | null = null;
  contactForm!: FormGroup;
  isLoading = false;
  showSuccess = false;
  constructor(
    private fb: FormBuilder,
    private backendApi: BackendapiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });

    this.route.queryParams.subscribe(params => {
      this.productTitle = params['title'] || null;
    });
  }

  onSubmit(): void {
    if (this.contactForm.invalid) return;

    this.isLoading = true;
    const payload: ContactPayload = this.contactForm.value;

    this.backendApi.postContactDetails(payload).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.contactForm.reset();
        this.showSuccess = true;
        setTimeout(() => {
          this.showSuccess = false;
        }, 2000);
      },
      error: (err) => {
        this.isLoading = false;
      },
    });
  }
}
