import React from 'react';
import { Col, Row} from "antd";
import { CurrentText, Text, UnitText } from "../../../../styles/text.style";
import IconEnergy from '../../../../asset/portalicon/icon_energy.png'
import ValueFormat from "../../../shared/ValueFormat/ValueFormat";
import UnitFormat from "../../../shared/ValueFormat/UnitFormat";

const PvEnergy = ({ pvEnergy }) => {

    return (
        <div>
            <Row type="flex" justify="center" gutter={8}>
                <Col>
                    <img src={IconEnergy} alt="IconEnergy"/>
                </Col>
                <Col>
                    <CurrentText>
                        <ValueFormat value={pvEnergy.energy.power} />
                    </CurrentText>
                    <UnitText>
                        <UnitFormat value={pvEnergy.energy.power} h={'h'} />
                    </UnitText><br/>
                    <Text>Today</Text>
                </Col>
            </Row>
        </div>
    )
}

export default PvEnergy;
