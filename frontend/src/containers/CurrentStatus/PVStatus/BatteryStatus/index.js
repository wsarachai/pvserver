import React, { Component } from 'react';
import {
    BatteryStatusDiv,
    BatteryStatusImage,
    BatteryStatusNoneImage,
    BatteryStatusChargingImage,
    BatteryStatusDischargingImage,
    BatteryIndicatorImage,
    BatteryDischargingIndicatorImage,
    BatteryStatusTextDiv,
    BatteryStatusLabel,
    BatteryStatusValue,
    BatteryStatusUnit,
    BatteryStatusPercentageDiv,
    BatteryStatusDivNone
} from "./index.style"
import batteryStatusImg from "../../../../asset/battery-status/sprite-battery.png"
import batteryDischargingImage from "../../../../asset/battery-status/indicator-bottom-top.gif"
import batteryLevel00 from "../../../../asset/battery-status/battery_icon_00.png"
import batteryLevel20 from "../../../../asset/battery-status/battery_icon_20.png"
import batteryLevel40 from "../../../../asset/battery-status/battery_icon_40.png"
import batteryLevel60 from "../../../../asset/battery-status/battery_icon_60.png"
import batteryLevel80 from "../../../../asset/battery-status/battery_icon_80.png"
import batteryLevel100 from "../../../../asset/battery-status/battery_icon_100.png"


const Status = {
    None: "none",
    Charging: "charging",
    Discharging: "discharging"
}

class BatteryStatus extends Component {

    render() {
        let currentBatteryState
        let rootDiv = BatteryStatusDiv

        const { batteryStatus } = this.props

        if (batteryStatus.status === Status.None) {
            rootDiv = BatteryStatusDivNone
            currentBatteryState = BatteryStatusNoneImage
        } else if (batteryStatus.status === Status.Charging) {
            currentBatteryState = BatteryStatusChargingImage
        } else {
            currentBatteryState = BatteryStatusDischargingImage
        }

        let batteryLevel
        if (batteryStatus.level === 0) {
            batteryLevel = batteryLevel00
        } else if (batteryStatus.level === 20) {
            batteryLevel = batteryLevel20
        } else if (batteryStatus.level === 40) {
            batteryLevel = batteryLevel40
        } else if (batteryStatus.level === 60) {
            batteryLevel = batteryLevel60
        } else if (batteryStatus.level === 80) {
            batteryLevel = batteryLevel80
        } else if (batteryStatus.level === 100) {
            batteryLevel = batteryLevel100
        }

        return (
            <BatteryStatusDiv as={rootDiv}>
                <BatteryStatusImage as={currentBatteryState} src={batteryStatusImg} />
                <BatteryStatusTextDiv>
                    <BatteryStatusLabel>Battery charging</BatteryStatusLabel>
                    <BatteryStatusValue>{batteryStatus.charging}</BatteryStatusValue>
                    <BatteryStatusUnit>{batteryStatus.unit}</BatteryStatusUnit>
                </BatteryStatusTextDiv>
                <BatteryStatusPercentageDiv>
                    <BatteryStatusLabel>Battery state of charge</BatteryStatusLabel>
                    <BatteryStatusValue>{batteryStatus.state_of_charging}</BatteryStatusValue>
                    <BatteryStatusUnit>{batteryStatus.unit}</BatteryStatusUnit>
                </BatteryStatusPercentageDiv>
                <BatteryIndicatorImage src={batteryLevel}/>
                <BatteryDischargingIndicatorImage src={batteryDischargingImage}/>
            </BatteryStatusDiv>
        )
    }
}

BatteryStatus.defaultProps = {};

export default BatteryStatus;
