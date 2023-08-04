import React, { Component } from 'react';
import {
    QuotesLabel,
    IndicatorContainerDiv
} from "../index.style"
import {
    SelfConsumptionDiv,
    SelfConsumptionBodyDiv
} from "./index.style"
import QuotesProgressBar from "../Progressbar";

class SelfConsumption extends Component {

    render() {
        const { selfConsumption } = this.props

        let nowValue = selfConsumption.now
        let maxValue = 100 - nowValue

        return (
            <SelfConsumptionDiv>
                <SelfConsumptionBodyDiv>
                    <QuotesLabel>Self-consumption rate</QuotesLabel>
                    <IndicatorContainerDiv>
                        <QuotesProgressBar now={selfConsumption.now}
                                           maxValue={maxValue}
                                           label={`${selfConsumption.now}%`}
                                           foregroundColor={'warning'}
                                           backgroundColor={'success'}
                        />
                    </IndicatorContainerDiv>
                </SelfConsumptionBodyDiv>
            </SelfConsumptionDiv>
        );
    }
}

SelfConsumption.defaultProps = {};

export default SelfConsumption;
