import { Injectable } from '@angular/core';
import { HttpClientService } from '../interceptors/http-client.service';
import { Observable, Subject, forkJoin } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class StarWarsApiService {

    constructor(private httpService: HttpClientService) { }

    getFilmNames() {
        return new Observable(result => {
            this.httpService.get(`films/`).subscribe((fRes: any) => {
                const films = [];
                fRes.results.forEach((f: any) => {
                    films.push({url: f.url, title: f.title, description: f.opening_crawl });
                });
                result.next(films);
                result.complete();
            });
        });
    }

    getPeople(params: any) {
        return new Observable(result => {
            this.httpService.get(`people/?page=${params.page}`).subscribe((peopleRes: any) => {
                const peopleList = peopleRes.results;
                peopleList.forEach(person => {
                    person.ships = [];
                    person.speciesNames = [];
                    person.filmNames = [];
                    let filmNameList = [];
                    this.getFilmNames().subscribe((x: any) => {
                        filmNameList = x;
                        person.films.forEach(film => {
                            person.filmNames.push(filmNameList.find(f => f.url === film));
                        });
                    });
                    person.starships.forEach(p => {
                      this.getPersonStarShips(p).subscribe(r => person.ships.push(r));
                    });

                    this.getPersonPlanetName(person.homeworld).subscribe(r => person.home = r);

                    person.species.forEach(s => {
                      this.getPersonSpecies(s).subscribe(r => person.speciesNames.push(r));
                    });
                  });
                result.next(peopleRes);
                result.complete();
            });
        });
    }

    private getPersonStarShips(shipUrl: string): Observable<object> {
        return new Observable(x => {
            this.httpService.get(shipUrl).subscribe((shipRes: any) => {
                x.next({name: shipRes.name, url: shipRes.url});
                x.complete();
            });
        });
    }

    private getPersonPlanetName(planetUrl: string): Observable<string> {
        return new Observable(x => {
            this.httpService.get(planetUrl).subscribe((pRes: any) => {
                x.next(pRes.name);
                x.complete();
            });
        });
    }

    private getPersonSpecies(speciesUrl: string): Observable<object> {
        return new Observable(x => {
            this.httpService.get(speciesUrl).subscribe((sRes: any) => {
                x.next({name: sRes.name, url: sRes.url});
                x.complete();
            });
        });
    }

    searchStarWarsEntities(searchValue: string) {
        return forkJoin([
            this.httpService.get(`people/?search=${searchValue}`),
            this.httpService.get(`starships/?search=${searchValue}`),
            this.httpService.get(`planets/?search=${searchValue}`),
            this.httpService.get(`films/?search=${searchValue}`),
        ]);
    }
}
