import { Injectable } from '@angular/core';

// for the asynchronous requests to the server
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // used for the examples with push, etc.
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // url to reach the ControllerActorCRUD
  url = "http://localhost:8080/ActorCRUD";


  constructor(private http: HttpClient) { }

  // login
  checkLogin(username, password):Observable<boolean>{
    debugger;
    const beforeParams = "login";
    const loginUrl = `${this.url}/${beforeParams}/${username}/${password}`;

    return this.http.get<boolean>(loginUrl)
      .pipe(
        catchError(this.handleError<boolean>(loginUrl, false))
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
}

