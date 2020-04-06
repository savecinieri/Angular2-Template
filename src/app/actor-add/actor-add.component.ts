import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';  // used for backtrack routing
import { ActorService } from '../actor.service';

import { Actor, ActorComplete } from '../actor';

@Component({
  selector: 'app-actor-add',
  templateUrl: './actor-add.component.html',
  styleUrls: ['./actor-add.component.css']
})
export class ActorAddComponent implements OnInit {

  // any field used with two-way-data-binding must be initialized
  actorToBeAddedD: string = '';
  actorToBeAddedCN: string = '';

  constructor(
    private location: Location,
    private actorService: ActorService)
     { }

  ngOnInit(): void {
  }


  AddActor(){
    debugger;
    if(this.actorToBeAddedCN || this.actorToBeAddedD)
    {
      this.actorService.createActor(new ActorComplete(this.actorToBeAddedCN, this.actorToBeAddedD, 'Saverio Cinieri')).subscribe(() => {});;
      //this.actorService.AddActor(new ActorComplete(this.actorToBeAddedCN, this.actorToBeAddedD)).subscribe(() => {});
    }
    else
    {
      alert("Both the fields must bu filled up");
    }
    
  }

  previousView(){
    this.location.back();
  }

}
