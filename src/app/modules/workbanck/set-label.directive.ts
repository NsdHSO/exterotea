import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appSetLabel]',
  standalone: true
})
export class SetLabelDirective {
  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    this.extractRecomendationReferences();
  }

  extractRecomendationReferences() {
    const divs = this.elementRef.nativeElement.querySelectorAll('div');
    const recomendationDivs: any = Array.from(divs).filter(
      (div: any) => div.getAttribute('recomendation') === 'true'
    );
    console.table(recomendationDivs);
    const firstElement = recomendationDivs[0];
    const firstElementRect = firstElement.getBoundingClientRect();
    const lastElement = recomendationDivs[recomendationDivs.length - 1];
    const lastElementRect = lastElement.getBoundingClientRect();
    Array(firstElementRect, lastElementRect).forEach((i) => {
      const line = document.createElement('div');
      line.style.position = 'absolute';
      line.style.width = '1px';
      line.style.height = '60px';
      line.style.borderLeft = '2px dashed #A3B5C9';
      line.style.zIndex = '20';

      line.style.left = `${i.left}px`;
      line.style.top = `${firstElementRect.top - 60 + 16}px`;

      document.body.appendChild(line);
    });
    const label = document.createElement('div');
    label.innerText = 'Label text';
    label.style.position = 'absolute';
    label.style.top = `${firstElementRect.top - 60 }px`;
    // add + 1 to be in the center
    label.style.left = `${firstElementRect.left+ 1 }px `;
    label.style.width = `${lastElementRect.left - firstElementRect.left}px`;
    label.style.fontSize = '12px';
    label.style.fontWeight = 'bold';
    label.style.zIndex = '20';
    label.style.color ='#5C7999';
    label.style.background = '#F4F6FA';
    label.style.padding = '11px 26px';
    label.style.display = 'flex';
    label.style.justifyContent= 'center';
    label.style.alignItems='center';
    document.body.appendChild(label);
  }
}
