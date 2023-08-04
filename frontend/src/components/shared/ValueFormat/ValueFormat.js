import React, {Component} from "react";

class ValueFormat extends Component {
  render() {
    let value = this.props.value;
    if (value >= 1000000) {
      value = value / 1000000;
    } else if (value >= 1000) {
      value = value / 1000;
    }
    try {
      value = value.toFixed(2);
    }
    catch (e) {
      value = "0.00";
    }
    return (
      <span>{value}</span>
    );
  };
}

ValueFormat.defaultProps = {};

export default ValueFormat;
