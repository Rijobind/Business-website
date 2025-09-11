import { Component } from '@angular/core';
import { Header } from "../../shared-components/header/header";
import { Footer } from "../../shared-components/footer/footer";

@Component({
  selector: 'app-acceptable-use-policy',
  imports: [Header, Footer],
  templateUrl: './acceptable-use-policy.html',
  styleUrl: './acceptable-use-policy.css'
})
export class AcceptableUsePolicy {

}
