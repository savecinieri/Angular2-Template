import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppRoutingModule } from './app-routing.module';

//import for components
import { AppComponent } from './app.component';
import { ActorsComponent } from './actors/actors.component';
import { ActorsdetailsComponent } from './actorsdetails/actorsdetails.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ActorListComponent } from './actor-list/actor-list.component';
import { ActorDetailsComponent } from './actor-details/actor-details.component';

//import for HttpClient
import { HttpClientModule }    from '@angular/common/http';

//import to intercept the http requests
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { ActorAddComponent } from './actor-add/actor-add.component'; 

@NgModule({
  declarations: [
    AppComponent,
    ActorsComponent,
    ActorsdetailsComponent,
    MessagesComponent,
    DashboardComponent,
    ActorListComponent,
    ActorDetailsComponent,
    ActorAddComponent
  ],
  imports: [
    HttpClientModule,

    //**********************************************************************  PLEASE REMOVE WHEN NOT NECESSARY
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
        InMemoryDataService, { dataEncapsulation: false }
    ),

    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
