import axios from "axios";
import { GET_ERRORS, CLEAR_ERRORS } from "./types";

export const addProperty = apartmentData => dispatch => {
  axios
    .post("/api/properties/create", apartmentData)
    .then(res => {
      console.log(res);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteProperty = propertyID => dispatch => {
  axios
    .post("/api/properties/delete", propertyID)
    .then(res => {
      console.log(res);
    })
    .catch(err => console.log(err));
};

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};
