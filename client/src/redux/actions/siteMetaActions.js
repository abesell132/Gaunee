import { UPDATE_ACTIVE_PAGE, UPDATE_ACTIVE_PROPERTY } from "./types";

export const updateActivePage = pageName => dispatch => {
  dispatch({ type: UPDATE_ACTIVE_PAGE, payload: pageName });
};

export const updateActiveProperty = propertyKey => dispatch => {
  dispatch({ type: UPDATE_ACTIVE_PROPERTY, payload: propertyKey });
};
