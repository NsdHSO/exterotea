import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, filter, map, merge, mergeMap, Observable, of, ReplaySubject, Subject, takeUntil } from 'rxjs';
import { MoveInsideList } from './store/dashboard-planning.actions';

@Component({
  selector: 'app-dasboard-planning',
  templateUrl: './dashboard-planning.component.html',
  styleUrls: [ './dashboard-planning.component.scss' ]
})
/** *************************************************************************************************
 * Dashboard Planning Component
 */
export class DashboardPlanningComponent implements OnInit, OnDestroy {
  destroy$ : Subject<any> = new ReplaySubject<any>();
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  containerList : Observable<any>;
  user : string = '';
  @ViewChild('rendererTemplate') rendererTemplate: TemplateRef<any> | any;

  /** *************************************************************************************************
   * Constructor Dashboard Planning Component
   */
  constructor(
    private ac : ActivatedRoute,
    public store : Store<{ shoppingList : number[] }>,
    private readonly _router : Router
  ) {
    this.containerList = store.select('shoppingList');
  }

  ngOnDestroy() : void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  /** *************************************************************************************************
   * Init Dashboard Planning Component
   */
  ngOnInit() : void {
    this.containerList.subscribe((resp) => (this.user = resp.listsDashboard));
    merge(of(this.ac.snapshot.params), this._router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.ac),
      map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.params)
    ))
      .pipe(takeUntil(this.destroy$))
      .subscribe((p) => console.log(p));
  }

  /** *************************************************************************************************
   * @param {CdkDragDrop<string[]>} event coming from UI
   * @return {void} Nothing to be returned
   */
  drop(event : CdkDragDrop<string[]>) : void {
    const getCurrentContainer = parseInt(
      event.container.id.split('-')
        .pop() ?? '0',
      10
    );
    const getPreviousContainer = parseInt(
      event.previousContainer.id.split('-')
        .pop() ?? '0',
      10
    );
    if (event.previousContainer === event.container) {
      const array = [ ...event.container.data ];
      const temp = array[event.previousIndex];
      if (event.currentIndex - event.previousIndex >= 2) {
        for (let i = event.previousIndex; i < event.currentIndex; i++) {
          array[i] = array[i + 1];
        }
        array[event.currentIndex] = temp;
      } else if (event.previousIndex > event.currentIndex) {
        for (let j = event.previousIndex; j > event.currentIndex; j--) {
          array[j] = array[j - 1];
        }
        array[event.currentIndex] = temp;
      } else {
        [ array[event.previousIndex], array[event.currentIndex] ] = [
          array[event.currentIndex],
          array[event.previousIndex]
        ];
      }
      this.store.dispatch(
        new MoveInsideList({
          containerIndex: {
            currenIndex: getCurrentContainer,
            previousIndex: getCurrentContainer
          },
          previousIndex: event.previousIndex,
          item: array,
          previous: array
        })
      );
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const item = event.previousContainer.data[event.previousIndex];
      const array = [ ...event.previousContainer.data ];
      const currentArray = [ ...event.container.data ];
      for (
        let i = event.previousIndex;
        i <= event.previousContainer.data.length - 1;
        i++
      ) {
        array[i] = array[i + 1];
      }
      array.pop();
      currentArray.splice(event.currentIndex, 0, item);
      this.store.dispatch(
        new MoveInsideList({
          containerIndex: {
            currenIndex: getCurrentContainer,
            previousIndex: getPreviousContainer
          },
          previousIndex: event.previousIndex,
          item: currentArray,
          previous: array
        })
      );
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
