import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { HttpClientService } from './interceptors/http-client.service';
import { NotFoundComponent } from '../shared';
import { StarWarsApiService } from './services';

@NgModule({
  declarations: [
    NotFoundComponent
  ],
  providers: [
    HttpClient,
    HttpClientService,
    StarWarsApiService
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ]
})
export class CoreModule { }
