import React from 'react';
import { Col, Row } from "antd";
import { Text } from "../../../../styles/text.style";
import IconAnlageninnfo from '../../../../asset/portalicon/icon_anlageninfo.png'

const PvSystemInformation = ({ pvSystemInformation }) => {
    return (
        <div>
            <Row type="flex" gutter={8}>
                <Col>
                    <div style={{ paddingTop: '5px' }}>
                        <img src={IconAnlageninnfo} alt="IconAnlageninnfo" height="85"/>
                    </div>
                </Col>
                <Col>
                    <Row type="flex" gutter={8}>
                        <Col>
                            <Text>PV System Power:</Text>
                        </Col>
                    </Row>
                    <Row type="flex" gutter={8}>
                        <Col>
                            <Text strong={true}>{`${pvSystemInformation.systemPower} ${pvSystemInformation.unit}`}</Text>
                        </Col>
                    </Row>
                    <Row type="flex" gutter={8}>
                        <Col>
                            <Text>Commissioning:</Text>
                        </Col>
                    </Row>
                    <Row type="flex" gutter={8}>
                        <Col>
                            <Text strong={true}>{pvSystemInformation.commissioning}</Text>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default PvSystemInformation;
