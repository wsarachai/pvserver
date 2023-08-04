import React, { Component } from 'react';
import { Col, Row, Spin } from "antd";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import {bindActionCreators} from "redux";
import {fetchEnergyBalanceTotal} from "../../../modules/EnergyBalance";
import {connect} from "react-redux";
import {withTranslation} from "react-i18next";
import {AxisLabel, renderLegend, renderTooltip} from "../../../utils/graphUtils";
import { StatusDiv } from "../CurrentTab/index.style";
import { IconPower } from "../index.style";
import { GRAPH } from "../../../utils/constants";
import moment from "moment"
import Unit from "../../Unit";
import {setLastUpdate} from "../../../modules/datetime";

class TotalTab extends Component {

    async componentDidMount() {
        await this.props.setLastUpdate(moment(new Date()).format('HH:mm:ss'));
        await this.props.fetchEnergyBalanceTotal(
          this.props.tabName,
          this.props.stationId
        )
        this.timeout = setInterval(async () => {
            await this.props.fetchEnergyBalanceTotal(
              this.props.tabName,
              this.props.stationId
            )
        }, 150000)
    }

    componentWillUnmount() {
        clearInterval(this.timeout)
    }

    render() {
        const { isFirstLoading, totalEnergyBalance } = this.props;
        return (
            <Spin spinning={isFirstLoading}>
                <Row type="flex" justify="center">
                    <h4>Consumption</h4>
                </Row>
                <Row type="flex" justify="center">
                    <BarChart
                        width={GRAPH.WIDTH}
                        height={GRAPH.HEIGHT}
                        data={totalEnergyBalance.consumptions}
                        margin={{
                            top: 20, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name"
                               tick={{fontSize: GRAPH.TICK_FONT_SIZE}}/>
                        <YAxis type="number"
                               tick={{fontSize: GRAPH.TICK_FONT_SIZE}}
                               domain={totalEnergyBalance.maxValue}
                               tickFormatter={(label)=>AxisLabel(label,'total')}/>
                        <Tooltip content={(data)=>renderTooltip('total', data, `Consumption`)} />
                        <Legend formatter={(name)=>renderLegend(name)} />
                        <Bar dataKey="EES" stackId="a" fill="#DE1E27" />
                        <Bar dataKey="IPS" stackId="a" fill="#0D9839" />
                    </BarChart>
                </Row>
                <Unit />
                <Row type="flex" justify="center">
                    <h4>Generation</h4>
                </Row>
                <Row type="flex" justify="center">
                    <BarChart
                        width={GRAPH.WIDTH}
                        height={GRAPH.HEIGHT}
                        data={totalEnergyBalance.generations}
                        margin={{
                            top: 20, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name"
                               tick={{fontSize: GRAPH.TICK_FONT_SIZE}}/>
                        <YAxis type="number"
                               tick={{fontSize: GRAPH.TICK_FONT_SIZE}}
                               domain={totalEnergyBalance.maxValue}
                               tickFormatter={(label)=>AxisLabel(label,'total')}/>
                        <Tooltip content={(data)=>renderTooltip('total', data, `Generation`)} />
                        <Legend formatter={(name)=>renderLegend(name)} />
                        <Bar dataKey="SC" stackId="a" fill="#82ca9d" />
                        <Bar dataKey="GFI" stackId="a" fill="#F1F949" />
                    </BarChart>
                </Row>
                <Row type="flex" justify="center">
                    <StatusDiv>
                        <Row type="flex" justify="center">
                            <Col span={4}>
                                <Row type="flex" gutter={8}>
                                    <Col sm={{ span: 2 }} md={{ span: 4 }} lg={{ span: 4 }}>
                                        <IconPower redGreen/>
                                    </Col>
                                    <Col sm={{ span: 22 }} md={{ span: 20 }} lg={{ span: 20 }}>
                                        <span style={{ fontSize : 12 }}>Total consumption</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={4}>
                                <Row type="flex" gutter={8}>
                                    <Col sm={{ span: 2 }} md={{ span: 4 }} lg={{ span: 4 }}>
                                        <IconPower red/>
                                    </Col>
                                    <Col sm={{ span: 22 }} md={{ span: 20 }} lg={{ span: 20 }}>
                                        <span style={{ fontSize : 12 }}>External energy supply</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={4}>
                                <Row type="flex" gutter={8}>
                                    <Col sm={{ span: 2 }} md={{ span: 4 }} lg={{ span: 4 }}>
                                        <IconPower green/>
                                    </Col>
                                    <Col sm={{ span: 22 }} md={{ span: 20 }} lg={{ span: 20 }}>
                                        <span style={{ fontSize : 12 }}>Internal energy supply</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={4}>
                                <Row type="flex" gutter={8}>
                                    <Col sm={{ span: 2 }} md={{ span: 4 }} lg={{ span: 4 }}>
                                        <IconPower greenYellow/>
                                    </Col>
                                    <Col sm={{ span: 22 }} md={{ span: 20 }} lg={{ span: 20 }}>
                                        <span style={{ fontSize : 12 }}>Total Yield</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={4}>
                                <Row type="flex" gutter={8}>
                                    <Col sm={{ span: 2 }} md={{ span: 4 }} lg={{ span: 4 }}>
                                        <IconPower green50/>
                                    </Col>
                                    <Col sm={{ span: 22 }} md={{ span: 20 }} lg={{ span: 20 }}>
                                        <span style={{ fontSize : 12 }}>Self-consumption</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={4}>
                                <Row type="flex" gutter={8}>
                                    <Col sm={{ span: 2 }} md={{ span: 4 }} lg={{ span: 4 }}>
                                        <IconPower yellow/>
                                    </Col>
                                    <Col sm={{ span: 22 }} md={{ span: 20 }} lg={{ span: 20 }}>
                                        <span style={{ fontSize : 12 }}>Grid feed-in</span>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row type="flex" justify="center" gutter={8}>
                            <Col span={4}>
                                <Row type="flex">
                                    <Col span={4}/>
                                    <Col span={20}>
                                        <span style={{ fontSize : 12 }}>{totalEnergyBalance.totalValueOfConsumption} MWh</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={4}>
                                <Row type="flex">
                                    <Col span={4}/>
                                    <Col span={20}>
                                        <span style={{ fontSize : 12 }}>{totalEnergyBalance.externalEnergySupply} MWh</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={4}>
                                <Row type="flex">
                                    <Col span={4}/>
                                    <Col span={20}>
                                        <span style={{ fontSize : 12 }}>{totalEnergyBalance.internalEnergySupply} MWh</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={4}>
                                <Row type="flex">
                                    <Col span={4}/>
                                    <Col span={20}>
                                        <span style={{ fontSize : 12 }}>{totalEnergyBalance.total_yield} MWh</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={4}>
                                <Row type="flex">
                                    <Col span={4}/>
                                    <Col span={20}>
                                        <span style={{ fontSize : 12 }}>{totalEnergyBalance.selfConsumption} MWh</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={4}>
                                <Row type="flex">
                                    <Col span={4}/>
                                    <Col span={20}>
                                        <span style={{ fontSize : 12 }}>{totalEnergyBalance.gridFeedIn} MWh</span>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </StatusDiv>
                </Row>
            </Spin>
        );
    }
}

const mapStateToProps = ( state ) => ({
    isLoading: state.EnergyBalance.isLoading,
    isFirstLoading: state.EnergyBalance.totalEnergyBalance.isFirstLoading,
    totalEnergyBalance: state.EnergyBalance.totalEnergyBalance.dataObj
})

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            fetchEnergyBalanceTotal,
            setLastUpdate
        },
        dispatch
    )

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withTranslation()(TotalTab))
