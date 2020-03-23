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
  actorToBeUpdated: Actor;
  updateMode: boolean = false;

  //to the the real server
  returnedObj: Object[];

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

  openUpdateForm(actor){
    if(this.updateMode === false)
    {
      this.updateMode = true;
    }
    this.actorToBeUpdated = actor;
  }

  UpdateCompleteName(){
    //call the service with its associated method
    this.updateMode = false;
    this.actorService.UpdateActor(this.actorToBeUpdated).subscribe(() => { });
  }

  deleteActor(actor){
    // NOTE THAT ONCE THE DELETE IS EXECUTED WE REFRESH THE ACTORS LIST
    this.actorService.DeleteActor(actor).subscribe(() => { 
      this.actorService.getAllActors().subscribe(actors => this.actors = actors);
    });
  }

  previousView(){
    this.location.back();
  }

  postToServer(){
    console.log("Request to the real server !!"); 
    this.actorService.postToServer().subscribe((retObj) => { this.returnedObj = retObj;
                          console.log(this.returnedObj);});
  }

}
