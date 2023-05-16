import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appActualState]',
  standalone: true
})
export class ActualStateDirective implements AfterViewInit {
  constructor(private elementRef: ElementRef) {
  }

  public ngAfterViewInit(): void {
    this.rearrangeElement();
  }

  private rearrangeElement(): void {
    const divs = this.elementRef.nativeElement.querySelectorAll('div');
    const middleOfElements = divs[1].getBoundingClientRect();

    const labelElement: HTMLDivElement | any = Array.from(divs).find((element: any) => element.className === 'container-actual-state__information');
    const labelRect = labelElement.getBoundingClientRect();
    // Don't enough space to show in middle

    labelElement.style.left = (middleOfElements.width / 2) - (labelRect.width / 2) + 'px';
    if ( labelRect.left < 220) {
      labelElement.style.left = ((middleOfElements.width / 2) - 18) + 'px';
    }
    if ( middleOfElements.right + labelRect.width + 40>window.innerWidth ) {
      labelElement.style.left = ((middleOfElements.width / 2) + 4 - labelRect.width) + 'px';
    }
    labelElement.style.top = '-7px';
  }
}
