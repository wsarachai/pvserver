import React, { Component } from 'react';
import {
    Image,
    PowerStatusTextDiv,
    PowerStatusLabel,
    PowerStatusValue,
    PowerStatusUnit,
    PowerStatusTextDivOnDemand
} from "../index.style"
import {
    HomeConsumptionDiv,
    ImageStatusGrid,
    ImageIndicatorFeedIn,
    StatusConsumptionLevelDiv,
    StatusConsumptionNoneDiv,
    StatusConsumptionPVDiv,
    StatusConsumptionGridDiv,
    StatusConsumptionBatteryDiv,
    ImageIndicatorFeedInHide,
    ImageIndicatorFeedInShow
} from "./index.style"
import homeConsumptionImg from "../../../../asset/battery-status/sprite-consumption.png"
import indicatorLR from "../../../../asset/battery-status/indicator-left-right-rounded.gif"
import indicatorBorder from "../../../../asset/battery-status/indicator-border.png"
import styled from "styled-components";

const Status = {
    None: "none",
    FeedIn: "feed-in"
}

const Source = {
    PVSystem: "pv-system",
    Battery: "battery"
}

const maxHeight = 254

class HomeConsumptionStatus extends Component {

    state = {
        active: true,
    }

    render() {
        let feedInStatus;
        let currentHomeState
        let gridHeight = 0
        let pvHeight = 0
        let batteryHeight = 0
        let PowerStatusDiv = PowerStatusTextDiv

        const { homeConsumptionStatus } = this.props

        let ratio = 1.0;
        if (homeConsumptionStatus.pv_feed_in <= homeConsumptionStatus.total_consumption) {
            ratio = homeConsumptionStatus.pv_feed_in / homeConsumptionStatus.total_consumption;
        }

        if (homeConsumptionStatus.source === Source.PVSystem) {
            pvHeight = maxHeight * ratio
            batteryHeight = 0
            gridHeight = maxHeight - pvHeight
        } else if (homeConsumptionStatus.source === Source.Battery) {
            pvHeight = 0
            batteryHeight = maxHeight * ratio
            gridHeight = maxHeight - batteryHeight
        }

        if (homeConsumptionStatus.status === Status.None) {
            feedInStatus = ImageIndicatorFeedInHide
            currentHomeState = Image
            PowerStatusDiv = PowerStatusTextDivOnDemand
        } else {
            feedInStatus = ImageIndicatorFeedInShow
            currentHomeState = ImageStatusGrid
        }

        const StatusConsumptionGridDivHeight = styled(StatusConsumptionGridDiv)`
            height: ${gridHeight}px;
        `
        const StatusConsumptionPVDivDivHeight = styled(StatusConsumptionPVDiv)`
            height: ${pvHeight}px;
        `
        const StatusConsumptionBatteryDivHeight = styled(StatusConsumptionBatteryDiv)`
            height: ${batteryHeight}px;
        `

        return (
            <HomeConsumptionDiv>
                <Image as={currentHomeState} src={homeConsumptionImg} />
                <ImageIndicatorFeedIn as={feedInStatus} src={indicatorLR} />
                <ImageIndicatorFeedIn as={feedInStatus} src={indicatorBorder} />
                <PowerStatusDiv>
                    <PowerStatusLabel active={this.state.active}>Total consumption</PowerStatusLabel>
                    <PowerStatusValue active={this.state.active}>{homeConsumptionStatus.total_consumption}</PowerStatusValue>
                    <PowerStatusUnit active={this.state.active}>{homeConsumptionStatus.unit}</PowerStatusUnit>
                </PowerStatusDiv>
                <StatusConsumptionLevelDiv>
                    <StatusConsumptionNoneDiv/>
                    <StatusConsumptionGridDivHeight/>
                    <StatusConsumptionPVDivDivHeight/>
                    <StatusConsumptionBatteryDivHeight/>
                </StatusConsumptionLevelDiv>
            </HomeConsumptionDiv>
        );
    }
}

HomeConsumptionStatus.defaultProps = {};

export default HomeConsumptionStatus;