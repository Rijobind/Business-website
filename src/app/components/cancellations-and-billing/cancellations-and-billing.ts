import { Component, OnInit } from '@angular/core';
import { Header } from "../../shared-components/header/header";
import { Footer } from "../../shared-components/footer/footer";
import { BackendapiService } from '../../services/backendapi.service/backendapi.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cancellations-and-billing',
  standalone: true,
  imports: [CommonModule, Header, Footer],
  templateUrl: './cancellations-and-billing.html',
  styleUrls: ['./cancellations-and-billing.css']
})
export class CancellationsAndBilling implements OnInit {
  traccpCode: string = 'cancellations-and-billing';
  termsData: any = null;

  constructor(private api: BackendapiService) { }

  ngOnInit(): void {
    this.loadCancellationsBilling();
  }

  loadCancellationsBilling() {
    this.api.gettraccp(this.traccpCode).subscribe({
      next: (res) => {
        if (res && res.success && res.data) {
          this.termsData = res.data;
        } else {
        }
      },
      error: (err) => {
      }
    });
  }
}
