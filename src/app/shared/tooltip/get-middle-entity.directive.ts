import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Injector,
  Input,
  ViewContainerRef
} from '@angular/core';
import { TooltipComponent } from './tooltip.component';

@Directive({
  selector: '[appGetMiddleEntity]',
  standalone: true
})
export class GetMiddleEntityDirective {
  @Input() element: any;

  private componentRef: ComponentRef<any> | any;


  constructor(
    private el: ElementRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef,
    private viewContainerRef: ViewContainerRef
  ){
  }

  @HostListener('click', [ '$event' ])
  toggleComponent(){
    if ( this.componentRef ) {
      this.componentRef.destroy();
      this.componentRef = null;
    } else {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
        TooltipComponent);
      this.componentRef = this.viewContainerRef.createComponent(componentFactory);
      this.componentRef.instance.rendererTemplate = this.element;

      // find the app-root element
      const appRoot = document.getElementsByTagName('app-root')[ 0 ] as any;

      // add the tooltip component as a sibling of the app-root
      appRoot.parentElement.insertBefore(
        this.componentRef.location.nativeElement,
        appRoot.nextSibling);

      // set the tooltip component's position to absolute
      this.componentRef.location.nativeElement.style.position = 'absolute';

      // set the top and left positions of the tooltip component
      this.positionTooltipAndComponent(this.componentRef);
      this.componentRef.location.nativeElement.style.zIndex = '100';
      this.componentRef.changeDetectorRef.detectChanges();
    }
  }

  @HostListener('document:click', [ '$event' ])
  closeComponent(event: MouseEvent){
    // check if the target element is inside the tooltip or the toggle button
    const isInsideTooltip = this.componentRef && this.componentRef.location.nativeElement.contains(
      event.target);
    const isToggleButton = this.el.nativeElement === event.target || this.el.nativeElement.contains(
      event.target);

    if ( this.componentRef && !isInsideTooltip && !isToggleButton ) {
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }

  private positionTooltipAndComponent(tooltip: any){
    const button = this.el.nativeElement;
    let tooltipRect = this.componentRef.location.nativeElement.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();

    if ( this.componentRef ) {
      this.componentRef.changeDetectorRef.detectChanges();
    }
    const margin = 10;
    let position = {
      top: buttonRect.top + buttonRect.height / 2 - tooltipRect.height / 2,
      left: buttonRect.left + buttonRect.width / 2 - tooltipRect.width / 2
    };

    this.componentRef.location.nativeElement.style.position = 'fixed';
    this.componentRef.location.nativeElement.style.zIndex = '100';
    if ( this.componentRef ) {
      this.componentRef.changeDetectorRef.detectChanges();
    }
    tooltipRect = this.componentRef.location.nativeElement.getBoundingClientRect();
    if ( (buttonRect.right + tooltipRect.width) > window.innerWidth ) {
      if ( buttonRect.bottom + tooltipRect.height < window.innerHeight ) {
        console.log('not enough space below' + 2);
        // not enough space below, position tooltip above the button
        const margin = 10;
        const availableSpaceRight = window.innerWidth - buttonRect.right;
        const availableSpaceBottom = window.innerHeight - buttonRect.bottom - buttonRect.height;

        if (tooltipRect.width <= availableSpaceRight) {
          position = {
            top: buttonRect.top + buttonRect.height + margin,
            left: buttonRect.right - tooltipRect.width / 2 - buttonRect.width / 2
          };
        } else if (tooltipRect.height <= availableSpaceBottom) {
          // position = {
          //   top: buttonRect.bottom - buttonRect.height / 2 - tooltipRect.height / 2,
          //   left: buttonRect.x - tooltipRect.width - margin
          // };

          position = {
            top: buttonRect.bottom + margin,
            left: buttonRect.right - tooltipRect.width / 2 - buttonRect.width / 2
          };
        } else {
          position = {
            top: buttonRect.top - tooltipRect.height - margin,
            left: buttonRect.x + buttonRect.width + margin
          };
        }
      }
    } else {
      console.log('not enough space below' + 3);
      const spaceToRight = window.innerWidth - buttonRect.right;

      if ( tooltip.width > spaceToRight ) {
        // left
        position = {
          top: buttonRect.bottom - buttonRect.height / 2 - tooltipRect.height / 2,
          left: buttonRect.x - tooltipRect.width - margin
        };
      } else {
        position = {
          top: buttonRect.top + (buttonRect.height - tooltipRect.height) / 2,
          left: buttonRect.right + margin
        };
      }
    }

    // enough space to render at bottom of host

    this.componentRef.location.nativeElement.style.top = `${ position.top }px`;
    this.componentRef.location.nativeElement.style.left = `${ position.left }px`;
  }

  ngOnDestroy(){
    if ( this.componentRef ) {
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }
}
