import React from 'react';
import { Row } from "antd";
import MenuHeader from "./MenuHeader";
import { MainMenuDiv } from "./index.style";
import MenuFooter from "./MenuFooter";
import MenuContent from "./MenuContent";

const MainMenu = ( { titleHeader, titleFooter, titleContent, dataObj, gridLineStatus, active } ) => {
    return (
        <Row type="flex" justify="center">
            <MainMenuDiv>
                <MenuHeader title={titleHeader}/>
                <MenuContent title={titleContent} gridLineStatus={gridLineStatus} dataObj={dataObj} />
                <MenuFooter title={titleFooter} active={active} titleHeader={titleHeader} dataObj={dataObj} />
            </MainMenuDiv>
        </Row>
    )
}

export default MainMenu;