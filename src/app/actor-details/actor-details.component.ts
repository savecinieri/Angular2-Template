import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';
import { ActorService } from '../actor.service';

import { Location } from '@angular/common';  // used for backtrack routing


@Component({
  selector: 'app-actor-details',
  templateUrl: './actor-details.component.html',
  styleUrls: ['./actor-details.component.css']
})
export class ActorDetailsComponent implements OnInit {

  selectedId: number;
  selectedActorDetail: string;

  constructor(
    private route: ActivatedRoute,
    private actorService: ActorService,
    private location: Location) { }

  ngOnInit(): void {
    //as soon as the component is created I extract the id from the route
    this.setSelectedId();
  }

  setSelectedId(){
    this.selectedId = +this.route.snapshot.paramMap.get('id');
    console.log('Actor with Id: ' + this.selectedId);

    this.actorService.getActorDetail(this.selectedId).subscribe(detailActor => this.selectedActorDetail = detailActor);
  }

  previousView(){
    this.location.back();
  }

}
