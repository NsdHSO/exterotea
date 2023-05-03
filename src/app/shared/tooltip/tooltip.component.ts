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
      position: relative;
      display: inline-block;
    }

    .tooltip-container .tooltip-content {
      position: absolute;
      z-index: 1;
      top: 100%;
      left: 50%;
      transform: translate(-50%, 10px);
      padding: 8px;
      background-color: #333;
      color: #fff;
      border-radius: 4px;
      font-size: 14px;
      white-space: nowrap;
    }

    .tooltip-container .tooltip-arrow {
      position: absolute;
      top: -10px;
      left: 50%;
      margin-left: -5px;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 5px 10px 5px;
      border-color: transparent transparent #333 transparent;
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

