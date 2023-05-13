import { Component, OnInit } from '@angular/core';
import { ReserveType } from '../utils/reserve-type';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: [ './bar.component.scss' ]
})
export class BarComponent implements OnInit {
  reserveType: ReserveType = {
    months: 7,
    reserve: 0.3,
    axis:
      {
        recommendationReserve: {
          start: 3,
          end: 5,
          label: 'ivan',
          backgroundColor: '#F4F6FA',
          color: '#5C7999'
        },
        excessCashReserve: {
          start: 3,
          end: 5,
          label: 'ivan',
          backgroundColor: '#F4F6FA',
          color: '#5C7999'
        }
      }
  };
  constructor() {
  }

  ngOnInit():void {}
}


