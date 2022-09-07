import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ConstDashboard } from 'ngx-liburg-frame-side';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { DashboardTypes } from './dashboard-planning.actions';


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
