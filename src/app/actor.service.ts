import { Injectable } from '@angular/core';

import { actors } from './mock-actors'

// for the asynchronous requests to the server
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessagesService } from './messages.service';

import { Actor, ActorComplete } from './actor'; //interface used to represent the an actor

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

  // https://www.devglan.com/spring-boot/spring-boot-angular-example

*/
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  actorsList = actors;
  // actorsListUsed: Actor[] = actors;  // use this if there isn't the server, ADD property "watcher: string"
  private actorsUrl = 'api/actors';  // actors is the collection wa want to retrieve, collection inside in-memory-data.service.ts

  // used for the examples with push, etc.
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // url to reach the ControllerActorCRUD
  url = "http://localhost:8080/ActorCRUD";

  // for the real server, for test
  realUrl: string =  'http://localhost:8080/testUrl';

  constructor(
    private messageService: MessagesService,
    private http: HttpClient) {
  
  }

  // ----- CRUD METHODS ----- //  
  readAllActors (): Observable<Actor[]>{
    const urlSuffix = "readAllActors";
    const readUrl = `${this.url}/${urlSuffix}`;
    console.log(readUrl);
    return this.http.get<Actor[]>(readUrl)
      .pipe(
        catchError(this.handleError<Actor[]>(urlSuffix, []))
      );
  }

  createActor (tmpActor: ActorComplete): Observable<Actor>{
    const urlSuffix = "createActor";
    const readUrl = `${this.url}/${urlSuffix}`;
    console.log(readUrl);

    return this.http.post<Actor>(readUrl, tmpActor, this.httpOptions)
      .pipe(
        catchError(this.handleError<Actor>(urlSuffix))
      );
  }

  DeleteActor(actor: Actor): Observable<Actor>{
    // const url = `${this.actorsUrl}/${actor.id}`;
    const urlSuffix = "deleteActor";
    const deleteUrl = `${this.url}/${urlSuffix}/${actor.id}`;

    return this.http.delete<Actor>(deleteUrl, this.httpOptions).pipe(
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Actor>('deleteActor'))
    );
  }

  UpdateActor(actor: Actor):Observable<Actor>{
    const urlSuffix = "updateActor";
    const updateUrl = `${this.url}/${urlSuffix}`;
    console.log(updateUrl);

    return this.http.put<Actor>(updateUrl, actor, this.httpOptions).pipe(
       //tap(_ => this.log(`updated hero id=${hero.id}`)),
       catchError(this.handleError<any>('updateActor'))
     );
   }

  /* ----- GET actors from the server(DB IN MEMORY) ----- */
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

 // ----- Update using IN MEMORY DB ----- //
 /*
 UpdateActor(actor: Actor):Observable<Actor>{
   return this.http.put(this.actorsUrl, actor, this.httpOptions).pipe(
      //tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateActor'))
    );
  }
  */

  
  AddActor(actor: Actor):Observable<Actor>{
    debugger; console.log(actor);
    return this.http.post<Actor>(this.actorsUrl, actor, this.httpOptions).pipe(
          //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
          catchError(this.handleError<Actor>('addActor'))
    );
  }

  // ----- Implemented at the top ----- //
  /*
  DeleteActor(actor: Actor): Observable<Actor>{
    const url = `${this.actorsUrl}/${actor.id}`;
    return this.http.delete<Actor>(url, this.httpOptions).pipe(
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Actor>('addActor'))
    );
  }
  */

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

  postToServer():Observable<any>{
    console.log("Request inside the service");

    //...........
    //realOptions
    let body = new FormData();
    let actorTmp: Actor = null;
    body.append('actorTmp', 'test_');


    return this.http.post<any>(this.realUrl, new Actor('Joele', 'Smith4'), this.httpOptions).pipe(
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<any>('postToServer'))
    );
  }

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
