import styled from "styled-components";

export const EnergyBalanceDiv = styled.div`
    padding: 40px;
    background-color: #fff;
`
export const RectDiv = styled.svg`
    display: inline-block;
    vertical-align: middle;
    margin-right: 4px;"
`
export const TooltipDiv = styled.div`
    font-size: 10px;
    background-color: white;
    padding: 15px;
    border: 1px solid;
`

export const TooltipTableTR = styled.tr`
    width: 150px;
`

export const IconPower = styled.div`
    width: 16px;
    height: 16px;
    margin: 5px;
    ${props => props.redGreen && `background: linear-gradient(135deg, #DE1E27 50%, #0D9839 50%);`}
    ${props => props.red && `background: #DE1E27;`}
    ${props => props.green && `background: #0D9839;`}
    ${props => props.greenYellow && `background: linear-gradient(135deg, #82ca9d 50%, #F1F949 50%);`}
    ${props => props.green50 && `background: #82ca9d;`}
    ${props => props.yellow && `background: #F1F949;`}
`