import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { NonAuthRoutingModule } from './non-auth-routing.module';

import { NonAuthLayoutComponent } from './non-auth-layout.component';
import { LandingPageComponent } from './components';
import { SharedModule } from 'src/app/shared/shared.module';
import { PersonComponent } from './components/person/person.component';

@NgModule({
  declarations: [
    NonAuthLayoutComponent,
    LandingPageComponent,
    PersonComponent,
  ],
  imports: [
    CommonModule,
    NonAuthRoutingModule,
    SharedModule,
    HttpClientModule
  ]
})
export class NonAuthModule { }
