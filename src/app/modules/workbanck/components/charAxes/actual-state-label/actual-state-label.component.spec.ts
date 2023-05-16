import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualStateLabelComponent } from './actual-state-label.component';

describe('ActualStateLabelComponent', () => {
  let component: ActualStateLabelComponent;
  let fixture: ComponentFixture<ActualStateLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ActualStateLabelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualStateLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
