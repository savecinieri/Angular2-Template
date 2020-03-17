import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { ActorsComponent } from './actors/actors.component';
import { ActorListComponent } from './actor-list/actor-list.component';
import { ActorDetailsComponent } from './actor-details/actor-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, //When the app starts it points to ''
  { path: 'dashboard', component: DashboardComponent},
  { path: 'actors', component: ActorsComponent },

  // new routes
  { path: 'actorsList', component: ActorListComponent},
  { path: 'detail/:id', component: ActorDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
