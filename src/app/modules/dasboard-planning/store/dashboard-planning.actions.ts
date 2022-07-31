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
  readonly type: any = DashboardTypes.MoveItemInList;

  /** *************************************************************************************************
   * Init Action
   * @constructor
   * @param {number} payload
   */
  constructor(public payload: {currentIndex: number, previousIndex: number, item: string[]}){
  }
}

// export type Dashboard = MoveInsideList | ConstDashboard
export type Dashboard = MoveInsideList