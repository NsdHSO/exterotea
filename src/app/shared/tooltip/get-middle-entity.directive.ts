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
  ) {
  }

  @HostListener('click', [ '$event' ])
  toggleComponent() {
    if ( this.componentRef ) {
      this.componentRef.destroy();
      this.componentRef = null;
    } else {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
        TooltipComponent);
      this.componentRef = this.viewContainerRef.createComponent(componentFactory);
      this.componentRef.instance.rendererTemplate = this.element;

      // find the app-root element
      const appRoot = document.getElementsByTagName('app-root')[0] as any;

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
  closeComponent(event: MouseEvent) {
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

  private positionTooltipAndComponent(tooltip: any) {
    const button = this.el.nativeElement;
    let tooltipRect = this.componentRef.location.nativeElement.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    const availableSpaceRight = window.innerWidth - buttonRect.right;
    const availableSpaceBottom = window.innerHeight - buttonRect.bottom - buttonRect.height;
    const availableSpaceTop = window.innerHeight - buttonRect.top - buttonRect.height;
    const availableSpaceLeft = window.innerWidth - buttonRect.left;

    if ( this.componentRef ) {
      this.componentRef.changeDetectorRef.detectChanges();
    }
    const margin = 10;
    const marginInnerTooltip = 8;
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

        if ( tooltipRect.width <= availableSpaceRight ) {
          position = {
            top: buttonRect.top + buttonRect.height + margin,
            left: buttonRect.right - tooltipRect.width / 2 - buttonRect.width / 2
          };
        } else if ( tooltipRect.height <= availableSpaceBottom ) {
          // position = {
          //   top: buttonRect.bottom - buttonRect.height / 2 - tooltipRect.height / 2,
          //   left: buttonRect.x - tooltipRect.width - margin
          // };
          if ( tooltipRect.width < availableSpaceTop ) {
            position.left = buttonRect.left + buttonRect.width / 2 - tooltipRect.width / 2 - margin;
          }
          if ( buttonRect.right < tooltipRect.width / 2 ) {
            position.left = buttonRect.left - margin;
          }
          if ( tooltipRect.width + (3 * margin) < window.innerWidth - buttonRect.width - (2 * margin) ) {
            position = {
              top: buttonRect.y - (tooltipRect.height / 2) + (buttonRect.height / 2),
              left: buttonRect.left - (tooltipRect.width) - margin
            };
          } else if ( tooltipRect.width + (3 * margin) < window.innerWidth - buttonRect.height ) {
            position = {
              top: buttonRect.bottom + margin,
              left: buttonRect.right - (tooltipRect.width) + marginInnerTooltip
            };
          }
        } else if ( availableSpaceLeft > (tooltipRect.width + margin) ) {
          position.left = buttonRect.left - tooltipRect.width - margin;
          position.top = buttonRect.y - (tooltipRect.height / 2) + (buttonRect.height / 2);
        } else {
          position = {
            top: buttonRect.top - tooltipRect.height - margin,
            left: buttonRect.x + buttonRect.width + margin
          };
        }

        if ( tooltipRect.width < window.innerWidth - buttonRect.left + (buttonRect.width / 2) ) {
          position = {
            top: buttonRect.bottom + margin,
            left: buttonRect.left + buttonRect.width / 2 - tooltipRect.width / 2 - margin

          };
        }
        if ( tooltipRect.width > window.innerWidth ) {
          position.top = buttonRect.top - tooltipRect.height - margin;
          position.left = buttonRect.right - (tooltipRect.width) + marginInnerTooltip;
        }
      } else if ( buttonRect.bottom + tooltipRect.height > window.innerHeight ) {
        // when in bottom you don't have enough space
        position = {
          top: buttonRect.y - (tooltipRect.height / 2) + (buttonRect.height / 2) - margin,
          left: buttonRect.right - (tooltipRect.width) + marginInnerTooltip
        };
      }

      // // not enough space right side
      // if ( availableSpaceBottom < tooltipRect.height / 2 ) {
      //   position = {
      //     top: buttonRect.bottom - buttonRect.height / 2 - tooltipRect.height / 2,
      //     left: buttonRect.x - tooltipRect.width - margin
      //   };
      // }
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
      if ( buttonRect.top - tooltipRect.height < 0) {
        position.top = buttonRect.bottom + margin;
      }
    }
    if ( buttonRect.bottom <= window.innerHeight ) {
      position = {
        top: buttonRect.top - tooltipRect.height - margin,
        left: buttonRect.right - (tooltipRect.width) + marginInnerTooltip
      };

      if ( buttonRect.right - (buttonRect.width / 2) - tooltipRect.width / 2 ) {
        position.left = buttonRect.right - (buttonRect.width / 2) - tooltipRect.width / 2;
      }

      if ( buttonRect.bottom - buttonRect.height - tooltipRect.width < 0 ) {
        position.top = buttonRect.bottom + margin;
      }
    }

    // enough space to render at bottom of host

    this.componentRef.location.nativeElement.style.top = `${ position.top }px`;
    this.componentRef.location.nativeElement.style.left = `${ position.left }px`;
  }

  ngOnDestroy() {
    if ( this.componentRef ) {
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }
}
