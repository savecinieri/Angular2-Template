import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Actor } from './actor';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const actors = [
      { id: 11, completeName: 'Dr Nice', detail: 'detail not available'},
      { id: 12, completeName: 'Narco', detail: '<detail not available>' },
      { id: 13, completeName: 'Bombasto', detail: '<detail not available>' },
      { id: 14, completeName: 'Celeritas', detail: '<detail not available>' },
      { id: 15, completeName: 'Magneta', detail: '<detail not available>' },
      { id: 16, completeName: 'RubberMan', detail: '<detail not available>' },
      { id: 17, completeName: 'Dynama', detail: '<detail not available>' },
      { id: 18, completeName: 'Dr IQ', detail: '<detail not available>' },
      { id: 19, completeName: 'Magma', detail: '<detail not available>' },
      { id: 20, completeName: 'Tornado', detail: '<detail not available>'}
    ];
    return {actors};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(actors: Actor[]): number {
    return actors.length > 0 ? Math.max(...actors.map(actor => actor.id)) + 1 : 11;
  }
}