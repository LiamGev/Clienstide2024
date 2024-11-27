import { Route } from '@angular/router';
import { UserOverviewComponent } from './User/user-overview/overview.component';
import { UserDetailsComponent } from './User/user-details/user-details.component';
import { UserRegisterComponent } from './User/user-register/user-register.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { EnemyOverviewComponent } from './Enemy/Enemy-overview/enemy-overview.component';
import { EnemyDetailsComponent } from './Enemy/Enemy-details/enemy-details.component';
import { EnemyFormComponent } from './Enemy/Enemy-form/enemy-form.component';
import { ItemOverviewComponent } from './Item/item-overview/item-overview.component';
import { ItemDetailsComponent } from './Item/item-details/item-details.component';
import { ItemFormComponent } from './Item/item-form/item-form.component';
import { HomePageComponent } from './Home-page/home-page.component';


export const appRoutes: Route[] = [
  { path: 'users', component: UserOverviewComponent },
  { path: 'users/:id', component: UserDetailsComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'enemies', component: EnemyOverviewComponent},
  { path: 'items', component: ItemOverviewComponent},
  { path: 'enemies/:id', component: EnemyDetailsComponent},
  { path: 'items/:id', component: ItemDetailsComponent},
  { path: 'new-enemy', component: EnemyFormComponent},
  { path: 'new-item', component: ItemFormComponent},
  { path: 'register', component: UserRegisterComponent},
  { path: '', component: HomePageComponent}
];