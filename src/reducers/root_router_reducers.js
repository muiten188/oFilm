import { PUSH_ROUTE, POP_ROUTE } from '../actions/action_types';
const initialState = {
  index: 0,
  key: 'root',
  children: [
    {
      key: 'home',
      title: 'Welcome home',
    },
  ],
};
export default (state = initialState, action) => {
  const {
    index,
    children,
  } = state;
switch (action.type) {
  case PUSH_ROUTE:
    return {
        ...state,
      children: [
        ...children,
        action.route,
      ],
      index: index + 1,
    };
  case POP_ROUTE:
    return index > 0 ? {
      ...state,
      children: children.slice(0, children.length - 1),
      index: index - 1,
    } : state;
  default:
    return state;
  }
};