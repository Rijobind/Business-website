import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendapiService } from '../../services/backendapi.service/backendapi.service';
import { Footer } from "../footer/footer";
import { Header } from "../header/header";

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, CommonModule, Footer, Header],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css'
})
export class ResetPassword implements OnInit {
  showPassword = false;
  password = '';
  showConfirmPassword = false;
  confirmPassword = '';
  email: string = '';
  token: string = '';
  message: string = '';
  isLoading = false;
  tokenValid = false;

  constructor(
    private route: ActivatedRoute,
    private apiService: BackendapiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      this.email = params['email'];

      if (this.token && this.email) {
        this.verifyToken(this.email, this.token);
      } else {
        this.message = "Missing token or email!";
      }
    });
  }

  verifyToken(email: string, token: string) {
    this.isLoading = true;
    this.apiService.verifyPasswordToken(email, token).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        const msg = res.message?.toLowerCase() || '';
        if (msg.includes('success')) {
          this.tokenValid = true;
          this.message = "Token verified! You can reset your password.";
        } else {
          this.tokenValid = false;
          this.message = msg || "Invalid or expired token!";
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.tokenValid = false;
        this.message = "Something went wrong while verifying the token.";
        console.error(err);
      }
    });
  }

  onSubmit() {
    if (!this.tokenValid) {
      this.message = "Cannot reset password. Invalid token!";
      return;
    }

    if (!this.password || this.password !== this.confirmPassword) {
      this.message = "Passwords do not match!";
      return;
    }

    this.isLoading = true;
    this.apiService.resetPassword(this.token, this.email, this.password).subscribe({
      next: () => {
        this.isLoading = false;
        this.message = "Password reset successful! Redirecting to login...";
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.isLoading = false;
        this.message = err?.error || "Something went wrong!";
        console.error(err);
      }
    });
  }
}
