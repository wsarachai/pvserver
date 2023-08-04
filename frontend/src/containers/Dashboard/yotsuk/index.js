import React, {Component} from 'react';
import {DashboardDiv} from "../index.style";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {withTranslation} from "react-i18next";
import {fetchData} from "../../../modules/Dashboard";
import {setLastUpdate} from "../../../modules/datetime";
import DashboardTotal from "../dashboard";
import MainLayout from "../../MainLayout";
import {Spin} from "antd";
import Header from "../../../components/shared/Header";

class YotsukDashboard extends Component {

  async componentDidMount() {
    await this.props.fetchData(3);
    let handleFnc = async () => {
      await this.props.fetchData(3);
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
    const { isFirstLoading, dataObj } = this.props;

    this.items = (
      <Spin spinning={isFirstLoading}>
        <Header prefix={'yotsuk'}/>
        { !isFirstLoading && <DashboardTotal dataObj={dataObj['Totals']}/> }
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
      setLastUpdate
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(YotsukDashboard))
