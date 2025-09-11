import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Header } from "../../shared-components/header/header";
import { Footer } from "../../shared-components/footer/footer";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Header, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;

  testimonials = [
    { name: 'Alice Smith', role: 'CEO, TechCorp', message: 'This product is amazing! Totally boosted our productivity.' },
    { name: 'John Doe', role: 'Designer, Creatives', message: 'Absolutely love the service. Highly recommend it to everyone.' },
    { name: 'Emma Johnson', role: 'Manager, InnovateX', message: 'A fantastic experience from start to finish. Very professional.' }
  ];

  currentIndex = 0;
  interval: any;

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngAfterViewInit(): void {
    const video = this.bgVideo.nativeElement;
    video.muted = true; // ensure muted
    video.play().catch(err => {
      console.warn('Autoplay blocked:', err);
      document.body.addEventListener('click', () => video.play(), { once: true });
    });
  }

  startAutoSlide() {
    this.interval = setInterval(() => this.next(), 5000);
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
  }

  goTo(index: number) {
    this.currentIndex = index;
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
