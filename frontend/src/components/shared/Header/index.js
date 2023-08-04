import React, { Component } from 'react';
import { HeaderDiv } from "./index.style";
import { Link } from "react-router-dom";
import { Row , Col, Dropdown, Menu } from "antd";
import { MenuOutlined } from '@ant-design/icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { setTitleHeader } from '../../../modules/headers';

class Header extends Component {

  onClickMenu = (title) => {
    const { setTitleHeader } = this.props

    setTitleHeader(title)
  }

  render() {
    let prefix = this.props.prefix;

    const menuHeaderDropdown = (
      <Menu selectedKeys={[]} style={{ width: 150 }}>
        <Menu.Item key="currentStatus" onClick={() => this.onClickMenu("Current Status")}>
          <Link to={"/" + prefix}>Current Status</Link>
        </Menu.Item>
        <Menu.Item key="dashboard" onClick={() => this.onClickMenu("Dashboard")}>
          <Link to={"/" + prefix + "/dashboard"}>Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="energyBalance" onClick={() => this.onClickMenu("Energy Balance")}>
          <Link to={"/" + prefix + "/energy/balance"}>Energy Balance</Link>
        </Menu.Item>
      </Menu>
    );

    return (
      <HeaderDiv>
        <Row>
          <Col span={12}>
            <Row>
              <span style={{ fontSize: 24 }}>{this.props.titleHeader}</span>
            </Row>
          </Col>
          <Col span={12}>
            <Row justify="end">
              <Dropdown overlay={menuHeaderDropdown} trigger={['click']}>
                <MenuOutlined />
              </Dropdown>
            </Row>
          </Col>
        </Row>
      </HeaderDiv>
    );
  }
}

const mapStateToProps = ( state ) => ({
  titleHeader: state.headers.titleHeader
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setTitleHeader
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(Header))