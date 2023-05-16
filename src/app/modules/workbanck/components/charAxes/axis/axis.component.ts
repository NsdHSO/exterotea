import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActualStateLabelComponent
} from '../actual-state-label/actual-state-label.component';
import { SetLabelDirective } from '../../../directive/set-label.directive';
import { ReserveType } from '../../../utils/reserve-type';

@Component({
  selector: 'app-axis',
  standalone: true,
  imports: [ CommonModule, SetLabelDirective,
    ActualStateLabelComponent ],
  templateUrl: './axis.component.html',
  styleUrls: [ './axis.component.scss' ]
})
export class AxisComponent {
  @Input()
  months: ReserveType = {} as any;
  lastIndexWidth = 20;
  standardWidth = 3.4;
  errorOfKnife = 0.28;
  protected readonly Array = Array;
  protected readonly Math = Math;
}
