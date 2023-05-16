import { Component, OnInit } from '@angular/core';
import { ReserveType } from '../../../utils/reserve-type';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: [ './bar.component.scss' ]
})
export class BarComponent implements OnInit {
  reserveType: ReserveType = {
    labelHowMuchYouCanSurvive: 'TEXT 2 TEXT 34 TEXT 2 TEXT 34 TEXT 2 TEXT 34 ',
    months: 7,
    reserve: 3.3,
    axis:
      {
        recommendationReserve: {
          start: 3,
          end: 4,
          label: 'ivan',
          backgroundColor: '#F4F6FA',
          color: '#5C7999'
        },
        excessCashReserve: {
          start: 5,
          end: 7,
          label: 'ivan',
          backgroundColor: '#F4F6FA',
          color: '#5C7999'
        }
      }
  };

  constructor() {
  }

  ngOnInit(): void {
    setInterval(() => {
      this.reserveType = {
        labelHowMuchYouCanSurvive: 'TEXT 2 TEXT 34 TEXT 2 TEXT 34 TEXT 2 TEXT 34 ',
        months: 7,
        reserve: Math.random() * (0 - 6) + 6,
        axis:
          {
            recommendationReserve: {
              start: Math.random() * (0 - 3) + 3,
              end: Math.random() * (0 - 5) + 5,
              label: 'ivan',
              backgroundColor: '#F4F6FA',
              color: '#5C7999'
            },
            excessCashReserve: {
              start: Math.random() * (0 - 4) + 4,
              end: Math.random() * (0 - 7) + 7,
              label: 'ivan',
              backgroundColor: '#F4F6FA',
              color: '#5C7999'
            }
          }
      };
    }, 500);
  }
}


