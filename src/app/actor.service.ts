import { Injectable } from '@angular/core';

import { actors } from './mock-actors'

// for the asynchronous requests to the server
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessagesService } from './messages.service';

import { Actor } from './actor'; //interface used to represent the an actor

/*
In app.module.ts:
  import { HttpClientModule }    from '@angular/common/http';
  ....
  imports: [
    HttpClientModule,.....]

  LOOK FOR AND REMOVE ---> PLEASE REMOVE WHEN NOT NECESSARY


  // get, also passing an id for the reasearch see getActorDetail
  // put to update a record  RETURN AN OBSERVABLE
  // post to add RETURN AN OBSERVABLE
  // delete RETURN AN OBSERVABLE --> url containing id
*/
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  actorsList = actors;
  actorsListUsed: Actor[] = actors;  // use this if there isn't the server
  private actorsUrl = 'api/actors';  // actors is the collection wa want to retrieve, collection inside in-memory-data.service.ts

  // used for the examples with push, etc.
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private messageService: MessagesService,
    private http: HttpClient) {
  
  }


  /** GET actors from the server */
  getAllActors (): Observable<Actor[]> {
    this.messageService.addMessage("Main actor list retrieved");
    return this.http.get<Actor[]>(this.actorsUrl)
      .pipe(
        catchError(this.handleError<Actor[]>('getActors', []))
      );
  }
  
  /*
  getAllActors():Observable<Actor[]>{
    this.messageService.addMessage("Main actor list retrieved");
    return of(this.actorsListUsed);
  }
  */


  getActorDetail(actorId: number): Observable<Actor>{
    const url = `${this.actorsUrl}/${actorId}`;
    return this.http.get<Actor>(url).pipe(
                        //tap(_ => this.log(`fetched hero id=${id}`)),
                        catchError(this.handleError<Actor>(`getActor id=${actorId}`))
                    );
  }
  /*
  getActorDetail(actorId: number): Observable<string>{
    for(let tmpActor of this.actorsListUsed)
    {
      if( tmpActor.id == actorId){
        return of(tmpActor.detail);
      }
    }
    return of('<Actor detail not found>');
  }
  */


 UpdateActor(actor: Actor):Observable<Actor>{
   return this.http.put(this.actorsUrl, actor, this.httpOptions).pipe(
      //tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateActor'))
    );
  }

  
  AddActor(actor: Actor):Observable<Actor>{
    debugger; console.log(actor);
    return this.http.post<Actor>(this.actorsUrl, actor, this.httpOptions).pipe(
          //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
          catchError(this.handleError<Actor>('addActor'))
    );
  }

  DeleteActor(actor: Actor): Observable<Actor>{
    const url = `${this.actorsUrl}/${actor.id}`;
    return this.http.delete<Actor>(url, this.httpOptions).pipe(
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Actor>('addActor'))
);
  }

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
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
