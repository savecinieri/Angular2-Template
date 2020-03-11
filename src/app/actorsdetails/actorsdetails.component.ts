import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-actorsdetails',
  templateUrl: './actorsdetails.component.html',
  styleUrls: ['./actorsdetails.component.css']
})
export class ActorsdetailsComponent implements OnInit {

  @Input() selectedActor;

  constructor() { }

  ngOnInit(): void {
  }

}
