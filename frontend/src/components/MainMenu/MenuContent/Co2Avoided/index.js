import React from 'react';
import { Col, Row } from "antd";
import { CurrentText, Text, UnitText } from "../../../../styles/text.style";
import IconCarbon from '../../../../asset/portalicon/icon_carbon.png'

const Co2Avoided = ({ co2Avoided }) => {
    return (
        <div>
            <Row type="flex" justify="center" gutter={8}>
                <Col>
                    <img src={IconCarbon} alt="IconCarbon"/>
                </Col>
                <Col>
                    <CurrentText>{co2Avoided.avoided.power}</CurrentText>
                    <UnitText>{co2Avoided.avoided.unit}</UnitText><br/>
                    <Text>Today</Text>
                </Col>
            </Row>
        </div>
    )
}

export default Co2Avoided;
