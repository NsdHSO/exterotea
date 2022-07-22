import { Dashboard, DashboardTypes } from './dashboard-planning.actions';
import {Action, ActionReducerMap, combineReducers} from '@ngrx/store';
import {framePlanningReducer} from "ngx-liburg-frame-side";

export interface ShoppingListState{
  ingredients: Array<number>;
}

const initialState: ShoppingListState = {
  ingredients: []
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
    return {
      ...state,
      ingredients: [...state.ingredients, ...action.payload]
    };
  case DashboardTypes.Const:
    return {
      ...state,
      ingredients: [...state.ingredients, ...action.payload]
    };
  default:
    return {
      ingredients: initialState.ingredients
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
}, {shoppingList: {ingredients: [1112412,123124124,12414124]}, frameReducer:{ingredients:[121212]}})

