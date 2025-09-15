import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
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
export class Home implements AfterViewInit, OnDestroy {
  currentIndex = 0;
  interval: any;

  @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;

  constructor(private router: Router) { }

  ngAfterViewInit(): void {
    const video = this.bgVideo.nativeElement;
    video.muted = true;
    video.play().catch(err => {
      console.warn('Autoplay blocked:', err);
      document.body.addEventListener('click', () => video.play(), { once: true });
    });
  }

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
