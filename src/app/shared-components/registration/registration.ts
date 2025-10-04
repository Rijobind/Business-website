import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Footer } from "../footer/footer";
import { Header } from "../header/header";
import { BackendapiService, RegistrationPayload } from '../../services/backendapi.service/backendapi.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [Footer, Header, ReactiveFormsModule, CommonModule],
  templateUrl: './registration.html',
  styleUrls: ['./registration.css']
})
export class Registration implements OnInit {
  registrationForm!: FormGroup;
  isLoading = false;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private api: BackendapiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      address: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    if (password !== confirm) {
      form.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      form.get('confirmPassword')?.setErrors(null);
    }
    return null;
  }

  togglePassword() { this.showPassword = !this.showPassword; }
  toggleConfirmPassword() { this.showConfirmPassword = !this.showConfirmPassword; }
  onLogin() { this.router.navigate(['/login']); }
  onTerms() { this.router.navigate(['/terms-of-service']); }

  onSubmit() {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    const payload: RegistrationPayload = {
      firstName: this.registrationForm.value.firstName,
      lastName: this.registrationForm.value.lastName,
      fullName: `${this.registrationForm.value.firstName} ${this.registrationForm.value.lastName}`,
      email: this.registrationForm.value.email,
      username: this.registrationForm.value.username,
      password: this.registrationForm.value.password,
      address: this.registrationForm.value.address
    };

    this.isLoading = true;

    this.api.postRegistration(payload).subscribe({
      next: (res) => {
        this.isLoading = false;
        alert('Registration successful! Please login.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isLoading = false;
        alert('Something went wrong. Please try again.');
      }
    });
  }

}
