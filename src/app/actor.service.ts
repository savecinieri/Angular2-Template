import { Injectable } from '@angular/core';

import { actors } from './mock-actors'
import { Observable, of } from 'rxjs';

import { MessagesService } from './messages.service';

import { Actor } from './actor'; //interface used to represent the an actor

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  actorsList = actors;
  actorsListUsed: Actor[] = actors;  // use this

  constructor(private messageService: MessagesService) { }


  getAllActors():Observable<Actor[]>{
    this.messageService.addMessage("Main actor list retrieved");
    return of(this.actorsListUsed);
  }

  getActorDetail(actorId: number): Observable<string>{
    for(let tmpActor of this.actorsListUsed)
    {
      if( tmpActor.id == actorId){
        return of(tmpActor.detail);
      }
    }
    return of('<Actor detail not found>');
  }

  //////*************

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
