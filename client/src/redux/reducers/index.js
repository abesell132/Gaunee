import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import propertyReducer from "./propertyReducer";
import siteMetaReducer from "./siteMetaReducer";
import paymentReducer from "./paymentReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  properties: propertyReducer,
  siteMeta: siteMetaReducer,
  payments: paymentReducer,
});
