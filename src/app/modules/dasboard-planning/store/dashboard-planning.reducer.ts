import { Dashboard, DashboardTypes } from './dashboard-planning.actions';
import { ActionReducerMap } from '@ngrx/store';

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
export function dashboardPlanningReducer(state :ShoppingListState = initialState, action: Dashboard): ShoppingListState {
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
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const reducers: ActionReducerMap<AppState, any> = {
  shoppingList: dashboardPlanningReducer
};

