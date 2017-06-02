import * as types from '../../constants/action_types';
export function DrawerOpen() {
  return {
    type: types.DRAWEROPEN
  };
}
export function DrawerClose() {
  return {
    type: types.DRAWERCLOSE
  };
}