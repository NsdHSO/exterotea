import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Injector,
  Input,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { TooltipComponent } from './tooltip.component';
import { fromEvent, Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[appGetMiddleEntity]',
  standalone: true
})
export class GetMiddleEntityDirective {
  @Input() element: any;
  @ViewChild('rendererTemplate') rendererTemplate!: TemplateRef<any>;
  public middlex: number =0;

  private componentRef: ComponentRef<TooltipComponent> | any;
  private tooltipRef: HTMLElement | any;
  private clickEventListener: (() => void) | null = null;
  private _destroyes$ = new Subject();
  constructor(
    private appRef: ApplicationRef,
    private elementRef: ElementRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private renderer: Renderer2,
    private viewContainerRef: ViewContainerRef
  ) {
  }
  get hostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  ngAfterViewInit(): void {
    this.middlex = this.elementRef.nativeElement.offsetWidth / 2 + this.elementRef.nativeElement.offsetLeft;
  }

  @HostListener('click', [ '$event' ])
  onClick(event: MouseEvent) {
    if (!this.componentRef) {
      const hostRect = this.elementRef.nativeElement.getBoundingClientRect();
      this.renderComponent(hostRect);
      this.clickEventListener = this.renderer.listen(
        window,
        'click',
        (clickEvent: MouseEvent) => {
          if (
            !this.elementRef.nativeElement.contains(clickEvent.target) &&
            !this.tooltipRef?.contains(clickEvent.target)
          ) {
            this.destroyComponent();
          }
        }
      );
    } else if (!this.tooltipRef?.contains(event.target as HTMLElement)) {
      this.destroyComponent();
    }
  }

  private renderComponent(hostRect: DOMRect) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(TooltipComponent);
    this.componentRef = componentFactory.create(this.injector);
    this.componentRef.instance.text = 'Hello World';
    this.componentRef.instance.rendererTemplate = this.rendererTemplate;
    this.appRef.attachView(this.componentRef.hostView);
    const domElem = (this.componentRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
    domElem.style.position = 'fixed';
    domElem.style.zIndex = '100';
    this.updateTooltipPosition(hostRect, domElem);
    this.tooltipRef = domElem;

    // Subscribe to window resize events
    fromEvent(window, 'resize').pipe(takeUntil(this._destroyes$))
      .subscribe(() => {
        this.updateTooltipPosition(hostRect, domElem);
      });
  }

  private updateTooltipPosition(hostRect: DOMRect, tooltipElem: HTMLElement) {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const tooltipWidth = tooltipElem.offsetWidth;
    const tooltipHeight = tooltipElem.offsetHeight;
    const tooltipMargin = 10; // Margin between tooltip and host element

    // Calculate available space around the host element
    const spaceAbove = hostRect.top - tooltipHeight - tooltipMargin;
    const spaceBelow = windowHeight - hostRect.bottom - tooltipMargin;
    const spaceLeft = hostRect.left - tooltipWidth / 2;
    const spaceRight = windowWidth - hostRect.right - tooltipWidth / 2;

    // Set tooltip position based on available space
    if ( spaceBelow >= tooltipHeight + tooltipMargin ) {
      console.log('');
    }
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

  ngDestroy() {
    this._destroyes$.next(true);
    this._destroyes$.complete();
  }
}
