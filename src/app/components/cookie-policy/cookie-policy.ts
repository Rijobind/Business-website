import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Header } from "../../shared-components/header/header";
import { Footer } from "../../shared-components/footer/footer";
import { BackendapiService } from '../../services/backendapi.service/backendapi.service';

@Component({
  selector: 'app-cookie-policy',
  standalone: true,
  imports: [CommonModule, Header, Footer],
  templateUrl: './cookie-policy.html',
  styleUrls: ['./cookie-policy.css']
})
export class CookiePolicy implements OnInit {
  traccpCode: string = '';
  cookieData: any = null;

  constructor(private route: ActivatedRoute, private api: BackendapiService) { }

  ngOnInit(): void {
    this.traccpCode = this.route.snapshot.paramMap.get('traccp_code') || 'cookie-policy';

    this.api.gettraccp(this.traccpCode).subscribe({
      next: (res) => {
        if (res && res.success && res.data) {
          this.cookieData = res.data;
        }
      },
      error: (err) => {
      }
    });
  }
}
