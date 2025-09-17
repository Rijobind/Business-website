import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Header } from "../../shared-components/header/header";
import { AnimateOnScrollDirective } from '../../animate-on-scroll.directive';
import { Contact } from "../../shared-components/contact/contact";
import { Router } from '@angular/router';
import { OrderPage } from "../order-page/order-page";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Header, AnimateOnScrollDirective, Contact, OrderPage],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnDestroy {
  currentIndex = 0;
  interval: any;

  @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;

  constructor(private router: Router) { }


  goTo(index: number) {
    this.currentIndex = index;
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  OnContact() {
    this.router.navigate(['/contact']);
  }
}
