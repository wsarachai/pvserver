import React from 'react';
import { Row , Typography} from "antd";
import { Header } from "./index.style";

const { Text } = Typography

const MenuHeader = ({ title }) => {
    return (
        <Header>
            <Row type="flex" justify="center">
                <Text>{title}</Text>
            </Row>
        </Header>
    )
}

export default MenuHeader;
