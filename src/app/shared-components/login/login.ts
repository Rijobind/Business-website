import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendapiService } from '../../services/backendapi.service/backendapi.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { AuthService } from '../../services/auth.service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [CommonModule, FormsModule, Header, Footer]
})
export class Login {
  username = '';
  password = '';
  showPassword = false;
  isLoading = false;
  isLoginLoading = false;


  constructor(private api: BackendapiService, private router: Router, private auth: AuthService) { }

  onLogin() {
    if (!this.username || !this.password) {
      alert('Enter username and password');
      return;
    }
    this.isLoginLoading = true;
    this.isLoading = true;

    this.api.postLogin(this.username, this.password).subscribe({
      next: (res: any) => {
        this.isLoading = false;

        if (res.success) {
          const user = res.data;
          const token = res.data.token || '';
          this.auth.setUser(user, token);
          this.router.navigate(['/cart']);
        }
        else {
          alert(res.message || 'Invalid login');
        }
      },
      error: (err) => {
        this.isLoading = false;
        alert('Login failed. Please try again.');
      }
    });
    setTimeout(() => {
      this.isLoginLoading = false;
    }, 2000);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onRegister() {
    this.router.navigate(['/registration']);
  }

  onForgetPassword() {
    this.router.navigate(['/forgot-password']);
  }
}
