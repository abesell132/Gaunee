import React from "react";
import PropTypes from "prop-types";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function SelectListGroup({ name, placeholder, className, onSelect, options }) {
  const selectOptions = options.map(option => (
    <Dropdown.Item
      onSelect={onSelect}
      value={option.value}
      key={option.label}
      className={className}
    >
      {option.label}
    </Dropdown.Item>
  ));
  return (
    <div className="form-group">
      <DropdownButton
        className={"dropdown-basic-button " + className}
        title={name}
      >
        {selectOptions}
      </DropdownButton>
    </div>
  );
}

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  info: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default SelectListGroup;
