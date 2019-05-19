import axios from "axios";
import { GET_PROPERTIES } from "./types";

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
    .catch(err => console.log(err));
};

export const deleteProperty = propertyID => dispatch => {
  axios
    .post("/api/apartments/delete", propertyID)
    .then(res => {
      console.log(res);
    })
    .catch(err => console.log(err));
};
