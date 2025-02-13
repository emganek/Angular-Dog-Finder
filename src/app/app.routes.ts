import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dog-overview',
    loadComponent: () =>
      import('./zones/dogs/pages/dog-page/dog-page.component').then(
        (mod) => mod.DogPageComponent
      ),
  },
  {
    path: '',
    redirectTo: `/dog-overview`,
    pathMatch: 'full',
  },
];
