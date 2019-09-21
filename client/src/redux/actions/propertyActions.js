import axios from "axios";
import { CLEAR_ERRORS, GET_PROPERTIES } from "./types";

export const getAllProperties = () => dispatch => {
  axios
    .get("/api/properties/all")
    .then(res => {
      console.log(res);
      dispatch({
        type: GET_PROPERTIES,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const addProperty = propertyData => dispatch => {
  axios
    .post("/api/properties/create", propertyData)
    .then(res => {
      console.log(res);
      dispatch(getAllProperties());
    })
    .catch(err => console.log(err));
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
