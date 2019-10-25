import { ModuleWithProviders } from '@angular/compiler/src/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './shared';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/non-auth').then(m => m.NonAuthModule)
  },
  {
    component: NotFoundComponent,
    path: '404'
  },
  {
    path: '**',
    redirectTo: '404',
    pathMatch: 'full'
  }
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes, {
  onSameUrlNavigation: 'reload'
});
