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
import {
  debounceTime,
  fromEvent,
  Observable,
  Subject,
  switchMap,
  takeUntil
} from 'rxjs';

@Directive({
  selector: '[appGetMiddleEntity]',
  standalone: true
})
export class GetMiddleEntityDirective {
  @Input() element: any;
  @ViewChild('rendererTemplate') rendererTemplate!: TemplateRef<any>;
  public middlex: number = 0;
  bottomOffset = 0; // define bottomOffset property
  topOffset = 0; // define topOffset property
  rightOffset = 0;
  leftOffset = 0;
  private componentRef: ComponentRef<TooltipComponent> | any;
  private tooltipRef: HTMLElement | any;
  private clickEventListener: (() => void) | null = null;
  private _destroyes$ = new Subject();

  get hostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  constructor(
    private appRef: ApplicationRef,
    private elementRef: ElementRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private renderer: Renderer2,
    private viewContainerRef: ViewContainerRef
  ) {
  }

  ngAfterViewInit(): void {
    this.middlex = this.elementRef.nativeElement.offsetWidth / 2 + this.elementRef.nativeElement.offsetLeft;
  }
  ngOnInit(): void {
    const resize = fromEvent(window, 'resize').pipe(debounceTime(100));
    resize.pipe(
      switchMap(() => this.updatePosition()),
      takeUntil(this._destroyes$)
    ).subscribe();
  }
  @HostListener('click', [ '$event' ])
  onClick(event: MouseEvent) {
    if ( !this.componentRef ) {
      const hostRect = this.elementRef.nativeElement.getBoundingClientRect();
      const middlex = hostRect.left + hostRect.width / 2;
      this.renderComponent(middlex, 'Tooltip Text');
      this.clickEventListener = this.renderer.listen(
        window,
        'click',
        (clickEvent: MouseEvent) => {
          const domElem = (this.componentRef.hostView as any).rootNodes[0] as HTMLElement;
          domElem.style.left = `${ middlex - domElem.getBoundingClientRect().width / 2 }px`;
          this.updatePosition();

          if ( !this.elementRef.nativeElement.contains(clickEvent.target) && !this.tooltipRef?.contains(
            clickEvent.target as HTMLElement) ) {
            this.destroyComponent();
          }
        });

      // subscribe to window resize events and update tooltip position
      fromEvent(window, 'resize')
        .pipe(debounceTime(50), takeUntil(this._destroyes$))
        .subscribe(() => {
          this.updatePosition();
        });
    } else if ( !this.tooltipRef?.contains(event.target as HTMLElement) ) {
      this.destroyComponent();
    }
  }

  ngDestroy() {
    this._destroyes$.next(true);
    this._destroyes$.complete();
  }

  private renderComponent(middlex: number, text: string) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      TooltipComponent);
    this.componentRef = componentFactory.create(this.injector);
    this.componentRef.instance.text = text;
    this.componentRef.instance.rendererTemplate = this.element;
    this.appRef.attachView(this.componentRef.hostView);
    const domElem = (this.componentRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
    domElem.style.position = 'fixed';
    domElem.style.zIndex = '100';
    this.tooltipRef = domElem;
    this.updatePosition();


    // Subscribe to window resize events
    const resizeSubscription = fromEvent(window, 'resize').pipe(
      debounceTime(190)
    )
      .subscribe(() => {
        this.updatePosition();
      });

    // Unsubscribe from the subscription when the tooltip is destroyed
    this.componentRef.onDestroy(() => {
      resizeSubscription.unsubscribe();
    });
  }

  private updatePosition() {
    return new Observable((observer) => {

      if ( this.tooltipRef ) {
        const hostRect = this.elementRef.nativeElement.getBoundingClientRect();
        const middlex = hostRect.left + hostRect.width / 2;
        const tooltipRect = this.tooltipRef.getBoundingClientRect();

        if ( window.innerHeight < tooltipRect.bottom ) {
          // no space below, reposition to the top
          this.tooltipRef.style.top = `${ hostRect.top - tooltipRect.height }px`;
        } else {
          // position below the host element
          this.tooltipRef.style.top = `${ hostRect.bottom }px`;
        }

        if ( window.innerWidth < tooltipRect.right ) {
          // no space on the right, reposition to the left
          this.tooltipRef.style.left = `${ hostRect.right - tooltipRect.width }px`;
        } else if ( middlex > tooltipRect.width / 2 && window.innerWidth - middlex > tooltipRect.width / 2 ) {
          // position centered over the host element
          this.tooltipRef.style.left = `${ middlex - tooltipRect.width / 2 }px`;
        } else {
          // position on the right of the host element
          this.tooltipRef.style.left = `${ hostRect.left }px`;
        }
      }
      observer.next();
      observer.complete();
    });
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
