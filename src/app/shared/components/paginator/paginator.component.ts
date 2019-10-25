import { Component, OnInit, Input, Output, OnChanges, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnChanges {

  @Input() total = 0;
  @Input() currentPage = 1;
  @Output() currentPageChange = new EventEmitter<any>();
  @Input() countsPerPage = 0;
  paginatorPages = [];
  totalPages = 1;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      if (changes.total && changes.countsPerPage) {
        this.totalPages = Math.floor(this.total / this.countsPerPage) + 1;
        this.paginatorPages = [];
        for (let i = 0; i < this.totalPages; i++) {
          this.paginatorPages.push(i + 1);
        }
      }
    }
  }

  ngOnInit() {
  }

  onPageChange(page: number) {
    console.log(page);
    if (page <= this.totalPages && page >= 1 ) {
    this.currentPage = page;
    this.currentPageChange.emit({page});
    }
  }

}
