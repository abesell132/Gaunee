import axios from "axios";
import { GET_PROPERTIES, GET_ERRORS, CLEAR_ERRORS } from "./types";

export const getProperties = () => dispatch => {
  axios
    .get("/api/apartments/all")
    .then(res => dispatch({ type: GET_PROPERTIES, payload: res.data }))
    .catch(err => {
      console.log(err);
    });
};

export const addProperty = apartmentData => dispatch => {
  axios
    .post("/api/apartments/create", apartmentData)
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
    .post("/api/apartments/delete", propertyID)
    .then(res => {
      console.log(res);
    })
    .catch(err => console.log(err));
};

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};
