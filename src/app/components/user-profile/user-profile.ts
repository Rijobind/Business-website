import { Component } from '@angular/core';
import { Header } from "../../shared-components/header/header";
import { Footer } from "../../shared-components/footer/footer";
import { AuthService } from '../../services/auth.service/auth.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  imports: [Header, Footer, CommonModule],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css'
})
export class UserProfile {
  user$: Observable<any | null>;

  constructor(private auth: AuthService) {
    this.user$ = this.auth.user$;
    console.log("auth", this.auth)
  }
}
