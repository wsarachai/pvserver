import React, { Component } from 'react';

import { PVStatusDiv } from "./index.style"
import PVFeedInStatus from "./PVFeedIn"
import HomeConsumptionStatus from "./HomeConsumption"
import GridLineStatus from "./GridLine"
import { Col, Row } from "antd";

class PVStatus extends Component {
    render() {
        const { pvStatus } = this.props
        return (
            <PVStatusDiv>
                <Row type={"flex"} justify={"center"}>
                    <Col span={8}>
                        <PVFeedInStatus pvFeedInStatus={pvStatus.pvFeedInStatus}/>
                    </Col>
                    <Col span={8}>
                        <HomeConsumptionStatus homeConsumptionStatus={pvStatus.homeConsumptionStatus}/>
                    </Col>
                    <Col span={8}>
                        <GridLineStatus gridLineStatus={pvStatus.gridLineStatus}/>
                    </Col>
                </Row>
            </PVStatusDiv>
        );
    }
}

PVStatus.defaultProps = {};

export default PVStatus;
