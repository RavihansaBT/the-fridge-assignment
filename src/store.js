import { createStore } from 'redux';

let initiaState = {
  error: null,
  items: [],
};

export function rootReducer(state = initiaState, action) {
  switch (action.type) {
    case 'setAllItems':
      return {
        ...state,
        items: action.payload,
      };

    default:
      return { ...state };
  }
}

export const store = createStore(rootReducer);
