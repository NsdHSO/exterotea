import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReserveType } from '../utils/reserve-type';
import { SetLabelDirective } from '../set-label.directive';
import {
  ActualStateLabelComponent
} from '../actual-state-label/actual-state-label.component';

@Component({
  selector: 'app-axis',
  standalone: true,
  imports: [ CommonModule, SetLabelDirective,
    ActualStateLabelComponent ],
  templateUrl: './axis.component.html',
  styleUrls: [ './axis.component.scss' ]
})
export class AxisComponent implements OnInit {
  @Input()
  months: ReserveType = {} as any;
  lastIndexWidth = 20;
  standardWidth = 3.4;
  errorOfKnife = 0.28;
  protected readonly Array = Array;
  protected readonly Math = Math;

  constructor (){
  }

  ngOnInit (): void{
  }
}
