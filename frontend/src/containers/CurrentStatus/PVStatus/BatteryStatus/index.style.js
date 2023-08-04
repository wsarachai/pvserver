import styled from "styled-components";
import {Image} from "../index.style";

export const BatteryStatusDiv = styled.div`
    height: 105px;
    width: 325px;
    top: -11px;
    z-index: 2;
    position: relative;
    overflow: hidden;
`

export const BatteryStatusDivNone = styled(BatteryStatusDiv)`
    display: none;
`

export const BatteryStatusImage = styled(Image)`
    position: relative;
    z-index: 3;
`

export const BatteryStatusNoneImage = styled(BatteryStatusImage)`
    margin-top: 15px;
`

export const BatteryStatusChargingImage = styled(BatteryStatusImage)`
    margin-top: -94px;
`

export const BatteryStatusDischargingImage = styled(BatteryStatusImage)`
    margin-top: -218px;
`

export const BatteryIndicatorImage = styled(Image)`
    position: absolute;
    top: auto;
    left: 141px;
    bottom: 8px;
    z-index: 3;
`

export const BatteryDischargingIndicatorImage = styled(Image)`
    position: absolute;
    top: 16px;
    left: 155px;
    z-index: 2;
`

export const BatteryStatusTextDiv = styled.div`
    position: absolute;
    display: block;
    font-size: 10px;
    left: 12px;
    top: 26px;
    width: 120px;
    z-index: 3;
`

export const BatteryStatusPercentageDiv = styled(BatteryStatusTextDiv)`
    right: 12px;
    left: auto;
    text-align: right;
`

export const BatteryStatusSpan = styled.span`
    color: #FFF;
    display: inline-block;
    padding-bottom: 0;
    text-align: left;
`

export const BatteryStatusLabel = styled(BatteryStatusSpan)`
    font-size: 10px;
    font-weight: 800;
    min-height: 30px;
    width: 90px;
`

export const BatteryStatusValue = styled(BatteryStatusSpan)`
    font-size: 24px;
    font-weight: 500;
`

export const BatteryStatusUnit = styled(BatteryStatusSpan)`
    font-size: 12px;
    font-weight: 500;
`
