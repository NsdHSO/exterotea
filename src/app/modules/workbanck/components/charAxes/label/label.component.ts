import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-label',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './label.component.html',
  styleUrls: [ './label.component.scss' ]
})
export class LabelComponent implements OnInit {
  @Input() recomendationDivs: any;
  @Input() labelText: any;
  @Input() isLast: boolean = false;
  @Input() labelColor: string ='#5C7999';
  @Input()
    labelBackgroundColor : string = '#F4F6FA';
  rects: { left: number; top: number }[] = [];
  labelTop: number = 0;
  labelLeft: number = 0;
  labelWidth: number = 0;
  mouseIn: boolean = false;

  ngOnInit() {
    if (this.recomendationDivs && this.recomendationDivs.length > 0) {
      const firstElement = this.recomendationDivs[0];
      const firstElementRect = firstElement.getBoundingClientRect();
      const lastElement = this.recomendationDivs[this.recomendationDivs.length - 1];
      const lastElementRect = lastElement.getBoundingClientRect();

      this.rects = [
        { left: firstElementRect.left, top: firstElementRect.top - 60 + 16 }
      ];
      if (this.isLast) {
        this.rects.push( { left: lastElementRect.right, top: lastElementRect.top - 60 + 16 }
        );
        this.labelWidth = lastElementRect.right - firstElementRect.left;
      } else {
        this.rects.push( { left: lastElementRect.left, top: lastElementRect.top - 60 + 16 }
        );
        this.labelWidth = lastElementRect.left - firstElementRect.left;
      }

      this.labelTop = firstElementRect.top - 60;
      this.labelLeft = firstElementRect.left + 1;
    }
  }

  public mouseOver(): void {
    this.mouseIn = !this.mouseIn;
  }
}
