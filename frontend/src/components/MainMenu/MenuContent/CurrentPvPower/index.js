import React from 'react';
import { Col, Row } from "antd";
import { CurrentText, UnitText } from "../../../../styles/text.style";
import Guage from '../../../../asset/portalicon/gauge.png'
import CurrentPlantPower from '../../../../asset/portalicon/currentPlantPowerPointer.png'
import { CurrentPlantDiv } from "./index.style";
import ValueFormat from "../../../shared/ValueFormat/ValueFormat";
import UnitFormat from "../../../shared/ValueFormat/UnitFormat";

const CurrentPvPower = ({ currentPvPower }) => {
  let maxPower = currentPvPower.MaxPower;
  let indicatorAngle = currentPvPower.power/maxPower*180;
  return (
    <Row type="flex" justify="center" gutter={8}>
      <Col>
        <img src={Guage} alt="Guage" />
        <CurrentPlantDiv angle={indicatorAngle}>
          <img src={CurrentPlantPower} alt="CurrentPlantPower" />
        </CurrentPlantDiv>
      </Col>
      <Col>
        <CurrentText><ValueFormat value={currentPvPower.power} /></CurrentText>
        <UnitText><UnitFormat value={currentPvPower.power} /></UnitText>
      </Col>
    </Row>
  )
}

export default CurrentPvPower;
