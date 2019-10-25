import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { People } from 'src/app/models/people';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() person: People;
  @Output() filterBy = new EventEmitter<any>();
  constructor(private el: ElementRef, private router: Router) { }

  ngOnInit() {
  }

  filter(url: string) {
    this.filterBy.emit(url);
  }

  navigateToDetails() {
    this.router.navigate(['./person'], {state: {data: this.person}});
  }
}
