import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';  // used for backtrack routing
import { ActorService } from '../actor.service';

import { Actor } from '../actor';

import $ from 'jquery';

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrls: ['./actor-list.component.css']
})
export class ActorListComponent implements OnInit {

  // ----- RIGA 42 ----- //

  actors: Actor[]; // array of actors
  actorToBeUpdated: Actor;
  actorToBeDeleted: Actor = null;           
  updateMode: boolean = false;


  //to the the real server
  returnedObj: Object[];

  constructor(
    private location: Location,
    private actorService : ActorService
    ) { }

  ngOnInit(): void {
    //call getActors on the service

    this.actorService.readAllActors().subscribe(actors => this.actors = actors);
    //this.actorService.getAllActors().subscribe(actors => this.actors = actors);

    //console.log("ALL THE ACTORS HAVE BEEN RETRIEVED !");
    // | async to display actors in html => NOT NECESSARY BECAUSE I'M USING SUBSCRIBE

    $('#confDeleteActorAlert').hide();
    $('#modalUpdActor').hide();
  }

  openUpdateForm(actor){
    this.actorToBeUpdated = Object.assign({}, actor);


    if(this.updateMode === false)
    {
      this.updateMode = true;
    }
    
  }

  UpdateCompleteName(){
    //close the bootstrap modal
    this.updateMode = false;
    $('#actor-list container').removeClass('modal-open');
    $('.modal-backdrop').remove();
    //call the service with its associated method
    this.actorService.UpdateActor(this.actorToBeUpdated).subscribe(() => { this.actorService.readAllActors().subscribe(actors => this.actors = actors); });
  }

  setActorToBeDeleted(actor){
    console.log("Target set");
    
    this.actorToBeDeleted = Object.assign({}, actor);
    $('#confDeleteActorAlert').show();
  }

  dontConfirmDelete(){
    $('#confDeleteActorAlert').hide();
  }

  deleteActor(){
    $('#confDeleteActorAlert').hide();

    // this method is always executed after that the actorToBeDeleted is set

    // NOTE THAT ONCE THE DELETE IS EXECUTED WE REFRESH THE ACTORS LIST
    this.actorService.DeleteActor(this.actorToBeDeleted).subscribe(() => { 
      this.actorService.readAllActors().subscribe(actors => this.actors = actors);
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
