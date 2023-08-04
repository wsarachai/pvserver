import React, { Component } from 'react';
import {connect} from "react-redux";
import { Tabs } from "antd";
import { EnergyBalanceDiv } from "./index.style";
import CurrentTab from "./CurrentTab";
import DayTab from "./DayTab";
import MonthTab from "./MonthTab";
import YearTab from "./YearTab";
import TotalTab from "./TotalTab";
import {bindActionCreators} from "redux";
import {setChildTabs} from "../../modules/tabs";
import {withTranslation} from "react-i18next";


const { TabPane } = Tabs;

class EnergyBalance extends Component {
    onChangeTab = ( key ) => {
        this.props.setChildTabs(key);
    }

    render() {
        const { tabs, child_tabs, stationId } = this.props
        return (
            <EnergyBalanceDiv>
                <Tabs onChange={this.onChangeTab} type="card" defaultActiveKey={child_tabs}>
                    <TabPane tab="Current" key="1">
                        { child_tabs === '1' && <CurrentTab tabName={tabs} stationId={stationId}/>}
                    </TabPane>
                    <TabPane tab="Day" key="2">
                        { child_tabs === '2' && <DayTab  tabName={tabs} stationId={stationId}/>}
                    </TabPane>
                    <TabPane tab="Month" key="3">
                        { child_tabs === '3' && <MonthTab  tabName={tabs} stationId={stationId}/> }
                    </TabPane>
                    <TabPane tab="Year" key="4">
                        { child_tabs === '4' && <YearTab  tabName={tabs} stationId={stationId}/> }
                    </TabPane>
                    <TabPane tab="Total" key="5">
                        { child_tabs === '5' && <TotalTab  tabName={tabs} stationId={stationId}/> }
                    </TabPane>
                </Tabs>
            </EnergyBalanceDiv>
        );
    }
}

const mapStateToProps = (state) => ({
    tabs: state.tabs.tabs,
    child_tabs: state.tabs.child_tabs
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
        setChildTabs
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(EnergyBalance))
