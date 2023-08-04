import React, { Component } from 'react';
import {connect} from "react-redux";
import _ from 'lodash'
import {bindActionCreators} from "redux";
import {fetchData} from "../../../modules/CurrentStatus";
import {withTranslation} from "react-i18next";
import {setTabs} from "../../../modules/tabs";
import {setLastUpdate} from "../../../modules/datetime";
import CurrentStatusChild from "../CurrentStatus";
import Header from "../../../components/shared/Header";
import MainLayout from "../../../containers/MainLayout";
import { Row, Spin, Tabs} from "antd";

const {TabPane} = Tabs;

class CurrentStatus extends Component {

    onChangeTab = (key) => {
        this.props.setTabs(key)
    }

    async componentDidMount() {
        document.title = 'MJU Dashboard - วิทยาลัยพลังงานทดแทน';
        await this.props.fetchData(this.props.tabs, 1);
        let handleFnc = async () => {
            await this.props.fetchData(this.props.tabs, 1);
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
        const { isFirstLoading, dataObj, tabs } = this.props;
        return (
            <MainLayout>
                <Header prefix={'renewable'}/>
                <Row type="flex" justify="center">
                    <Spin spinning={isFirstLoading}>
                        { !isFirstLoading &&
                            <Tabs onChange={this.onChangeTab} type="card" defaultActiveKey={tabs}>
                                <TabPane tab="Totals" key="Totals">
                                    {
                                        tabs === 'Totals'
                                        && !_.isUndefined(dataObj)
                                        && <CurrentStatusChild dataObj={dataObj['Totals']}/>
                                    }
                                </TabPane>
                                <TabPane tab="Building A" key="Building A">
                                    {
                                        tabs === 'Building A'
                                        && !_.isUndefined(dataObj)
                                        && <CurrentStatusChild dataObj={dataObj['Building A']}/>
                                    }
                                </TabPane>
                                <TabPane tab="Building B" key="Building B">
                                    {
                                        tabs === 'Building B'
                                        && !_.isUndefined(dataObj)
                                        && <CurrentStatusChild dataObj={dataObj['Building B']}/>
                                    }
                                </TabPane>
                            </Tabs>
                        }
                    </Spin>
                </Row>
            </MainLayout>
        );
    }
}

const mapStateToProps = ( state ) => ({
    isFirstLoading: state.CurrentStatus.isFirstLoading,
    isLoading: state.CurrentStatus.isLoading,
    dataObj: state.CurrentStatus.dataObj,
    tabs: state.tabs.tabs
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
)(withTranslation()(CurrentStatus))
