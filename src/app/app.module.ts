import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActorsComponent } from './actors/actors.component';
import { ActorsdetailsComponent } from './actorsdetails/actorsdetails.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ActorListComponent } from './actor-list/actor-list.component';
import { ActorDetailsComponent } from './actor-details/actor-details.component';

@NgModule({
  declarations: [
    AppComponent,
    ActorsComponent,
    ActorsdetailsComponent,
    MessagesComponent,
    DashboardComponent,
    ActorListComponent,
    ActorDetailsComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
