import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BackendapiService } from '../../services/backendapi.service/backendapi.service';
import { Header } from "../header/header";
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-forgot-password-verify-success',
  standalone: true,
  imports: [CommonModule, Header, Footer],
  templateUrl: './forgot-password-verify-success.html',
  styleUrl: './forgot-password-verify-success.css'
})
export class ForgotPasswordVerifySuccess {
  message: string = '';
  isLoading: boolean = true;
  showButton: boolean = false;
  buttonLabel: string = '';
  buttonAction: () => void = () => { };
  messageColor: string = 'text-gray-500';

  token: string = '';
  email: string = '';


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: BackendapiService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      this.email = params['email'];

      if (this.token && this.email) {
        this.verifyEmail(this.email, this.token);
      } else {
        this.isLoading = false;
        this.message = 'Missing verification parameters!';
        this.showButton = false;
        this.messageColor = 'text-red-500';
      }
    });
  }

  verifyEmail(email: string, token: string) {
    this.apiService.verifyPasswordToken(email, token).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        const msg = res.message?.trim() || '';
        this.message = msg;

        const messageMap: Record<string, { color: string, label?: string, action?: () => void }> = {
          'email verified successfully': {
            color: 'text-blue-500',
            label: 'Continue Setup',
            action: () => this.router.navigate(
              ['/reset-password'],
              { queryParams: { token: this.token, email: this.email } }
            )
          },
          'you have already verifyed': {
            color: 'text-green-500',
            label: 'Go to Reset Password',
            action: () => this.router.navigate(
              ['/reset-password'],
              { queryParams: { token: this.token, email: this.email } }
            )
          },
          'invalid or expired token': {
            color: 'text-red-500',
            label: 'Resend Verification Email',
            action: () => this.router.navigate(
              ['/forgot-password'],
              { queryParams: { resend: true, email: this.email } }
            )
          },
          'invalid token': {
            color: 'text-red-500'
          }
        };

        const map = messageMap[msg.toLowerCase()];
        if (map) {
          this.messageColor = map.color;
          if (map.label && map.action) {
            this.showButton = true;
            this.buttonLabel = map.label;
            this.buttonAction = map.action;
          } else {
            this.showButton = false;
          }
        } else {
          this.showButton = false;
          this.messageColor = 'text-gray-500';
        }
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        this.message = 'Something went wrong. Please try again.';
        this.showButton = false;
        this.messageColor = 'text-red-500';
      }
    });
  }

  onButtonClick() {
    this.isLoading = true;
    setTimeout(() => {
      if (this.buttonAction) this.buttonAction();
      this.isLoading = false;
    }, 200);
  }

}
