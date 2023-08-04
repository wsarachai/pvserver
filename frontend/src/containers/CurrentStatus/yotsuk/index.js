import React, { Component } from 'react';
import {connect} from "react-redux";
import {setTabs} from "../../../modules/tabs";
import {bindActionCreators} from "redux";
import {fetchData} from "../../../modules/CurrentStatus";
import {setLastUpdate} from "../../../modules/datetime";
import {withTranslation} from "react-i18next";
import MainLayout from "../../MainLayout";
import { Row, Spin } from "antd";
import CurrentStatusChild from "../CurrentStatus";
import Header from "../../../components/shared/Header";

const fixedTabName = "Totals";

class CurrentStatus extends Component {

    async componentDidMount() {
        document.title = 'MJU Dashboard - อาคารอำนวยยศสุข';
        await this.props.fetchData(fixedTabName, 3);
        let handleFnc = async () => {
            await this.props.fetchData(fixedTabName, 3);
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

        return (
            <MainLayout>
                <Header prefix={'yotsuk'}/>
                <Row type="flex" justify="center">
                    <Spin spinning={isFirstLoading}>
                        {
                            !isFirstLoading && <CurrentStatusChild dataObj={dataObj['Totals']}/>
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
    dataObj: state.CurrentStatus.dataObj
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
