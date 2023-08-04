import React from 'react';
import { Col, Row} from "antd";
import { Text } from "../../../../styles/text.style";
import CompareWarning from '../../../../asset/portalicon/wr-compare_warning.png'

const InverterComparisonStatus = ({ inverterComparisonStatus }) => {
    return (
        <Row type="flex" justify="center" gutter={8}>
            <Col>
                <img src={CompareWarning} alt="CompareWarning"/>
            </Col>
            <Col>
                <div style={{ paddingTop: 15 }}>
                    <Text>{inverterComparisonStatus.status}</Text>
                </div>
            </Col>
        </Row>
    )
}

export default InverterComparisonStatus;
