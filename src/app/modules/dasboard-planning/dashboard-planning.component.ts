import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {InitDashboard} from "ngx-liburg-frame-side";

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
  constructor(private store: Store<{ 'frameReducer': number[] }>) {
    this.count$ = store.select('frameReducer');
  }

  /** *************************************************************************************************
   * Init Dashboard Planning Component
   */
  ngOnInit(): void {
    this.count$.subscribe((resp) =>console.log( resp));
  }

  /** *************************************************************************************************
   * Ingredient From Dashboard Component
   * @return {void}
   */
  addIngredient():void {
    this.store.dispatch(new InitDashboard([1, 2, 22224, 22212]));
  }
}

