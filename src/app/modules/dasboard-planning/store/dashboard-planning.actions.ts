import { Action } from '@ngrx/store';

export enum DashboardTypes {
// eslint-disable-next-line no-unused-vars
  Init = '[DASHBOARD COMPONENT] INIT',
// eslint-disable-next-line no-unused-vars
  Const = '[DASHBOARD COMPONENT] Constructor'
}

/** *************************************************************************************************
 * Init Action
 */
export class InitDashboard implements Action {
  readonly type: any = DashboardTypes.Init;

  /** *************************************************************************************************
   * Init Action
   * @constructor
   * @param {number} payload
   */
  constructor(public payload: {currentIndex: number, previousIndex: number}) {
  }
}

/** *************************************************************************************************
 * Constructor Action
 */
export class ConstDashboard implements Action {
  readonly type: string = DashboardTypes.Const;

  /** *************************************************************************************************
   * Const Action
   * @constructor
   * @param {number} payload
   */
  constructor(public payload: number[]) {
  }
}

export type Dashboard = InitDashboard | ConstDashboard
