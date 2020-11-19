import { Routes } from '@angular/router';
import { AllVisitorsListComponent } from './all-visitors-list/all-visitors-list.component';
import { HomeComponent } from './home/home.component';
import { LiveVisitorsListComponent } from './live-visitors-list/live-visitors-list.component';
import { AuthGuard } from './_guards/auth.guard';

export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: '', // localhost:4200/[path][childPath]
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'live-visitors', component: LiveVisitorsListComponent },
      { path: 'all-visitors', component: AllVisitorsListComponent },
    ],
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
