import React, {Component} from 'react';
import {DashboardDiv} from "../index.style";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {setTabs} from "../../../modules/tabs";
import {withTranslation} from "react-i18next";
import {fetchData} from "../../../modules/Dashboard";
import {setLastUpdate} from "../../../modules/datetime";
import DashboardTotal from "../dashboard";
import MainLayout from "../../MainLayout";
import {Spin, Tabs} from "antd";
import Header from "../../../components/shared/Header";

const {TabPane} = Tabs;

class RenewableDashboard extends Component {

  state = {
    tabs: "Totals"
  }

  onChangeTab = (key) => {
    this.setState({
      tabs: key
    });
    this.props.fetchData(1);
  }

  async componentDidMount() {
    await this.props.fetchData(1);
    let handleFnc = async () => {
      await this.props.fetchData(1);
      let { isLoading, dataObj } = this.props;
      if (!isLoading) {
        await this.props.setLastUpdate(dataObj.time);
      }
    };
    this.timeout = setInterval(handleFnc.bind(this), 5000)
  }

  componentWillUnmount() {
    clearInterval(this.timeout)
  }

  render() {
    const { tabs } = this.state;
    const { isFirstLoading, dataObj } = this.props;
    this.items = (
      <Spin spinning={isFirstLoading}>
        <Header prefix={'renewable'}/>
        { !isFirstLoading &&
          <Tabs onChange={this.onChangeTab} type="card" defaultActiveKey={tabs}>
            <TabPane tab="Totals" key="Totals">
              {tabs === 'Totals' && <DashboardTotal dataObj={dataObj['Totals']}/>}
            </TabPane>
            <TabPane tab="Building A" key="Building A">
              {tabs === 'Building A' && <DashboardTotal dataObj={dataObj['Building A']}/>}
            </TabPane>
            <TabPane tab="Building B" key="Building B">
              {tabs === 'Building B' && <DashboardTotal dataObj={dataObj['Building B']}/>}
            </TabPane>
          </Tabs>
        }
      </Spin>
    );

    return (
      <MainLayout h65={true}>
        <DashboardDiv>
          {this.items}
        </DashboardDiv>
      </MainLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  isFirstLoading: state.Dashboard.isFirstLoading,
  isLoading: state.Dashboard.isLoading,
  dataObj: state.Dashboard.dataObj
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchData,
      setLastUpdate,
      setTabs
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(RenewableDashboard))
