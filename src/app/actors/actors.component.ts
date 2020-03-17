import { Component, OnInit } from '@angular/core';

import { ActorService } from '../actor.service';
import { actors } from '../mock-actors';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css']
})
export class ActorsComponent implements OnInit {

  actor;

  //using the service
  actorsList;
  //actorsList = actors;  //data assigned statically

  selectedActor;

  constructor(
    private actorService: ActorService,
    private messageService: MessagesService
  ) { }

  //as soon as the component is created // call to the service as soon as the constructor is completed
  ngOnInit(): void {
    this.actor = {
      id: 1,
      name: "Al Pacino"
    }

    //WITHOUT OBSERVABLE ====> this.actorsList = this.actorService.getActors();
    this.actorService.getActors()
      .subscribe(actors => this.actorsList = actors);
  }

  onSelectActor(actor){
    this.messageService.addMessage("Actor selected: " + actor.completeName);
    this.messageService.counterMessages += 1;
    debugger;
    this.selectedActor = actor;
  }

}
