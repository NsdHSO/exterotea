import { Action } from '@ngrx/store';

export enum DashboardTypes {
// eslint-disable-next-line no-unused-vars
  MoveItemInList = '[DASHBOARD COMPONENT] INIT',
// eslint-disable-next-line no-unused-vars
  Const = '[DASHBOARD COMPONENT] Constructor'
}

/** *************************************************************************************************
 * Init Action
 */
export class MoveInsideList implements Action {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  readonly type: any = DashboardTypes.MoveItemInList;

  /** *************************************************************************************************
   * Init Action
   * @constructor
   * @param {number} payload
   */
  constructor(public payload: {containerIndex: {currenIndex: number, previousIndex:number}, previousIndex: number, item: string[], previous:string[]}) {
  }
}

// export type Dashboard = MoveInsideList | ConstDashboard
export type Dashboard = MoveInsideList
