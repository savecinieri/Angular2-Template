import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  messagesList = [];
  counterMessages = 0;

  constructor() { }

  addMessage(message){
    this.messagesList.push(message);
  }

  getMessages(): Observable<Object[]>{
    return of(this.messagesList);
  }

  clear(){
    debugger;
    this.messagesList = [];
    this.counterMessages = 0;
  }
}
