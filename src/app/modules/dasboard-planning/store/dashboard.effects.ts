import { Actions, Effect, ofType } from '@ngrx/effects';
import { ConstDashboard, DashboardTypes } from './dashboard-planning.actions';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable()
/** *************************************************************************************************
 * Dashboard Effects
 */
export class DashboardEffects {
  // Action Handler
  @Effect()
    dashboard = this.actions$.pipe(ofType(DashboardTypes.Const), switchMap((dashboardConst: ConstDashboard) => {
      return new Observable<number[]>((ov) => ov.next(dashboardConst.payload)).pipe(catchError((err) =>
        of('Error from inner ' + err)
      ), map((resp) => of(resp)
      ));
    }));

  /** *************************************************************************************************
   * Constructor Dashboard Effects
   */
  constructor(private actions$: Actions) {
  }
}
