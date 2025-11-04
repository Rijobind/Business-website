import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Header } from "../../shared-components/header/header";
import { Footer } from "../../shared-components/footer/footer";
import { BackendapiService } from '../../services/backendapi.service/backendapi.service';

@Component({
  selector: 'app-terms-of-service',
  standalone: true,
  imports: [CommonModule, Header, Footer],
  templateUrl: './terms-of-service.html',
  styleUrls: ['./terms-of-service.css']
})
export class TermsOfService implements OnInit {
  traccpCode: string = '';
  termsData: any = null;

  constructor(private route: ActivatedRoute, private api: BackendapiService) { }

  ngOnInit(): void {
    this.traccpCode = this.route.snapshot.paramMap.get('traccp_code') || 'terms-of-service';
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
