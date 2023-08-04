import React, { Component } from 'react';
import { Col, DatePicker, Row, Spin } from "antd";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import {bindActionCreators} from "redux";
import {fetchEnergyBalanceYear} from "../../../modules/EnergyBalance";
import { setLastUpdate } from "../../../modules/datetime";
import {connect} from "react-redux";
import {withTranslation} from "react-i18next";
import {AxisLabel, renderLegend, renderTooltip} from "../../../utils/graphUtils";
import { StatusDiv } from "../CurrentTab/index.style";
import { IconPower } from "../index.style";
import moment from "moment";
import { GRAPH } from "../../../utils/constants";
import Unit from "../../Unit";

class YearTab extends Component {
    state = {
        year: moment(new Date())
    }

    async componentDidMount() {
        let { year } = this.state;
        await this.props.fetchEnergyBalanceYear(
          year.toDate(),
          this.props.tabName,
          this.props.stationId);
        let handleFnc = async () => {
            await this.props.fetchEnergyBalanceYear(
              year.toDate(),
              this.props.tabName,
              this.props.stationId);
            if (!this.props.isLoading) {
                await this.props.setLastUpdate(this.props.yearEnergyBalance.time);
            }
        };
        this.timeout = setInterval(handleFnc.bind(this), 150000)
    }

    componentWillUnmount() {
        clearInterval(this.timeout)
    }

    onChangeYear = (date) => {
        this.props.fetchEnergyBalanceYear(
          date.toDate(),
          this.props.tabName,
          this.props.stationId);
        this.props.setLastUpdate(this.props.yearEnergyBalance.time);
    }

    render() {
        const { isFirstLoading, yearEnergyBalance } = this.props;
        return (
            <Spin spinning={isFirstLoading}>
                <Row type="flex" justify="center">
                    <h4>Consumption</h4>
                </Row>
                <Row type="flex" justify="center">
                    <BarChart
                        width={GRAPH.WIDTH}
                        height={GRAPH.HEIGHT}
                        data={yearEnergyBalance.consumptions}
                        margin={{
                            top: 20, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name"
                               tick={{fontSize: GRAPH.TICK_FONT_SIZE}}/>
                        <YAxis type="number"
                               tick={{fontSize: GRAPH.TICK_FONT_SIZE}}
                               domain={yearEnergyBalance.maxValue}
                               tickFormatter={(label)=>AxisLabel(label,'year')} />
                        <Tooltip content={(data)=>renderTooltip('year', data, `Consumption`)} />
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
                        data={yearEnergyBalance.generations}
                        margin={{
                            top: 20, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name"
                               tick={{fontSize: GRAPH.TICK_FONT_SIZE}}/>
                        <YAxis type="number"
                               tick={{fontSize: GRAPH.TICK_FONT_SIZE}}
                               domain={yearEnergyBalance.maxValue}
                               tickFormatter={(label)=>AxisLabel(label,'year')} />
                        <Tooltip content={(data)=>renderTooltip('year', data, `Generation`)} />
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
                                        <span style={{ fontSize : 12 }}>Yearly consumption</span>
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
                                        <span style={{ fontSize : 12 }}>Annual Yield</span>
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
                                        <span style={{ fontSize : 12 }}>{yearEnergyBalance.yearlyValueOfConsumption} MWh</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={4}>
                                <Row type="flex">
                                    <Col span={4}/>
                                    <Col span={20}>
                                        <span style={{ fontSize : 12 }}>{yearEnergyBalance.externalEnergySupply} MWh</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={4}>
                                <Row type="flex">
                                    <Col span={4}/>
                                    <Col span={20}>
                                        <span style={{ fontSize : 12 }}>{yearEnergyBalance.internalEnergySupply} MWh</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={4}>
                                <Row type="flex">
                                    <Col span={4}/>
                                    <Col span={20}>
                                        <span style={{ fontSize : 12 }}>{yearEnergyBalance.annual_yield} MWh</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={4}>
                                <Row type="flex">
                                    <Col span={4}/>
                                    <Col span={20}>
                                        <span style={{ fontSize : 12 }}>{yearEnergyBalance.selfConsumption} MWh</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={4}>
                                <Row type="flex">
                                    <Col span={4}/>
                                    <Col span={20}>
                                        <span style={{ fontSize : 12 }}>{yearEnergyBalance.gridFeedIn} MWh</span>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </StatusDiv>
                </Row>
                <Row type="flex" justify="center" style={{ marginTop: 10 }}>
                    <DatePicker size="small"
                                picker="year"
                                onChange={this.onChangeYear}
                                defaultValue={moment(new Date(), 'YYYY')}
                    />
                </Row>
            </Spin>
        );
    }
}

const mapStateToProps = ( state ) => ({
    isLoading: state.EnergyBalance.isLoading,
    isFirstLoading: state.EnergyBalance.yearEnergyBalance.isFirstLoading,
    yearEnergyBalance: state.EnergyBalance.yearEnergyBalance.dataObj
})

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            fetchEnergyBalanceYear,
            setLastUpdate
        },
        dispatch
    )

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withTranslation()(YearTab))
