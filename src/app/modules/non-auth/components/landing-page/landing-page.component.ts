import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { StarWarsApiService } from '../../../../core/services/star-wars-api.service';
import { People } from '../../../../models/people';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  constructor(private router: Router, private activeRoute: ActivatedRoute, private swapiService: StarWarsApiService) { }

  peopleList: People[] = [];
  total = 0;
  currentPage = 1;
  countsPerPage = 1;
  totalPages = 1;
  filteredPeopleList: People[] = [];
  searchFilter = '';
  isLoading = false;
  filterByList: any[];
  removeAllFilters = false;

  ngOnInit() {
    this.getPeopleData({});
  }

  getPeopleData(params: any) {
    if (Object.keys(params).length === 0) {
      params = {page: 1};
    }
    this.currentPage = params.page;
    this.isLoading = true;
    this.swapiService.getPeople(params).subscribe((res: any) => {
      this.filteredPeopleList = [];
      this.peopleList = res.results as People[];
      this.total = res.count;
      this.countsPerPage = this.peopleList.length;
      this.totalPages = Math.floor(this.total / this.countsPerPage) + 1;
      this.isLoading = false;
    });
  }

  /**
   * Clear filters
   */
  clearFilters() {
    this.filteredPeopleList = [];
    this.searchFilter = '';
    this.removeAllFilters = true;
  }

  /**
   * Filter by starships/homeworld/species
   * @param url clicked element url
   */
  filterPeople(filter: any) {
    this.searchFilter = filter.name;
    let filtered = [];
    this.removeAllFilters = true;
    if (filter.url.includes('starships')) {
      // filter by starships
      filtered = this.filterByStarships(filter.url, this.peopleList);
    }
    if (filter.url.includes('planets')) {
      // filter by planets
      filtered = this.filterByPlanets(filter.url, this.peopleList);
    }
    if (filter.url.includes('species')) {
      // filter by species
      filtered = this.peopleList.filter(p => p.species.filter(s => s === filter.url).length  > 0);
    }
    this.filteredPeopleList = filtered;
  }

  searchBarFilter(e: any) {
    this.removeAllFilters = false;
    this.filterByList = e;
    let filtered = [];
    if (e.length > 0) {
      this.filterByList.forEach((url: any, i = 0) => {
        // filter by starships
        if (url.includes('starships')) {
          filtered = i > 0 && (this.searchFilter || this.filterByList.length > 0)
          ? this.filterByStarships(url, this.filteredPeopleList)
          : this.filterByStarships(url, this.peopleList);
        }
        if (url.includes('planets')) {
          // filter by planets
          filtered = i > 0 && (this.searchFilter || this.filterByList.length > 0)
          ? this.filterByPlanets(url, this.filteredPeopleList)
          : this.filterByPlanets(url, this.peopleList);
        }
        if (url.includes('films')) {
          // filter by films
          filtered = i > 0 && (this.searchFilter || this.filterByList.length > 0)
            ? this.filterByFilms(url, this.filteredPeopleList)
            : this.filterByFilms(url, this.peopleList);
        }
        if (url.includes('people')) {
          // filter by people
          filtered = i > 0 && (this.searchFilter || this.filterByList.length > 0)
            ? this.filterByPeople(url, this.filteredPeopleList)
            : this.filterByPeople(url, this.peopleList);
        }
        this.filteredPeopleList = filtered;
      });
    }
    if (e.length === 0 && this.searchFilter === '') {
      this.clearFilters();
    }
  }

  filterByStarships(url: string, list: People[]): People[] {
    return list.filter(p => p.starships.filter(ship => ship === url).length  > 0);
  }

  filterByPlanets(url: string, list: People[]): People[] {
    return list.filter(p => p.homeworld === url);
  }

  filterByFilms(url: string, list: People[]): People[] {
    return list.filter(p => p.films.filter(s => s === url).length  > 0);
  }
  filterByPeople(url: string, list: People[]): People[] {
    return list.filter(p => p.url === url);
  }

}
