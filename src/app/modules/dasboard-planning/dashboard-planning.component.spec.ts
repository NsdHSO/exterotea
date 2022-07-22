import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPlanningComponent } from './dashboard-planning.component';
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {ShoppingListState} from "./store/dashboard-planning.reducer";
import {Store} from "@ngrx/store";

describe('DasboardPlanningComponent', () => {
  let component: DashboardPlanningComponent;
  let fixture: ComponentFixture<DashboardPlanningComponent>;
  let fakeStore: MockStore<ShoppingListState>
  let initialState = {ingredients: [1,2,4]} as ShoppingListState

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardPlanningComponent],
      providers:[
        provideMockStore({initialState})
      ]
    })
      .compileComponents();

    fakeStore = TestBed.get<Store>(Store)

    fixture = TestBed.createComponent(DashboardPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
