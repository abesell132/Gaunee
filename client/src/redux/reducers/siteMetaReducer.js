import { UPDATE_ACTIVE_PAGE, UPDATE_ACTIVE_PROPERTY } from "../actions/types";

const initialState = {
  activePage: {},
  activeProperty: "0"
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_ACTIVE_PAGE:
      return {
        ...state,
        activePage: action.payload
      };
    case UPDATE_ACTIVE_PROPERTY:
      return {
        ...state,
        activeProperty: action.payload
      };
    default:
      return state;
  }
}
