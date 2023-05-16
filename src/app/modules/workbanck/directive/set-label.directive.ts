import {
  AfterViewInit,
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  Input,
  ViewContainerRef
} from '@angular/core';
import { LabelComponent } from '../components/charAxes/label/label.component';

@Directive({
  selector: '[appSetLabel]',
  standalone: true
})
export class SetLabelDirective implements AfterViewInit {
  @Input()
    recommendationLabel: string = '';
  @Input()
    excessCashLabel: string = '';

  @Input()
    labelColor: string = '#5C7999';
  @Input()
    labelBackgroundColor: string = '#F4F6FA';

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
    [ {
      element: recomendationDivs,
      label: this.recommendationLabel,
      lastElement: false
    },
    {
      element: excessCash,
      label: this.excessCashLabel,
      lastElement: true,
      labelColor: '#FFFFFF',
      labelBackground: '#A3B5C9'
    } ].forEach((element) => {
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
    componentRef.instance.labelBackgroundColor = elements?.labelBackground;
    componentRef.instance.labelColor = elements?.labelColor;
    const componentElement = componentRef.location.nativeElement;
    const hostElement = this.elementRef.nativeElement;

    // Adăugați componentElement la hostElement sau la alt element din ierarhia DOM a directivei
    hostElement.appendChild(componentElement);
  }
}
