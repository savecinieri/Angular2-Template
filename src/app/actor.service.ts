import { Injectable } from '@angular/core';

import { actors } from './mock-actors'
import { Observable, of } from 'rxjs';

import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  actorsList = actors;

  constructor(private messageService: MessagesService) { }

  addActor(actor){
    this.messageService.addMessage("Actor added: " + actor.name);
    this.actorsList.push(actor);
  }

  getActors(): Observable<Object[]>{
    debugger;
    console.log('Actor service');
    this.messageService.addMessage("Actors list retrieved");
    this.messageService.counterMessages = this.messageService.counterMessages + 1;
    return  of(this.actorsList);
  }

}
