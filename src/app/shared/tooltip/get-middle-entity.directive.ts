import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  Injector,
  Input,
  Renderer2,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { TooltipComponent } from './tooltip.component';
import { debounceTime, fromEvent, Subject, Subscription } from 'rxjs';

@Directive({
  selector: '[appGetMiddleEntity]',
  standalone: true
})
export class GetMiddleEntityDirective {
  @Input() element: any;
  @ViewChild('rendererTemplate') rendererTemplate!: TemplateRef<any>;
  public middlex: number = 0;
  private toggleCompo = false;
  private componentRef: ComponentRef<TooltipComponent> | any;
  private tooltipRef: HTMLElement | any;
  private clickEventListener: (() => void) | null = null;
  private _destroyer$ = new Subject();
  private resizeSubscription: Subscription | any;

  get hostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  constructor(
    private appRef: ApplicationRef,
    private elementRef: ElementRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private renderer: Renderer2
  ) {
  }

  ngAfterViewInit(): void {
    this.middlex = this.elementRef.nativeElement.offsetWidth / 2 + this.elementRef.nativeElement.offsetLeft;
    this.hostElement.addEventListener('click', this.onClick.bind(this));
  }

  onClick(event: MouseEvent) {
    const isButtonClicked = this.elementRef.nativeElement.contains(event.target as HTMLElement);
    const isTooltipClicked = this.tooltipRef?.contains(event.target as HTMLElement);

    if ( isButtonClicked && !this.componentRef ) {
      const hostRect = this.elementRef.nativeElement.getBoundingClientRect();
      const middlex = hostRect.left + hostRect.width / 2;
      this.renderComponent(middlex, 'Tooltip Text');

      this.clickEventListener = this.renderer.listen(
        window,
        'click',
        (clickEvent: MouseEvent) => {
          if ( !this.elementRef.nativeElement.contains(clickEvent.target) && !this.tooltipRef?.contains(
            clickEvent.target as HTMLElement) ) {
            this.destroyComponent();
          }
        }
      );

      // subscribe to window resize events and update tooltip position
      this.resizeSubscription = fromEvent(window, 'resize').pipe(
        debounceTime(150)
      )
        .subscribe(() => {
          this.updatePosition();
        });

      this.toggleCompo = true;
    } else if ( isButtonClicked && this.componentRef ) {
      this.destroyComponent();
      this.toggleCompo = false;
    } else if ( !isButtonClicked && this.componentRef && !isTooltipClicked ) {
      this.destroyComponent();
      this.toggleCompo = false;
    }
  }

  ngDestroy() {
    this._destroyer$.next(true);
    this._destroyer$.complete();
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
      debounceTime(150)
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
    if ( this.tooltipRef ) {
      const hostRect = this.elementRef.nativeElement.getBoundingClientRect();
      const middlex = Math.floor(hostRect.left - 6.4 + hostRect.width / 2);
      const tooltipRect = this.tooltipRef.getBoundingClientRect();
      const hostWidth = Math.floor(hostRect.width);

      if ( window.innerHeight < Math.floor(tooltipRect.bottom + (tooltipRect.width / 2)) ) {
        this.tooltipRef.classList.add('top');
        this.tooltipRef.classList.remove('bottom');

        // no space below, reposition to the top
        this.tooltipRef.style.top = `${ Math.floor(hostRect.top - tooltipRect.height) }px`;
      } else {
        this.tooltipRef.classList.add('bottom');
        this.tooltipRef.classList.remove('top');

        // position below the host element
        this.tooltipRef.style.top = `${ Math.floor(hostRect.bottom) }px`;
      }

      if ( window.innerWidth < Math.floor(tooltipRect.right - 50) ) {
        console.log('First IF');
        // no space on the right, reposition to the left
        this.tooltipRef.style.left = `${ Math.floor(hostRect.left - tooltipRect.width) }px`;
      } else if ( middlex > Math.floor(tooltipRect.width / 2) && window.innerWidth - middlex > Math.floor(
        tooltipRect.width / 2) ) {
        console.log('First eles IF');
        // position centered over the host element
        this.tooltipRef.classList.remove('bottom');
        this.tooltipRef.classList.add('left');

        this.tooltipRef.style.left = `${ Math.floor(hostRect.right + ((tooltipRect.width -20 )/ 2 ) ) }px`;
        this.tooltipRef.style.top = `${ Math.floor(hostRect.top - hostRect.height) }px`;
      } else if ( window.innerWidth - hostRect.right < Math.floor(tooltipRect.width) ) {
        console.log('First 1 eles IF');
        // position on the left of the host element
        this.tooltipRef.style.left = `${ Math.floor(hostRect.left - tooltipRect.width-20 ) }px`;
        this.tooltipRef.style.top = `${ Math.floor(hostRect.top - hostRect.height) }px`;
      } else {
        console.log('First eles ');
        // position on the right of the host element
        this.tooltipRef.style.left = `${ Math.floor(hostRect.right) }px`;
      }

      this.tooltipRef.style.margin = '.4rem';
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
}
