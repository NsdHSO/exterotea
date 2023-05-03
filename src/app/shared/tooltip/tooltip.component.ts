import {
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnInit, TemplateRef
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tooltip',
  imports: [ CommonModule ],
  standalone: true,
  templateUrl: 'tooltip.component.html',
  styles: [ `
    .tooltip-container {


    }
  ` ]
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

