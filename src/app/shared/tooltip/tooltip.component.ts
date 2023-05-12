import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tooltip',
  imports: [ CommonModule ],
  standalone: true,
  templateUrl: 'tooltip.component.html',
  styleUrls: ['tooltip.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipComponent implements OnInit, AfterContentInit {
  @Input() rendererTemplate: any;

  @ContentChild(TooltipComponent) content: TooltipComponent | any;

  @Input()
  public text = '';

  constructor() {}

  ngOnInit(): void {}

  ngAfterContentInit(): void {
    if (this.content) {
      console.log(this.content.nativeElement.innerText);
    }
  }
}

