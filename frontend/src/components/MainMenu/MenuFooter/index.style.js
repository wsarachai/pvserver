import styled from "styled-components";
import { Layout } from "antd";

export const Footer = styled(Layout.Footer)`
    padding: 0 !important;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    background: #fff !important;
    height: 15% !important;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
`

export const FooterText = styled.span`
    font-size: 16px;
    cursor: pointer;
    
    ${props => props.active ? 'color: #46a6ff' : 'color: grey'}
`