import React from 'react';
import { Col, Row } from "antd";
import { Text } from "../../../../styles/text.style";
import blankIcon from "../../../../asset/blank.png";

const WeatherFor = ({ weatherFor }) => {
    let icon
    if (!weatherFor.icon || weatherFor.icon.length === 0) {
        icon = blankIcon
    } else {
        //icon = `http://openweathermap.org/img/w/${weatherFor.icon}.png`
        icon = `/asset/w/w${weatherFor.icon}.png`
    }
    return (
        <Row type="flex" justify="center" gutter={8}>
            <Col>
                <Row type="flex" gutter={8}>
                    <img style={{ 'marginLeft': 'auto', 'marginRight': 'auto', 'width': '64px' }} src={icon} alt="icon"/>
                </Row>
                <Row type="flex" gutter={8}>
                    <Text style={{ 'marginLeft': 'auto', 'marginRight': 'auto' }}>{weatherFor.status}&#8451;</Text>
                </Row>
                <Row type="flex" gutter={8}>
                    <Text>{weatherFor.description}</Text>
                </Row>
            </Col>
        </Row>
    )
}

export default WeatherFor;
