import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {DashboardTypes, MoveInsideList} from "./store/dashboard-planning.actions";

@Component({
  selector: 'app-dasboard-planning',
  templateUrl: './dashboard-planning.component.html',
  styleUrls: ['./dashboard-planning.component.scss']
})

/** *************************************************************************************************
 * Dashboard Planning Component
 */
export class DashboardPlanningComponent implements OnInit {
  containerList: Observable<any>;
  user: string = "";

  /** *************************************************************************************************
   * Constructor Dashboard Planning Component
   */
  constructor(private store: Store<{ 'shoppingList': number[] }>) {
    this.containerList = store.select('shoppingList');
  }

  /** *************************************************************************************************
   * Init Dashboard Planning Component
   */
  ngOnInit(): void {
    this.containerList.subscribe((resp) => this.user = resp.listsDashboard);
  }

  /** *************************************************************************************************
   *
   * @return {void}
   */
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      this.store.dispatch(new MoveInsideList({currentIndex: event.currentIndex, previousIndex:event.previousIndex, item:event.container.data}))
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}

