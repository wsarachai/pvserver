import React, { Component } from 'react';
import {
    Image,
    PowerStatusTextDiv,
    PowerStatusTextFeedInDiv,
} from "../index.style"
import {
    GridLineDiv,
    ImageStatusDemand,
    ImageStatusFeedIn,
    ImageIndicatorFeedIn, PowerStatusLabel, PowerStatusValue, PowerStatusUnit
} from "./index.style"
import gridLineImg from "../../../../asset/battery-status/sprite-grid.png"
import indicatorRL from "../../../../asset/battery-status/indicator-right-left.gif"
import { Row } from "antd";

const Status = {
    Demand: "demand",
    FeedIn: "feed-in"
}

class GridLineStatus extends Component {
    render() {
        let currentHomeState
        let active
        let PowerStatusDiv;
        const { gridLineStatus } = this.props

        if (gridLineStatus.status === Status.Demand) {
            currentHomeState = ImageStatusDemand
            PowerStatusDiv = PowerStatusTextDiv
            active = true
        } else {
            currentHomeState = ImageStatusFeedIn
            PowerStatusDiv = PowerStatusTextFeedInDiv
            active = false
        }

        return (
            <Row type="flex" justify="center">
                <GridLineDiv>
                    <Image as={currentHomeState} src={gridLineImg} />
                    <ImageIndicatorFeedIn src={indicatorRL} />
                    <PowerStatusDiv>
                        <PowerStatusLabel active={active}>{ active ? 'Purchased electricity' : 'Grid feed-in' }</PowerStatusLabel>
                        <PowerStatusValue active={active}>{gridLineStatus.power}</PowerStatusValue>
                        <PowerStatusUnit active={active}>{gridLineStatus.unit}</PowerStatusUnit>
                    </PowerStatusDiv>
                </GridLineDiv>
            </Row>
        );
    }
}

GridLineStatus.defaultProps = {};

export default GridLineStatus;
