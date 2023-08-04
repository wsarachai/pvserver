import React, {Component} from 'react';
import {connect} from "react-redux";
import {Tabs} from "antd";
import {bindActionCreators} from "redux";
import {setTabs} from "../../../modules/tabs";
import {withTranslation} from "react-i18next";
import Header from "../../../components/shared/Header";
import MainLayout from "../../MainLayout";
import EnergyBalance from "../../../components/EnergyBalance";
import {Row} from "antd";

const {TabPane} = Tabs;

class Energy extends Component {

  onChangeTab = (key) => {
    this.props.setTabs(key)
  }

  render() {
    const tabs = this.props.tabs;
    return (
      <MainLayout>
        <Header prefix={'renewable'}/>
        <Row type="flex" justify="center">
          <Tabs onChange={this.onChangeTab} type="card" defaultActiveKey={tabs}>
            <TabPane tab="Totals" key="Totals">
              {tabs === 'Totals' && <EnergyBalance tabs={"Totals"} stationId={1}/>}
            </TabPane>
            <TabPane tab="Building A" key="Building A">
              {tabs === 'Building A' && <EnergyBalance tabs={"Building A"} stationId={1}/>}
            </TabPane>
            <TabPane tab="Building B" key="Building B">
              {tabs === 'Building B' && <EnergyBalance tabs={"Building B"} stationId={1}/>}
            </TabPane>
          </Tabs>
        </Row>
      </MainLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  tabs: state.tabs.tabs
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setTabs
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(Energy))
