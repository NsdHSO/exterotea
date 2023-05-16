import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActualStateDirective } from '../../../directive/actual-state.directive';

@Component({
  selector: 'app-actual-state-label',
  standalone: true,
  imports: [ CommonModule, ActualStateDirective ],
  templateUrl: './actual-state-label.component.html',
  styleUrls: [ './actual-state-label.component.scss' ]
})
export class ActualStateLabelComponent {
  @Input()
    label: string = '';
}
