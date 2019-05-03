import { UPDATE_ACTIVE_PAGE } from "../actions/types";

const initialState = {
  activePage: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_ACTIVE_PAGE:
      return {
        ...state,
        activePage: action.payload
      };

    default:
      return state;
  }
}
