import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Header } from "../../shared-components/header/header";
import { Footer } from "../../shared-components/footer/footer";
import { BackendapiService } from '../../services/backendapi.service/backendapi.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-returns-policy',
  standalone: true,
  imports: [CommonModule, Header, Footer],
  templateUrl: './returns-policy.html',
  styleUrls: ['./returns-policy.css']
})
export class ReturnsPolicy implements OnInit {
  traccpCode: string = '';
  policyData: any = null;

  constructor(private route: ActivatedRoute, private api: BackendapiService) { }

  ngOnInit(): void {
    this.traccpCode = this.route.snapshot.paramMap.get('traccp_code') || 'returns-policy';
    this.api.gettraccp(this.traccpCode).subscribe({
      next: (res) => {
        if (res && res.success && res.data) {
          this.policyData = res.data;
        }
      },
      error: (err) => {
      }
    });
  }
}
