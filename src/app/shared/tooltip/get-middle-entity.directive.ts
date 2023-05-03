import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  ContentChild,
  Directive,
  ElementRef,
  HostListener,
  Injector,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { TooltipComponent } from './tooltip.component';

@Directive({
  selector: '[appGetMiddleEntity]',
  standalone: true
})
export class GetMiddleEntityDirective {
  @ViewChild('rendererTemplate') rendererTemplate!: TemplateRef<any>;
  @ContentChild(TooltipComponent) tooltipComponent!: TooltipComponent;

  private componentRef: ComponentRef<TooltipComponent> | any;
  private tooltipRef: HTMLElement | any;
  private clickEventListener: (() => void) | null = null;

  constructor(
    private appRef: ApplicationRef,
    private elementRef: ElementRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private renderer: Renderer2,
    private viewContainerRef: ViewContainerRef
  ) {
  }

  @HostListener('click', [ '$event' ])
  onClick(event: MouseEvent) {
    if ( !this.componentRef ) {
      const hostRect = this.elementRef.nativeElement.getBoundingClientRect();
      const middlex = hostRect.left + hostRect.width / 2;
      this.renderComponent(middlex, this.tooltipComponent.text);
      this.clickEventListener = this.renderer.listen(
        window,
        'click',
        (clickEvent: MouseEvent) => {
          if ( !this.elementRef.nativeElement.contains(clickEvent.target) && !this.tooltipRef?.contains(
            clickEvent.target) ) {
            this.destroyComponent();
          }
        });
    } else if ( !this.tooltipRef?.contains(event.target as HTMLElement) ) {
      this.destroyComponent();
    }
  }

  private renderComponent(middlex: number, text: string) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      TooltipComponent);
    this.componentRef = componentFactory.create(this.injector);
    this.componentRef.instance.text = text;
    this.componentRef.instance.rendererTemplate = this.rendererTemplate
    this.appRef.attachView(this.componentRef.hostView);
    const domElem = (this.componentRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
    const hostRect = this.elementRef.nativeElement.getBoundingClientRect();
    domElem.style.position = 'fixed';
    domElem.style.top = `${ hostRect.bottom }px`;
    domElem.style.left = `${ middlex - domElem.getBoundingClientRect().width / 2 }px`;
    domElem.style.zIndex = '100';
    this.tooltipRef = domElem;
  }

  private destroyComponent() {
    if ( this.componentRef ) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.componentRef = null;
      if ( this.clickEventListener ) {
        this.clickEventListener();
        this.clickEventListener = null;
      }
    }
  }
}
