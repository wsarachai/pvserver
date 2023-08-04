import React from 'react';
import { Col, Row } from "antd";
import IconInsolation from '../../../../asset/portalicon/icon_insolation.png'
import { TextCenter } from "./index.style";

const Irradiation = ({ totalIrradiation }) => {
  return (
    <Row type="flex" justify="center" gutter={8}>
      <Col>
        <img src={IconInsolation} alt="IconOK"/>
      </Col>
      <Col>
        <TextCenter>
          {totalIrradiation}
        </TextCenter>
      </Col>
      <Col>
        <TextCenter>
          w/m<sup>2</sup>
        </TextCenter>
      </Col>
    </Row>
  )
}

export default Irradiation;
