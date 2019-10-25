import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { StarWarsApiService } from '../../../core/services/star-wars-api.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnChanges {

  search = new FormControl('', [Validators.minLength(2)]);
  people = [];
  planets = [];
  spaceships = [];
  films = [];
  filterByUrls = [];

  constructor(private swapiService: StarWarsApiService) { }

  @Output() filterBy = new EventEmitter<any>();
  @Input() showFilterBox: any;
  @Input() removeAllFilters: boolean;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.removeAllFilters) {
      if (this.removeAllFilters) {
        this.filterByUrls = [];
      }
    }
  }

  ngOnInit() {
  }

  // Search star war entities
  searchStarWar() {
    if (this.search.valid && !this.search.pristine) {
      if (this.search.value === '') {
        this.people = this.spaceships = this.planets = this.films = [];
        return;
      }
      this.swapiService.searchStarWarsEntities(this.search.value).subscribe((x: any) => {
        this.people = x[0].results;
        this.spaceships = x[1].results;
        this.planets = x[2].results;
        this.films = x[3].results;
      });
    }
  }

  /**
   * Toggle filter List
   * @param url clicked card url
   */
  toggleFilter(url: string) {
    if (this.filterByUrls.indexOf(url) === -1) {
      this.filterByUrls.push(url);
      this.filterBy.emit(this.filterByUrls);
    } else {
      this.filterByUrls.splice(this.filterByUrls.indexOf(url), 1);
      this.filterBy.emit(this.filterByUrls);
    }
  }

}
