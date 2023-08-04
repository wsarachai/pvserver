import styled from "styled-components";

export const PVStatusDiv = styled.div`
    position: relative;
`

export const Image = styled.img`
    position: relative;
    z-index: 5;
`

export const PowerStatusTextDiv = styled.div`
    position: absolute;
    top: 146px;
    width: 97px;
    z-index: 5;
`

export const PowerStatusTextDivOnDemand = styled(PowerStatusTextDiv)`
    left: 3px;
`

export const PowerStatusTextFeedInDiv = styled(PowerStatusTextDiv)`
    left: -10px;
`

export const PowerStatusSpan = styled.span`
    color: #FFF;
    display: block;
    padding-bottom: 0;
    text-align: center;
`

export const PowerStatusLabel = styled(PowerStatusSpan)`
    font-size: 14px;
    font-weight: 500;
    min-height: 30px;
`

export const PowerStatusValue = styled(PowerStatusSpan)`
    font-size: 22px;
    font-weight: 500;
`

export const PowerStatusUnit = styled(PowerStatusSpan)`
    font-size: 16px;
    font-weight: 500;
`