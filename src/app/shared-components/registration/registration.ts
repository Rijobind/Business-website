import { Component } from '@angular/core';
import { Footer } from "../footer/footer";
import { Header } from "../header/header";

@Component({
  selector: 'app-registration',
  imports: [Footer, Header],
  templateUrl: './registration.html',
  styleUrl: './registration.css'
})
export class Registration {

}
