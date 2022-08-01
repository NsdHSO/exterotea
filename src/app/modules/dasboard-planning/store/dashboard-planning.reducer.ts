import { DashboardTypes } from './dashboard-planning.actions';
import { ActionReducerMap } from '@ngrx/store';
import { framePlanningReducer } from 'ngx-liburg-frame-side';

export interface LayoutDashboard {
  listsDashboard: Array<string[]>
}

const initialState: LayoutDashboard = {
  listsDashboard: [['TEST', 'TET@', 'TEST#', 'TESFA@#!!', 'dasdasd', 'BCR#$#!'], ['TEAGS@@§', 'ASGA231', 'TEST11']]
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
/** *************************************************************************************************
 * Dashboard Reducer
 * @return {LayoutDashboard} an objectÏ
 * @param {LayoutDashboard} state  The state
 * @param {Dashboard} action The action
 */
export function dashboardPlanningReducer(state: LayoutDashboard = initialState, action: any): LayoutDashboard {
  switch (action.type) {
  case DashboardTypes.MoveItemInList:

    const update = [
      ...action.payload.item
    ];

    const updateList = [...state.listsDashboard];
    updateList[0] = update;

    return <LayoutDashboard>{
      ...state,
      listsDashboard: updateList
    };
  default:
    return {
      ...initialState
    };
  }
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const reducers: ActionReducerMap<any> = {
  shoppingList: dashboardPlanningReducer,
  frameReducer: framePlanningReducer
};

