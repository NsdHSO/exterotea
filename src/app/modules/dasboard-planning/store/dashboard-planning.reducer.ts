import { ActionReducerMap } from '@ngrx/store';
import { framePlanningReducer } from 'ngx-liburg-frame-side';
import { DashboardTypes } from './dashboard-planning.actions';

export interface LayoutDashboard {
  listsDashboard: Array<string[]>
}

const initialState: LayoutDashboard = {
  listsDashboard: [['TEST', 'TET@', 'TEST#', 'TESFA@#!!', 'dasdasd', 'BCR#$#!'], ['TEAGS@@§', 'ASGA231', 'TEST11']]
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
/** *************************************************************************************************
 * Dashboard Reducer
 * @return {LayoutDashboard} an objectÏ
 * @param {LayoutDashboard} state  The state
 * @param {Dashboard} action The action
 */
/* eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,require-jsdoc */
export function dashboardPlanningReducer(state: LayoutDashboard = initialState, action: any): LayoutDashboard {
  switch (action.type) {
  case DashboardTypes.MoveItemInList:

    const update =action.payload.item;
    const previousUpdate =action.payload.previous;

    const updateList = [...state.listsDashboard];
    updateList[action.payload.containerIndex.currenIndex] = update;
    updateList[action.payload.containerIndex.previousIndex] = previousUpdate;
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

