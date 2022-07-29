import { Dashboard, DashboardTypes } from './dashboard-planning.actions';
import {Action, ActionReducerMap, combineReducers} from '@ngrx/store';
import {framePlanningReducer} from "ngx-liburg-frame-side";

export interface ShoppingListState{
  listsDashboard: Array<string[]>
}

const initialState: ShoppingListState = {
  listsDashboard : [['TEST', 'TET@', 'TEST#'], ['TEAGS@@', 'ASGA231', 'TEST11']]
};
/** *************************************************************************************************
 * Dashboard Reducer
 * @return {ShoppingListState} an object
 * @param {ShoppingListState} state  The state
 * @param {Dashboard} action The action
 */
export function dashboardPlanningReducer(state :ShoppingListState = initialState, action: any): ShoppingListState {
  switch (action.type) {
  case DashboardTypes.Init:

    return <ShoppingListState>{
      ...state,
      listsDashboard: [...state.listsDashboard, action.payload]
    };
  default:
    return {
      ...initialState
    };
  }
}

export interface AppState {
  shoppingList: ShoppingListState;
  reducersFrame: ShoppingListState
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const reducers: ActionReducerMap<any> = {
  shoppingList: dashboardPlanningReducer,
  frameReducer: framePlanningReducer,
};

export const reducerss : any  = combineReducers({
  frameReducer: framePlanningReducer,
  shoppingList: dashboardPlanningReducer,
})
