import React, { Component } from 'react';

import { QuotesStatusDiv } from "./index.style"
import SelfSufficiency from "./SelfSufficiency"
import SelfConsumption from "./SelfConsumption"
import { Row , Col} from "antd";

class QuotesStatus extends Component {
    render() {
        const { quoteStatus } = this.props

        return (
            <QuotesStatusDiv>
                <Row type="flex">
                    <Col>
                        <SelfSufficiency selfSufficiency={quoteStatus.selfSufficiency}/>
                    </Col>
                </Row>
                <Row type="flex">
                    <Col>
                        <SelfConsumption selfConsumption={quoteStatus.selfConsumption}/>
                    </Col>
                </Row>
            </QuotesStatusDiv>
        );
    }
}

QuotesStatus.defaultProps = {};

export default QuotesStatus;
