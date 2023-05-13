import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReserveType } from '../utils/reserve-type';

@Component({
  selector: 'app-axis',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './axis.component.html',
  styleUrls: [ './axis.component.scss' ]
})
export class AxisComponent implements OnInit {
  @Input()
    months: ReserveType ={} as any;

  constructor() {
  }

  ngOnInit(): void {
  }

  protected readonly Array = Array;
  protected readonly Math = Math;
}
