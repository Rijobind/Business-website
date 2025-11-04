import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Header } from "../../shared-components/header/header";
import { Footer } from "../../shared-components/footer/footer";
import { BackendapiService } from '../../services/backendapi.service/backendapi.service';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule, Header, Footer],
  templateUrl: './privacy-policy.html',
  styleUrls: ['./privacy-policy.css']
})
export class PrivacyPolicy implements OnInit {
  traccpCode: string = '';
  termsData: any = null;

  constructor(private route: ActivatedRoute, private api: BackendapiService) { }

  ngOnInit(): void {
    this.traccpCode = this.route.snapshot.paramMap.get('traccp_code') || 'privacy-policy';
    this.api.gettraccp(this.traccpCode).subscribe({
      next: (res) => {
        if (res && res.success && res.data) {
          this.termsData = res.data;
        }
      },
      error: (err) => {
      }
    });
  }
}
