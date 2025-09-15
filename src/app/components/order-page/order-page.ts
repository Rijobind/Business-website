import { Component } from '@angular/core';
import { Header } from "../../shared-components/header/header";
import { Footer } from "../../shared-components/footer/footer";

@Component({
  selector: 'app-order-page',
  imports: [Header, Footer],
  templateUrl: './order-page.html',
  styleUrl: './order-page.css'
})
export class OrderPage {

}
