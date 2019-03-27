const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.address1 = !isEmpty(data.address1) ? data.address1 : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.state = !isEmpty(data.state) ? data.state : "";
  data.zipcode = !isEmpty(data.zipcode) ? data.zipcode : "";

  if (Validator.isEmpty(data.address1)) {
    errors.address = "Address field is required";
  }

  if (Validator.isEmpty(data.city)) {
    errors.city = "City field is required";
  }
  if (Validator.isEmpty(data.state)) {
    errors.state = "State field is required";
  }
  if (Validator.isEmpty(data.zipcode)) {
    errors.zipcode = "Zipcode field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
