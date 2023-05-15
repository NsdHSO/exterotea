import {
  AfterViewInit,
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  Input,
  ViewContainerRef
} from '@angular/core';
import { LabelComponent } from './label/label.component';

@Directive({
  selector: '[appSetLabel]',
  standalone: true
})
export class SetLabelDirective implements AfterViewInit {
  @Input()
    recommendationLabel: string = '';
  @Input()
    excessCashLabel: string = '';
  constructor(
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngAfterViewInit() {
    this.extractRecomendationReferences();
  }

  extractRecomendationReferences() {
    const divs = this.elementRef.nativeElement.querySelectorAll('div');
    const recomendationDivs: any = Array.from(divs).filter(
      (div: any) => div.getAttribute('recomendation') === 'true'
    );
    const excessCash: any = Array.from(divs).filter(
      (div: any) => div.getAttribute('excessCash') === 'true'
    );
    [ { element: recomendationDivs, label: this.recommendationLabel, lastElement: false },
      { element: excessCash, label: this.excessCashLabel, lastElement: true } ].forEach((element) => {
      this.createComponent(element);
    });
  }

  createComponent(elements: any) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      LabelComponent);
    const componentRef = this.viewContainerRef.createComponent(componentFactory);
    componentRef.instance.labelText = elements.label;
    componentRef.instance.recomendationDivs = elements.element;
    componentRef.instance.isLast = elements.lastElement;
    const componentElement = componentRef.location.nativeElement;
    const hostElement = this.elementRef.nativeElement;

    // Adăugați componentElement la hostElement sau la alt element din ierarhia DOM a directivei
    hostElement.appendChild(componentElement);
  }
}
