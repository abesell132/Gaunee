import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import propertyReducer from "./propertyReducer";
import siteMetaReducer from "./siteMetaReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  properties: propertyReducer,
  siteMeta: siteMetaReducer
});
