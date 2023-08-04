import React from 'react';
import {Col, Row} from "antd";
import imgYotsuk from "../../../../asset/yotsuk.jpg"
import imgRenewableA from '../../../../asset/renewable-A.jpg'
import imgRenewableB from '../../../../asset/renewable-B.jpg'

const Location = ({location}) => {

  let image = imgRenewableA;

  if (location && location.station === "yotsuk") {
    image = imgYotsuk;
  }
  else if (location && location.station === "Building A") {
    image = imgRenewableA;
  }
  else if (location && location.station === "Building B") {
    image = imgRenewableB;
  }

  return (
    <Row type="flex" justify="center" gutter={8}>
      <Col>
        <img src={image} alt="" width={250} height={115}/>
      </Col>
    </Row>
  )
}

export default Location;
