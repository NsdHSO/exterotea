import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPlanningComponent } from './dashboard-planning.component';

describe('DasboardPlanningComponent', () => {
  let component: DashboardPlanningComponent;
  let fixture: ComponentFixture<DashboardPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPlanningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
