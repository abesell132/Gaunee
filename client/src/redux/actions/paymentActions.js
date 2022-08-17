const axios = require("axios");

export const getAllPayments = () => (dispatch) =>
  axios
    .get("/api/payments/all")
    .then((res) => dispatch({ type: "GET_PAYMENTS", payload: res.data }))
    .catch((err) => {
      console.log(err);
    });

export const addPayment = (payment, cb) => (dispatch) => {
  axios
    .post("/api/payments/create", { ...payment })
    .then((res) => {
      dispatch(getAllPayments());
      cb();
    })
    .catch((err) => console.log(err));
};

export const deletePayment = (paymentID, cb) => (dispatch) => {
  axios
    .post("/api/payments/delete", { paymentID })
    .then((res) => {
      dispatch(getAllPayments());
      cb();
    })
    .catch((e) => console.log(e));
};
