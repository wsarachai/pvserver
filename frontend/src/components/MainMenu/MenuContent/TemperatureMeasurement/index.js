import React from 'react';
import { Col, Row} from "antd";
import TempModule from '../../../../asset/portalicon/temp_module.png'
import TempAmbient from '../../../../asset/portalicon/temp_ambient.png'

const TemperatureMeasurement = ({ temperature }) => {
  return (
    <Row type="flex" justify="center" gutter={8}>
      <Col>
        <img src={TempModule} alt="TempModule"/>
      </Col>
      <Col>
        <div>
          <span style={{ fontSize: '2rem' }}>{temperature.temperatureMeasurement}&deg;C</span>
        </div>
      </Col>
      <Col>
        <img src={TempAmbient} alt="TempAmbient"/>
      </Col>
      <Col>
        <div>
          <span style={{ fontSize: '2rem' }}>{temperature.ambientTemperature}&deg;C</span>
        </div>
      </Col>
    </Row>
  )
}

export default TemperatureMeasurement;