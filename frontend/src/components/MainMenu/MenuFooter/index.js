import React from 'react';
import {Row} from "antd";
import {Footer, FooterText} from "./index.style";
import {Link} from "react-router-dom";

const MenuFooter = ({title, active, titleHeader, dataObj}) => {
  let location = dataObj.location;
  return (
    <Footer>
      <Row type="flex" justify="center">
        {
          title === 'Energy Balance' &&
          <Link to='/energy/balance'>
            <FooterText active={active}>{title}</FooterText>
          </Link>
        }
        {
          titleHeader === 'PV Energy' && <FooterText active={active}>{title}</FooterText>
        }
        {
          titleHeader === 'CO2 Avoided' && <FooterText active={active}>{title}</FooterText>
        }
        {
          title === 'Enlarge Map' && <a href={location}>Enlarge Map</a>
        }
      </Row>
    </Footer>
  )
}

export default MenuFooter;
