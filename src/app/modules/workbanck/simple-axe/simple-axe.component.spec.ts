import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleAxeComponent } from './simple-axe.component';

describe('SimpleAxeComponent', () => {
  let component: SimpleAxeComponent;
  let fixture: ComponentFixture<SimpleAxeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SimpleAxeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleAxeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
