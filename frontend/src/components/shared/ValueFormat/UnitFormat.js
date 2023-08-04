import React, {Component} from "react";

class UnitFormat extends Component {
  render() {
    let unit = 'W';
    let value = this.props.value;
    let h = this.props.h;

    if (h === undefined) {
      h = '';
    }

    if (value >= 1000000) {
      unit = 'MW' + h;
    } else if (value >= 1000) {
      unit = 'kW' + h;
    }
    return (
      <span>{unit}</span>
    );
  };
}

UnitFormat.defaultProps = {};

export default UnitFormat;
