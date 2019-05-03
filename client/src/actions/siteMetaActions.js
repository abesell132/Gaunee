import { UPDATE_ACTIVE_PAGE } from "./types";

export const updateActivePage = pageName => dispatch => {
  dispatch({ type: UPDATE_ACTIVE_PAGE, payload: pageName });
};
