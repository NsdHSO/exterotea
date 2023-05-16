import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkbanckComponent } from './workbanck.component';

describe('WorkbanckComponent', () => {
  let component: WorkbanckComponent;
  let fixture: ComponentFixture<WorkbanckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkbanckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkbanckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
