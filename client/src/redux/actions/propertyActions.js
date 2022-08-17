import axios from "axios";
import { CLEAR_ERRORS, GET_PROPERTIES } from "./types";

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

// ALL - READ
export const getAllProperties = () => (dispatch) => {
  axios
    .get("/api/properties/all")
    .then((res) => {
      console.log(res);
      dispatch({
        type: GET_PROPERTIES,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * PROPERTIES
 */

// PROPERTIES - CREATE
export const addProperty = (propertyData) => (dispatch) => {
  axios
    .post("/api/properties/create", propertyData)
    .then((res) => {
      console.log(res);
      dispatch(getAllProperties());
    })
    .catch((err) => console.log(err));
};

// PROPERTIES - UPDATE
export const updateProperty = (propertyData) => (dispatch) => {
  console.log("Called updateProperty");
  axios
    .post("/api/properties/update", propertyData)
    .then((res) => {
      console.log(res);
      dispatch(getAllProperties());
    })
    .catch((err) => console.log(err));
};

// PROPERTIES - DELETE
export const deleteProperty = (propertyID, cb) => (dispatch) => {
  axios
    .post("/api/properties/delete", { propertyID })
    .then((res) => {
      dispatch(getAllProperties());
      cb();
    })
    .catch((err) => console.log(err));
};

/**
 * UNITS
 */

// UNITS - CREATE
export const addUnit = (unitData, cb) => (dispatch) => {
  axios
    .post("/api/units/create", unitData)
    .then((res) => {
      dispatch(getAllProperties());
      cb();
    })
    .catch((err) => console.log(err));
};

// UNITS - UPDATE
export const updateUnit = (unitData, cb) => (dispatch) => {
  axios
    .post("/api/units/update", unitData)
    .then((res) => {
      dispatch(getAllProperties());
      cb();
    })
    .catch((err) => console.log(err));
};

// UNITS - DELETE
export const deleteUnit = (unitID, cb) => (dispatch) => {
  axios
    .post("/api/units/delete", { unitID })
    .then((res) => {
      dispatch(getAllProperties());
      cb();
    })
    .catch((err) => console.log(err));
};

/**
 * TENANTS
 */

// TENANTS - CREATE
export const addTenant = (tenantData, cb) => (dispatch) => {
  axios
    .post("/api/tenants/create", tenantData)
    .then((res) => {
      console.log(res);
      dispatch(getAllProperties());
      cb();
    })
    .catch((err) => console.log(err));
};

// TENANTS - UPDATE
export const editTenant = (tenantData, cb) => (dispatch) => {
  axios
    .post("/api/tenants/update", tenantData)
    .then((res) => {
      console.log(res);
      dispatch(getAllProperties());
      cb();
    })
    .catch((err) => console.log(err));
};

export const deleteTenant = (tenantID, cb) => (dispatch) => {
  axios
    .post("/api/tenants/delete", { tenantID })
    .then((res) => {
      dispatch(getAllProperties());
      cb();
    })
    .catch((err) => console.log(err));
};

/**
 * LEASES
 */

// LEASES - CREATE
export const addLease = (leaseData, cb) => (dispatch) => {
  axios
    .post("/api/leases/create", leaseData)
    .then((res) => {
      console.log(res);
      dispatch(getAllProperties());
      cb();
    })
    .catch((err) => console.log(err));
};

// LEASES - UPDATE
export const editLease = (leaseData, cb) => (dispatch) => {
  axios
    .post("/api/leases/update", leaseData)
    .then((res) => {
      dispatch(getAllProperties());
      cb();
    })
    .catch((err) => console.log(err));
};

export const deleteLease = (leaseID, cb) => (dispatch) => {
  axios
    .post("/api/leases/delete", { leaseID })
    .then((res) => {
      dispatch(getAllProperties());
      cb();
    })
    .catch((err) => console.log(err));
};
