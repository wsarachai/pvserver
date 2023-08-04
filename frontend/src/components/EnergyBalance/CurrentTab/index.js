import React, { Component } from 'react';
import { Area, AreaChart, Brush, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import { Col, Row, Spin } from "antd";
import { fetchEnergyBalanceCurrent } from "../../../modules/EnergyBalance";
import { setLastUpdate } from "../../../modules/datetime";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { AxisLabel, renderLegend, renderTooltip } from "../../../utils/graphUtils";
import { StatusDiv } from "./index.style";
import { IconPower } from "../index.style";
import { GRAPH } from "../../../utils/constants";
import Unit from "../../Unit";

class CurrentTab extends Component {

    async componentDidMount() {
        await this.props.fetchEnergyBalanceCurrent(this.props.tabName, this.props.stationId);
        let handleFnc = async () => {
            await this.props.fetchEnergyBalanceCurrent(this.props.tabName, this.props.stationId);
            if (!this.props.isLoading) {
                await this.props.setLastUpdate(this.props.currentEnergyBalance.time);
            }
        };
        this.timeout = setInterval(handleFnc.bind(this), 5000);
    }

    componentWillUnmount() {
        clearInterval(this.timeout)
    }

    render() {
        const { isFirstLoading, currentEnergyBalance } = this.props;
        return (
            <Spin spinning={isFirstLoading}>
                <Row type="flex" justify="center">
                    <h4>Consumption</h4>
                </Row>
                <Row type="flex" justify="center">
                    <AreaChart
                        width={GRAPH.WIDTH}
                        height={GRAPH.HEIGHT}
                        data={currentEnergyBalance.consumptions}
                        margin={{
                            top: 0, right: 0, left: 0, bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name"
                               height={60}
                               angle={-45}
                               interval={0}
                               tick={{fontSize: GRAPH.TICK_FONT_SIZE}}
                               textAnchor="end"/>
                        <YAxis type="number"
                               tick={{fontSize: GRAPH.TICK_FONT_SIZE}}
                               domain={currentEnergyBalance.maxValue}
                               tickFormatter={(label)=>AxisLabel(label,'current')}/>
                        <Tooltip content={(data)=>renderTooltip('current', data, `Consumption`)} />
                        <Legend formatter={(name)=>renderLegend(name)} />
                        <Brush dataKey='name' height={20} stroke="#8884d8"/>
                        <Area type="monotone" dataKey="EES" stackId="1" stroke="#DE1E27" fill="#DE1E27" baseLine={8}/>
                        <Area type="monotone" dataKey="IPS" stackId="1" stroke="#0D9839" fill="#0D9839" />
                    </AreaChart>
                </Row>
                <Unit />
                <Row type="flex" justify="center">
                    <h4>Generation</h4>
                </Row>
                <Row type="flex" justify="center">
                    <AreaChart
                        width={GRAPH.WIDTH}
                        height={GRAPH.HEIGHT}
                        data={currentEnergyBalance.generations}
                        margin={{
                            top: 0, right: 0, left: 0, bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name"
                               height={60}
                               angle={-45}
                               interval={0}
                               tick={{fontSize: GRAPH.TICK_FONT_SIZE}}
                               textAnchor="end"/>
                        <YAxis type="number"
                               tick={{fontSize: GRAPH.TICK_FONT_SIZE}}
                               domain={currentEnergyBalance.maxValue}
                               tickFormatter={(label)=>AxisLabel(label,'current')} />
                        <Tooltip content={(data)=>renderTooltip('current', data, `Generation`)} />
                        <Legend formatter={(name)=>renderLegend(name)} />
                        <Brush dataKey='name' height={20} stroke="#8884d8"/>
                        <Area type="monotone" dataKey="SC" stroke="#82ca9d" fill="#82ca9d" stackId="2"/>
                        <Area type="monotone" dataKey="GFI" stroke="#F1F949" fill="#F1F949" stackId="2"/>
                    </AreaChart>
                </Row>
                <Row type="flex" justify="center">
                    <StatusDiv>
                        <Row type="flex" justify="center">
                            <Col span={4}>
                                <Row type="flex" gutter={8}>
                                    <Col sm={{ span: 4 }} md={{ span: 4 }} lg={{ span: 4 }}>
                                        <IconPower redGreen/>
                                    </Col>
                                    <Col sm={{ span: 22 }} md={{ span: 20 }} lg={{ span: 20 }}>
                                        <span style={{ fontSize : 12 }}>Current value of consumption</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={4}>
                                <Row type="flex" gutter={8}>
                                    <Col sm={{ span: 4 }} md={{ span: 4 }} lg={{ span: 4 }}>
                                        <IconPower red/>
                                    </Col>
                                    <Col sm={{ span: 22 }} md={{ span: 20 }} lg={{ span: 20 }}>
                                        <span style={{ fontSize : 12 }}>External energy supply</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={4}>
                                <Row type="flex" gutter={8}>
                                    <Col sm={{ span: 4 }} md={{ span: 4 }} lg={{ span: 4 }}>
                                        <IconPower green/>
                                    </Col>
                                    <Col sm={{ span: 22 }} md={{ span: 20 }} lg={{ span: 20 }}>
                                        <span style={{ fontSize : 12 }}>Internal energy supply</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={4}>
                                <Row type="flex" gutter={8}>
                                    <Col sm={{ span: 4 }} md={{ span: 4 }} lg={{ span: 4 }}>
                                        <IconPower greenYellow/>
                                    </Col>
                                    <Col sm={{ span: 22 }} md={{ span: 20 }} lg={{ span: 20 }}>
                                        <span style={{ fontSize : 12 }}>Current Power</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={4}>
                                <Row type="flex" gutter={8}>
                                    <Col sm={{ span: 4 }} md={{ span: 4 }} lg={{ span: 4 }}>
                                        <IconPower green50/>
                                    </Col>
                                    <Col sm={{ span: 22 }} md={{ span: 20 }} lg={{ span: 20 }}>
                                        <span style={{ fontSize : 12 }}>Self-consumption</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={4}>
                                <Row type="flex" gutter={8}>
                                    <Col sm={{ span: 4 }} md={{ span: 4 }} lg={{ span: 4 }}>
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
                                        <span style={{ fontSize : 12 }}>{(currentEnergyBalance.currentValueOfConsumption/1000).toFixed(2)} kW</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={4}>
                                <Row type="flex">
                                    <Col span={4}/>
                                    <Col span={20}>
                                        <span style={{ fontSize : 12 }}>{(currentEnergyBalance.externalEnergySupply/1000).toFixed(2)} kW</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={4}>
                                <Row type="flex">
                                    <Col span={4}/>
                                    <Col span={20}>
                                        <span style={{ fontSize : 12 }}>{(currentEnergyBalance.internalEnergySupply/1000).toFixed(2)} kW</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={4}>
                                <Row type="flex">
                                    <Col span={4}/>
                                    <Col span={20}>
                                        <span style={{ fontSize : 12 }}>{(currentEnergyBalance.currentPower/1000).toFixed(2)} kW</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={4}>
                                <Row type="flex">
                                    <Col span={4}/>
                                    <Col span={20}>
                                        <span style={{ fontSize : 12 }}>{(currentEnergyBalance.selfConsumption/1000).toFixed(2)} kW</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={4}>
                                <Row type="flex">
                                    <Col span={4}/>
                                    <Col span={20}>
                                        <span style={{ fontSize : 12 }}>{(currentEnergyBalance.gridFeedIn/1000).toFixed(2)} kW</span>
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
    isFirstLoading: state.EnergyBalance.currentEnergyBalance.isFirstLoading,
    currentEnergyBalance: state.EnergyBalance.currentEnergyBalance.dataObj
})

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            fetchEnergyBalanceCurrent,
            setLastUpdate
        },
        dispatch
    )

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withTranslation()(CurrentTab))