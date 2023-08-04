import React from 'react';
import { Col, Row } from "antd";
import { CurrentText, UnitText } from "../../../../styles/text.style";
import Grid from '../../../../asset/portalicon/grid.png'
import PvGrid from '../../../../asset/portalicon/pv_grid.png'
import Pv from '../../../../asset/portalicon/pv.png'
import ValueFormat from "../../../shared/ValueFormat/ValueFormat";
import UnitFormat from "../../../shared/ValueFormat/UnitFormat";

const CurrentConsumption = ({ currentConsumption , gridLineStatus }) => {
    function renderIconPv(){
        if(currentConsumption.status === "pvGrid"){
            return <img src={PvGrid} alt="" />
        } else if(currentConsumption.status === "pv") {
            return <img src={Pv} alt="" />
        } else if(currentConsumption.status === "grid") {
            return <img src={Grid} alt="" />
        }
    }

    return (
        <Row type="flex" justify="center" gutter={8}>
            <Col>
                {
                    renderIconPv()
                }
            </Col>
            <Col>
                <CurrentText><ValueFormat value={currentConsumption.consumption}/></CurrentText>
                <UnitText><UnitFormat value={currentConsumption.consumption}/></UnitText>
            </Col>
        </Row>
    )
}

export default CurrentConsumption;