import React, { Component } from 'react';
import { UnitDiv } from "./index.style";

class Unit extends Component {
  render() {
    return (
      <UnitDiv>
        Power (w)
      </UnitDiv>
    );
  }
}

Unit.defaultProps = {};

export default Unit;
