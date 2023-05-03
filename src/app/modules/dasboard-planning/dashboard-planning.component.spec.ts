import { DragDropModule } from '@angular/cdk/drag-drop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ActionReducerMap, StoreModule } from '@ngrx/store';

import { DashboardPlanningComponent } from './dashboard-planning.component';
import { dashboardPlanningReducer } from './store/dashboard-planning.reducer';

describe('DasboardPlanningComponent', () => {
  let component: DashboardPlanningComponent;
  let fixture: ComponentFixture<DashboardPlanningComponent>;

  const reducers: ActionReducerMap<unknown> = {
    shoppingList: dashboardPlanningReducer
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPlanningComponent ],
      imports: [
        StoreModule.forRoot(
          reducers
        ),
        DragDropModule
      ],
      providers: [
        {
          provide: ActivatedRoute, useValue: {
            snapshot: { params: { id: 123 } }
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DashboardPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('store create', () => {
    fixture.detectChanges();
    expect(component.drop).toBeTruthy();
  });
});
