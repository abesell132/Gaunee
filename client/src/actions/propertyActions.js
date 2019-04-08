import axios from "axios";
import { GET_PROPERTIES, GET_ERRORS } from "./types";

export const getProperties = () => dispatch => {
  axios
    .get("/api/apartments/all")
    .then(res => dispatch({ type: GET_PROPERTIES, payload: res.data }))
    .catch(err => {
      console.log(err);
    });
};
