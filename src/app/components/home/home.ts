import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Header } from "../../shared-components/header/header";
import { AnimateOnScrollDirective } from '../../animate-on-scroll.directive';
import { Contact } from "../../shared-components/contact/contact";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Header, AnimateOnScrollDirective, Contact],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  constructor(private router: Router) { }

  OnContact() {
    this.router.navigate(['/contact']);
  }
}
