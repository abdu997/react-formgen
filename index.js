function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';

class FormGen extends React.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleValueChange", input => e => {
      e.preventDefault();
      let values = this.state.values;
      values[input.key] = e.target.value;
      this.props.onChange(values);
      this.setState({
        values: values
      });
    });

    this.state = {
      values: {}
    };
  }

  render() {
    const {
      schema,
      template
    } = this.props;

    const label = label => React.createElement("label", null, label);

    const field = input => React.createElement("input", _extends({
      className: "validate"
    }, input, {
      onChange: this.handleValueChange(input)
    }));

    const dropdown = input => {
      return React.createElement("select", _extends({
        onChange: this.handleValueChange(input)
      }, input), React.createElement("option", null), input.options.map((option, index) => React.createElement("option", _extends({
        key: option.value
      }, option), option.label)));
    };

    const element = input => {
      let element;

      switch (input.type) {
        case "dropdown":
          element = dropdown(input);
          break;

        default:
          element = field(input);
      }

      if (!template) {
        return React.createElement(React.Fragment, null, label(input.label), element);
      } else {
        return React.createElement(React.Fragment, null, template(input.label, element));
      }
    };

    if (schema) {
      return React.createElement("form", {
        onSubmit: this.props.onSubmit(this.state.values)
      }, schema.map(input => {
        return React.createElement(React.Fragment, {
          key: input.key
        }, element(input));
      }));
    } else {
      return React.createElement(React.Fragment, null);
    }
  }

}

FormGen.propTypes = {
  schema: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  template: PropTypes.func
};
export default FormGen;
