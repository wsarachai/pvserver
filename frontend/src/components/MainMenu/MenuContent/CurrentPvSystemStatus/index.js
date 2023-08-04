import React from 'react';
import { Col, Row } from "antd";
import IconOK from '../../../../asset/portalicon/icon_AL_ok.png'

const CurrentPvSystemStatus = ({ currentPvSystemStatus }) => {
    return (
        <Row type="flex" justify="center" gutter={8}>
            <Col>
                {
                    currentPvSystemStatus.status ?
                        <img src={IconOK} alt="IconOK"/>
                        :
                        <img src={IconOK} alt="IconOK"/>
                }
            </Col>
        </Row>
    )
}

export default CurrentPvSystemStatus;
