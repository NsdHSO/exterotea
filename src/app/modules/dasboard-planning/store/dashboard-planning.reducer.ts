import {Dashboard, DashboardTypes} from './dashboard-planning.actions';
import {ActionReducerMap} from '@ngrx/store';
import {framePlanningReducer} from "ngx-liburg-frame-side";

export interface LayoutDashboard {
  listsDashboard: Array<string[]>
}

const initialState: LayoutDashboard = {
  listsDashboard: [['TEST', 'TET@', 'TEST#'], ['TEAGS@@§', 'ASGA231', 'TEST11']]
};

/** *************************************************************************************************
 * Dashboard Reducer
 * @return {LayoutDashboard} an object
 * @param {LayoutDashboard} state  The state
 * @param {Dashboard} action The action
 */
export function dashboardPlanningReducer(state: LayoutDashboard = initialState, action: any): LayoutDashboard {
  switch (action.type) {
    case DashboardTypes.MoveItemInList:
      const listDashboard = state.listsDashboard[0]

      const update = [
        ...listDashboard,
        ...['dasdas']
      ]

      const updateList = [...state.listsDashboard]
      updateList[0] = update

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
  frameReducer: framePlanningReducer,
};

