import React, { Component } from 'react';
import QuotesProgressBar from "../Progressbar"
import {
    QuotesLabel,
    IndicatorContainerDiv
} from "../index.style"
import {
    SelfSufficiencyDiv,
    SelfSufficiencyBodyDiv
} from "./index.style"

class SelfSufficiency extends Component {

    render() {
        const { selfSufficiency } = this.props

        let nowValue = selfSufficiency.now
        let maxValue = 100 - nowValue

        return (
            <SelfSufficiencyDiv>
                <SelfSufficiencyBodyDiv>
                    <QuotesLabel>Self-sufficiency quota</QuotesLabel>
                    <IndicatorContainerDiv>
                        <QuotesProgressBar now={selfSufficiency.now}
                                           maxValue={maxValue}
                                           label={`${selfSufficiency.now}%`}
                                           foregroundColor={'success'}
                                           backgroundColor={'danger'}
                        />
                    </IndicatorContainerDiv>
                </SelfSufficiencyBodyDiv>
            </SelfSufficiencyDiv>
        );
    }
}

SelfSufficiency.defaultProps = {};

export default SelfSufficiency;
