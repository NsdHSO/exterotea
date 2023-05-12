import { ChangeDetectorRef, ElementRef, ComponentFactoryResolver, ViewContainerRef, ApplicationRef, Injector, ComponentRef, Type } from '@angular/core';
import { GetMiddleEntityDirective } from './get-middle-entity.directive';
import { TooltipComponent } from './tooltip.component';

fdescribe('GetMiddleEntityDirective', () => {
  let directive: GetMiddleEntityDirective;
  let el: ElementRef;
  let componentFactoryResolver: ComponentFactoryResolver;
  let viewContainerRef: ViewContainerRef;
  let componentRef: ComponentRef<any>;

  beforeEach(() => {
    el = { nativeElement: {} } as ElementRef;
    componentFactoryResolver = jasmine.createSpyObj('ComponentFactoryResolver', ['resolveComponentFactory']);
    viewContainerRef = jasmine.createSpyObj('ViewContainerRef', ['createComponent']);

    directive = new GetMiddleEntityDirective(
      el,
      componentFactoryResolver,
      {} as Injector,
      {} as ApplicationRef,
      viewContainerRef
    );

    componentRef = {
      instance: {},
      location: {
        nativeElement: {
          style: {
            position: '',
            zIndex: ''
          }
        }
      },
      changeDetectorRef: {
        detectChanges: jasmine.createSpy('detectChanges'),
        markForCheck: jasmine.createSpy('markForCheck'),
        detach: jasmine.createSpy('detach'),
        checkNoChanges: jasmine.createSpy('checkNoChanges'),
        reattach: jasmine.createSpy('reattach')
      },
      destroy: jasmine.createSpy('destroy'),
      setInput: jasmine.createSpy('setInput'),
      injector: jasmine.createSpyObj('Injector', ['get']),
      hostView: {} as any,
      componentType: {} as Type<any>,
      onDestroy: jasmine.createSpy('onDestroy')
    };
  });

  it('should create', () => {
   expect(directive).toBeDefined()
  });
});
