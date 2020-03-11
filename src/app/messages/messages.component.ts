import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messagesList;
  counterMessages;

  constructor(public messageService: MessagesService) { }

  ngOnInit(): void {
    this.counterMessages = 0;
    this.messageService.getMessages()
      .subscribe(messages => this.messagesList = messages);

  }

  addMessage(message){
    this.messagesList.push(message);
    this.counterMessages += 1;
  }

  clearMessagesList(){
    debugger;
    this.messageService.clear();
    // this.messagesList = [];
  }
}
