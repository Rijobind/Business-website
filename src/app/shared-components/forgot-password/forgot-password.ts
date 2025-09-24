import { Component } from '@angular/core';
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BackendapiService } from '../../services/backendapi.service/backendapi.service';

@Component({
  selector: 'app-forgot-password',
  imports: [Header, Footer, FormsModule, CommonModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css'
})
export class ForgotPassword {
  email: string = '';
  message: string = '';
  error: string = '';
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private apiService: BackendapiService
  ) { }

  onLogin() {
    this.router.navigate(['/login']);
  }

  resetPassword() {
    this.message = '';
    this.error = '';

    if (!this.email) {
      this.error = 'Please enter your email';
      return;
    }
    this.isLoading = true;
    this.apiService.postResetPassword(this.email).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.success) {
          this.message = 'Password reset email sent successfully!';
        } else {
          this.error = res.message || 'Something went wrong';
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.error = err.error?.message || 'Failed to send reset email';
      }
    });
  }
}
