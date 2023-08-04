import styled from "styled-components";
import { Image } from "../index.style"

export const PVFeedInDiv = styled.div`
    height: 272px;
    width: 105px;
    position: relative;
    overflow: hidden;
    display: inline-block;
`

export const ImageStatusHome = styled(Image)`
    margin-left: -116px;
`

export const ImageStatusBattery = styled(Image)`
    margin-left: -245px;
`

export const ImageStatusHomeBattery = styled(Image)`
    margin-left: -373px;
`

export const ImageIndicatorFeedIn = styled(Image)`
    position: absolute;
    z-index: 1;
    left: 7px;
    top: 105px;
`

export const ImageIndicatorBattery = styled(Image)`
    position: absolute;
    z-index: 1;
    left: 39px;
    top: 170px;
`
