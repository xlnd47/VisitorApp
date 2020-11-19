import { Routes } from '@angular/router';
import { GraphsComponent } from './graphs/graphs.component';
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
      { path: 'graphs', component: GraphsComponent },
    ],
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
