import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

    private data = [
        { id: 1, name: 'Data 1', category: 'Category 1' },
        { id: 2, name: 'Data 2', category: 'Category 2' },
        { id: 3, name: 'Data 3', category: 'Category 1' },
        { id: 4, name: 'Data 4', category: 'Category 2' },
      ];

}