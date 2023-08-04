import React, { Component } from 'react';
import {
    Image,
    PowerStatusTextDiv,
    PowerStatusLabel,
    PowerStatusValue,
    PowerStatusUnit
} from "../index.style"
import {
    PVFeedInDiv,
    ImageStatusHome,
    ImageStatusBattery,
    ImageStatusHomeBattery,
    ImageIndicatorFeedIn,
    ImageIndicatorBattery
} from "./index.style"
import feedInImg from "../../../../asset/battery-status/sprite-pv.png"
import indicatorLR from "../../../../asset/battery-status/indicator-left-right.gif"
import indicatorTB from "../../../../asset/battery-status/indicator-top-bottom.gif"


const Status = {
    None: "none",
    Home: "home",
    Battery: "battery",
    HomeBattery: "home-battery"
}

class PVFeedInStatus extends Component {

    render() {
        let currentPvState
        const { pvFeedInStatus } = this.props

        if (pvFeedInStatus.status === Status.None) {
            currentPvState = Image
        } else if (pvFeedInStatus.status === Status.Home) {
            currentPvState = ImageStatusHome
        } else if (pvFeedInStatus.status === Status.Battery) {
            currentPvState = ImageStatusBattery
        } else {
            currentPvState = ImageStatusHomeBattery
        }

        return (
            <PVFeedInDiv>
                <Image as={currentPvState} src={feedInImg} />
                <ImageIndicatorFeedIn src={indicatorLR} />
                <ImageIndicatorBattery src={indicatorTB} />
                <PowerStatusTextDiv>
                    <PowerStatusLabel active={true}>PV power generation</PowerStatusLabel>
                    <PowerStatusValue active={true}>{pvFeedInStatus.power}</PowerStatusValue>
                    <PowerStatusUnit active={true}>{pvFeedInStatus.unit}</PowerStatusUnit>
                </PowerStatusTextDiv>
            </PVFeedInDiv>
        );
    }
}

PVFeedInStatus.defaultProps = {};

export default PVFeedInStatus;
