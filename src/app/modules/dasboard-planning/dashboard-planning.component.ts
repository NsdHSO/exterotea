import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ConstDashboard } from './store/dashboard-planning.actions';

@Component({
  selector: 'app-dasboard-planning',
  templateUrl: './dashboard-planning.component.html',
  styleUrls: ['./dashboard-planning.component.scss']
})

/** *************************************************************************************************
 * Dashboard Planning Component
 */
export class DashboardPlanningComponent implements OnInit {
  count$: Observable<number[]>;

  /** *************************************************************************************************
   * Constructor Dashboard Planning Component
   */
  constructor(private store: Store<{ shoppingList: number[] }>) {
    this.count$ = store.select('shoppingList');
  }

  /** *************************************************************************************************
   * Init Dashboard Planning Component
   */
  ngOnInit(): void {
    this.count$.subscribe((resp) => resp);
  }

  /** *************************************************************************************************
   * Ingredient From Dashboard Component
   * @return {void}
   */
  addIngredient():void {
    this.store.dispatch(new ConstDashboard([1, 2, 22224, 22212]));
  }
}

