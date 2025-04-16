import { Route } from '@angular/router';
import { UserOverviewComponent } from './User/user-overview/user-overview.component';
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
import { LoginComponent } from './Login/login.component';
import { BiomeOverviewComponent } from './Biome/biome-overview/biome-overview.component';
import { BiomeDetailsComponent } from './Biome/Biome-details/biome-details.component';
import { BiomeFormComponent } from './Biome/Biome-form/biome-form.component';
import { AuthGuard } from './Auth/auth.guard'; 

export const appRoutes: Route[] = [

  { path : '', component: HomePageComponent},
  { path: 'register', component: UserRegisterComponent},
  { path: 'register/:id', component: UserRegisterComponent},	
  { path: 'login', component: LoginComponent}, 
  { path: 'about', component: AboutPageComponent},

  { path: 'users', component: UserOverviewComponent, canActivate: [AuthGuard] },
  { path: 'users/:id', component: UserDetailsComponent, canActivate: [AuthGuard] },

  { path: 'enemies', component: EnemyOverviewComponent, canActivate: [AuthGuard]},
  { path: 'enemies/:id', component: EnemyDetailsComponent, canActivate: [AuthGuard]},
  { path: 'new-enemy', component: EnemyFormComponent, canActivate: [AuthGuard]},
  { path: 'new-enemy/:id', component: EnemyFormComponent, canActivate: [AuthGuard]},

  { path: 'items', component: ItemOverviewComponent, canActivate: [AuthGuard]},
  { path: 'items/:id', component: ItemDetailsComponent, canActivate: [AuthGuard]},
  { path: 'new-item', component: ItemFormComponent, canActivate: [AuthGuard]},
  { path: 'new-item/:id', component: ItemFormComponent, canActivate: [AuthGuard]},

  { path: 'biomes', component: BiomeOverviewComponent, canActivate: [AuthGuard]},
  { path: 'biomes/:id', component: BiomeDetailsComponent, canActivate: [AuthGuard]},
  { path: 'new-biome', component: BiomeFormComponent, canActivate: [AuthGuard]},
  { path: 'new-biome/:id', component: BiomeFormComponent, canActivate: [AuthGuard]},
];