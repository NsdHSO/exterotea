import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  Injector,
  OnInit
} from '@angular/core';
import { TooltipComponent } from './tooltip.component';

@Directive({
  selector: '[appGetMiddleEntity]',
  standalone: true
})
export class GetMiddleEntityDirective implements OnInit {
  private componentRef: ComponentRef<any> | any;

  // Host element
  get hostElement(): HTMLElement{
    return this.elementRef.nativeElement;
  }

  constructor(
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private elementRef: ElementRef,
    private injector: Injector
  ){
  }

  ngOnInit(){
    // Add a click event listener to the host element
    this.hostElement.addEventListener('mouseenter', this.onClick.bind(this));
    this.hostElement.addEventListener(
      'mouseout',
      this._destroyTooltip.bind(this));
  }

  onClick(event: any){
    const rect = this.hostElement.getBoundingClientRect();
    const middleX = rect.left + rect.width / 2;
    const middleY = rect.top + rect.height / 2;
    console.log(`Middle point: (${ middleX }, ${ middleY })`);
    this.renderComponent(middleX, middleY);
  }

  renderComponent(middlex: number, middley: number){
    if ( !this.componentRef ) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
        TooltipComponent);
      this.componentRef = componentFactory.create(this.injector);
      this.appRef.attachView(this.componentRef.hostView);
      const domElem = (this.componentRef.hostView as any).rootNodes[ 0 ] as HTMLElement;
      document.body.appendChild(domElem);
      const hostRect = this.elementRef.nativeElement.getBoundingClientRect();

      domElem.style.position = 'fixed';
      domElem.style.top = `${ hostRect.bottom }px`;
      domElem.style.left = `${ middlex - domElem.getBoundingClientRect().width / 2 }px`;
      domElem.style.zIndex = '100';
    }
  }

  private _destroyTooltip(){
    if ( this.componentRef ) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }
}

