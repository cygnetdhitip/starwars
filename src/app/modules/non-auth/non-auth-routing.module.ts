import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NonAuthLayoutComponent } from './non-auth-layout.component';
import { LandingPageComponent } from './components';
import { PersonComponent } from './components/person/person.component';

const routes: Routes = [
  {
    path: '', component: NonAuthLayoutComponent,
    children: [
      { path: '', component: LandingPageComponent },
      { path: 'person', component: PersonComponent },
    ]
  }
];

export const NonAuthRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
