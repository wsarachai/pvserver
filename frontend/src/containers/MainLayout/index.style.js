import styled from "styled-components";
import { Layout } from "antd";
const { Content , Footer } = Layout;

export const Main = styled.div`
    //background-color: #ccddf6;
    background-color: #fff;
    height: 100%;
    min-width: fit-content;
`

export const Container = styled.div`
    //height: 100vh;
    //height: 800px;
    //height: inherit;
`

export const LayoutContent = styled(Content)`
    //background-color: #fff;
    //margin: 5% 0;
    width: 100%;
    //height: 100vh;
    //min-height: 100vh;
    //overflow: auto;
`

export const LayoutFooter = styled(Footer)`
    text-align: center;
    //background-color: #8cc8ff;
    background-color: #fff;
    //position: fixed;
    //left: 0;
    //bottom: 0;
    width: 100%;
    margin-top: auto;
`