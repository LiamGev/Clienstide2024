import { Route } from '@angular/router';
import { UserOverviewComponent } from './User/user-overview/overview.component';
import { UserDetailsComponent } from './User/user-details/user-details.component';
import { AboutPageComponent } from './about-page/about-page.component';

export const appRoutes: Route[] = [
  { path: 'users', component: UserOverviewComponent },
  { path: 'users/:id', component: UserDetailsComponent },
  { path: 'about', component: AboutPageComponent },
];