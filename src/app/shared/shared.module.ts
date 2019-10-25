import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CardComponent, PaginatorComponent, CarouselComponent } from './components';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    CardComponent,
    PaginatorComponent,
    CarouselComponent,
    SpinnerComponent,
    SearchBarComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardComponent,
    PaginatorComponent,
    CarouselComponent,
    SpinnerComponent,
    SearchBarComponent
  ]
})
export class SharedModule { }
