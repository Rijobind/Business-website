import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[appAnimateOnScroll]',
    standalone: true
})
export class AnimateOnScrollDirective implements OnInit {
    @Input('appAnimateOnScroll') animationClass!: string;

    constructor(private el: ElementRef) { }

    ngOnInit(): void {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.el.nativeElement.classList.add('animate__animated', this.animationClass);
                    observer.unobserve(this.el.nativeElement);
                }
            });
        }, { threshold: 0.2 });

        observer.observe(this.el.nativeElement);
    }
}
