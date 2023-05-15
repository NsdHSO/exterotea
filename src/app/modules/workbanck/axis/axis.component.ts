import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReserveType } from '../utils/reserve-type';
import { SetLabelDirective } from '../set-label.directive';

@Component({
  selector: 'app-axis',
  standalone: true,
  imports: [ CommonModule, SetLabelDirective ],
  templateUrl: './axis.component.html',
  styleUrls: [ './axis.component.scss' ]
})
export class AxisComponent implements OnInit {
  @Input()
  months: ReserveType = {} as any;
  protected readonly Array = Array;
  protected readonly Math = Math;

  constructor (){
  }

  ngOnInit (): void{
  }
}
