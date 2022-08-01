import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPlanningComponent } from './dashboard-planning.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { LayoutDashboard } from './store/dashboard-planning.reducer';
import { Store } from '@ngrx/store';

describe('DasboardPlanningComponent', () => {
  let component: DashboardPlanningComponent;
  let fixture: ComponentFixture<DashboardPlanningComponent>;
  let fakeStore: MockStore<LayoutDashboard>;
  const initialState = { listsDashboard: [['sdasd']] } as LayoutDashboard;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardPlanningComponent],
      providers: [
        provideMockStore({ initialState })
      ]
    })
      .compileComponents();

    fakeStore = TestBed.get<Store>(Store);
    fixture = TestBed.createComponent(DashboardPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('state about user', () => {
    fakeStore.subscribe((stateStore:LayoutDashboard) => {
      expect(stateStore).toEqual({ listsDashboard: [['sdasd']] } as LayoutDashboard);
    });
  });
});
