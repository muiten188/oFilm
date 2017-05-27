import * as types from './action_types';
export function push(route) {
  return {
    type: types.PUSH_ROUTE,
    route: route,
  };
}
export function pop() {
  return {
    type: types.POP_ROUTE
  };
}