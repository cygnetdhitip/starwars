import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  @Input() label: string;
  @Input() content: any[];
  currentSlide = 0;

  constructor() {
  }

  ngOnInit() {
    // Move to next slide every 10 seconds
    setInterval(() => {
      this.currentSlide = ++this.currentSlide % this.content.length;
    }, 10000);
  }

  // Traverse next slide
  slideNext() {
    this.currentSlide = ++this.currentSlide % this.content.length;
  }

  // Traverse previous slide
  slidePrevious() {
    this.currentSlide = (this.currentSlide += (this.content.length - 1)) % this.content.length;
  }

}
