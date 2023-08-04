import {Col, Row} from "antd";
import PVStatus from "./PVStatus";
import BatteryStatus from "./PVStatus/BatteryStatus";
import QuotesStatus from "./QuotesStatus";
import {CurrentStatusDiv, MainStatusDiv} from "./index.style";
import React, {Component} from "react";

class CurrentStatusChild extends Component {

  render() {
    let currentStatus = this.props.dataObj;

    return (
      <CurrentStatusDiv>
        <MainStatusDiv>
          <Row type="flex" justify="center">
            <h5 style={{marginBottom: '50px'}}>Current Status</h5>
          </Row>
          <Row type="flex">
            <Col span={12}>
              <Row type="flex" justify="center">
                <PVStatus pvStatus={currentStatus.pvStatus}/>
              </Row>
              <Row type="flex" justify="center">
                <BatteryStatus batteryStatus={currentStatus.batteryStatus}/>
              </Row>
            </Col>
            <Col span={12}>
              <Row type="flex" justify="center">
                <QuotesStatus quoteStatus={currentStatus.quoteStatus}/>
              </Row>
            </Col>
          </Row>
        </MainStatusDiv>
      </CurrentStatusDiv>
    );
  }
}

export default CurrentStatusChild;
