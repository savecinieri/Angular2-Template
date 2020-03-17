import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';  // used for backtrack routing
import { ActorService } from '../actor.service';

import { Actor } from '../actor';

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrls: ['./actor-list.component.css']
})
export class ActorListComponent implements OnInit {

  actors: Actor[]; // array of actors

  constructor(
    private location: Location,
    private actorService : ActorService
    ) { }

  ngOnInit(): void {
    //call getActors on the service
    this.actorService.getAllActors().subscribe(actors => this.actors = actors);
    //console.log("ALL THE ACTORS HAVE BEEN RETRIEVED !");
    // | async to display actors in html => NOT NECESSARY BECAUSE I'M USING SUBSCRIBE
  }

  previousView(){
    this.location.back();
  }

}
