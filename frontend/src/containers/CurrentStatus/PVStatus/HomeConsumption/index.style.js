import styled from "styled-components";
import {Image} from "../index.style";

export const HomeConsumptionDiv = styled.div`
    height: 272px;
    width: 105px;
    position: relative;
    overflow: hidden;
    display: inline-block;
`

export const ImageStatusGrid = styled(Image)`
    margin-left: -121px;
`

export const StatusConsumptionLevelDiv = styled.div`
    width: 105px;
    height: 254px;
    position: absolute;
    top: 0px;
    z-index: 1;
`

export const StatusConsumptionNoneDiv = styled(StatusConsumptionLevelDiv)`
    background-color: #a7a7a7;
    z-index: 2;
`

export const StatusConsumptionPVDiv = styled(StatusConsumptionLevelDiv)`
    background-color: #76b734;
    top: auto;
    bottom: 0px;
    z-index: 3;
`

export const StatusConsumptionGridDiv = styled(StatusConsumptionLevelDiv)`
    -webkit-box-shadow: 2px 1px 2px rgba(205, 58, 23, 0.5);
    -moz-box-shadow: 2px 1px 2px rgba(205, 58, 23, 0.5);
    box-shadow: 2px 1px 2px rgba(205, 58, 23, 0.5);
    background-color: #cd3a17;
    z-index: 4;
`

export const StatusConsumptionBatteryDiv = styled(StatusConsumptionLevelDiv)`
    -webkit-box-shadow: 2px -1px 2px rgba(61, 146, 23, 0.5);
    -moz-box-shadow: 2px -1px 2px rgba(61, 146, 23, 0.5);
    box-shadow: 2px -1px 2px rgba(61, 146, 23, 0.5);
    background-color: #568c40;
    top: auto;
    bottom: 0px;
    z-index: 5;
`

export const ImageIndicatorFeedIn = styled(Image)`
    position: absolute;
    z-index: 1;
    left: 12px;
    top: 105px;
`

export const ImageIndicatorFeedInHide = styled(ImageIndicatorFeedIn)`
    z-index: 1;
`

export const ImageIndicatorFeedInShow = styled(ImageIndicatorFeedIn)`
    z-index: 2;
`
