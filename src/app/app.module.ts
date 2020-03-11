import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActorsComponent } from './actors/actors.component';
import { ActorsdetailsComponent } from './actorsdetails/actorsdetails.component';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    ActorsComponent,
    ActorsdetailsComponent,
    MessagesComponent
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
