import React, { Component } from 'react';
import { Container, LayoutContent, LayoutFooter, Main } from "./index.style";
import LastUpdate from "../../components/shared/DateTime"
import {Col, Row} from "antd";
import VersionNumber from "../../components/shared/VersionNumber";

class MainLayout extends Component {
  render() {
    return (
      <Main>
          <Container>
              <LayoutContent>
                  {this.props.children}
              </LayoutContent>
          </Container>
        <LayoutFooter>
          <Row justify="center">
            <Col>
              <Row>&copy;2020 Maejo University, Chiang Mai, Thailand.</Row>
            </Col>
          </Row>
          <Row justify="center">
            <Col>
              <Row>
                <span style={{ fontSize: 12 }}>Last updated data:&nbsp;</span>
                <LastUpdate />
              </Row>
            </Col>
          </Row>
          <Row justify="center">
            <Col>
              <Row>
                <span style={{ fontSize: 12 }}><VersionNumber/></span>
              </Row>
            </Col>
          </Row>
        </LayoutFooter>
      </Main>
    );
  }
}

MainLayout.defaultProps = {};

export default MainLayout;
