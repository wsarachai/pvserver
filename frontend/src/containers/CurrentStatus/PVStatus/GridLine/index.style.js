import styled from "styled-components";
import { Image, PowerStatusSpan } from "../index.style";

export const GridLineDiv = styled.div`
    font-size: 14px;
    height: 272px;
    width: 120px;
    position: relative;
    overflow: hidden;
    display: inline-block;
    margin-left: 10px;
`

export const ImageStatusDemand = styled(Image)`
    margin-left: -232px;
`

export const ImageStatusFeedIn = styled(Image)`
    margin-left: -114px;
`

export const ImageIndicatorFeedIn = styled(Image)`
    position: absolute;
    z-index: 1;
    left: 17px;
    top: 105px;
`

export const PowerStatusLabel = styled(PowerStatusSpan)`
    font-size: 14px;
    font-weight: 500;
    min-height: 30px;
    height: 36px;
    padding-left: 20px
`

export const PowerStatusValue = styled(PowerStatusSpan)`
    font-size: 22px;
    font-weight: 500;
    margin-top: 8px;
    padding-left: 20px
`

export const PowerStatusUnit = styled(PowerStatusSpan)`
    font-size: 12px;
    font-weight: 500;
    padding-left: 20px
`