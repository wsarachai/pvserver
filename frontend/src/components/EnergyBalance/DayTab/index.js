import React, { Component } from 'react';
import {connect} from "react-redux";
import { IconPower } from "../index.style";
import { StatusDiv } from "../CurrentTab/index.style";
import moment from "moment";
import { DATE, GRAPH } from "../../../utils/constants";
import { Col, DatePicker, Row, Spin } from "antd";
import { Area, AreaChart, Brush, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import {bindActionCreators} from "redux";
import {fetchEnergyBalanceDay} from "../../../modules/EnergyBalance";
import { setLastUpdate } from "../../../modules/datetime";
import {withTranslation} from "react-i18next";
import {AxisLabel, renderLegend, renderTooltip} from "../../../utils/graphUtils";
import Unit from "../../Unit";
import {formatDate} from "../../../utils/formatDate";


class DayTab extends Component {
    state = {
        date: moment(new Date()),
        isLoading: true,
    }

    async componentDidMount() {
        let { date } = this.state;
        await this.props.fetchEnergyBalanceDay(
          formatDate(date.toDate()),
          this.props.tabName,
          this.props.stationId);
        let handleFnc = async () => {
            let { date } = this.state;
            await this.props.fetchEnergyBalanceDay(
              formatDate(date.toDate()),
              this.props.tabName,
              this.props.stationId);
            let { isLoading, dayEnergyBalance } = this.props;
            if (!isLoading) {
                await this.setState({
                    isLoading: false
                });
                this.props.setLastUpdate(dayEnergyBalance.time);
            }
        };
        this.timeout = setInterval(handleFnc.bind(this), 5000);
    }

    componentWillUnmount() {
        clearInterval(this.timeout);
    }

    onChangeDate = (date , dateString) => {
        this.setState({
            date: date
        });
        this.props.fetchEnergyBalanceDay(
          formatDate(date),
          this.props.tabName,
          this.props.stationId);
    }

    render() {
        const { isFirstLoading, dayEnergyBalance } = this.props;
        return (
            <Spin spinning={isFirstLoading}>
                <Row type="flex" justify="center">
                    <h4>Consumption</h4>
                </Row>
                <Row type="flex" justify="center">
                    <AreaChart
                        width={GRAPH.WIDTH}
                        height={GRAPH.HEIGHT}
                        data={dayEnergyBalance.consumptions}
                        margin={{
                            top: 0, right: 10, left: 0, bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name"
                               interval={7}
                               tick={{fontSize: GRAPH.TICK_FONT_SIZE}}
                               textAnchor="end"
                               height={60}
                               angle={-45}
                        />
                        <YAxis type="number"
                               tick={{fontSize: GRAPH.TICK_FONT_SIZE}}
                               domain={dayEnergyBalance.maxValue}
                               tickFormatter={(label)=>AxisLabel(label,'day')} />
                        <Tooltip content={(data)=> renderTooltip('day', data, `Consumption`)} />
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
                        data={dayEnergyBalance.generations}
                        margin={{
                            top: 0, right: 10, left: 0, bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name"
                               interval={7}
                               tick={{fontSize: GRAPH.TICK_FONT_SIZE}}
                               textAnchor="end"
                               height={60}
                               angle={-45}
                        />
                        <YAxis type="number"
                               tick={{fontSize: GRAPH.TICK_FONT_SIZE}}
                               domain={dayEnergyBalance.maxValue}
                               tickFormatter={(label)=>AxisLabel(label,'day')}/>
                        <Tooltip content={(data)=>renderTooltip('day', data, `Generation`)} />
                        <Legend formatter={(name)=>renderLegend(name)} />
                        <Brush dataKey='name' height={20} stroke="#8884d8"/>
                        <Area type="monotone" dataKey="SC" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
                        <Area type="monotone" dataKey="GFI" stackId="2" stroke="#F1F949" fill="#F1F949" />
                    </AreaChart>
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
                                        <span style={{ fontSize : 12 }}>Daily consumption</span>
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
                                        <span style={{ fontSize : 12 }}>Daily Yield</span>
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
                                        <span style={{ fontSize : 12 }}>{(dayEnergyBalance.hourlyValueOfConsumption/1000).toFixed(2)} kWh</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={4}>
                                <Row type="flex">
                                    <Col span={4}/>
                                    <Col span={20}>
                                        <span style={{ fontSize : 12 }}>{(dayEnergyBalance.externalEnergySupply/1000).toFixed(2)} kWh</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={4}>
                                <Row type="flex">
                                    <Col span={4}/>
                                    <Col span={20}>
                                        <span style={{ fontSize : 12 }}>{(dayEnergyBalance.internalEnergySupply/1000).toFixed(2)} kWh</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={4}>
                                <Row type="flex">
                                    <Col span={4}/>
                                    <Col span={20}>
                                        <span style={{ fontSize : 12 }}>{(dayEnergyBalance.hourly_yield/1000).toFixed(2)} kWh</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={4}>
                                <Row type="flex">
                                    <Col span={4}/>
                                    <Col span={20}>
                                        <span style={{ fontSize : 12 }}>{(dayEnergyBalance.selfConsumption/1000).toFixed(2)} kWh</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={4}>
                                <Row type="flex">
                                    <Col span={4}/>
                                    <Col span={20}>
                                        <span style={{ fontSize : 12 }}>{(dayEnergyBalance.gridFeedIn/1000).toFixed(2)} kWh</span>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </StatusDiv>
                </Row>
                <Row type="flex" justify="center" style={{ marginTop: 10 }}>
                    <DatePicker size="small"
                                defaultValue={moment(new Date() , DATE.formatDate)}
                                onChange={this.onChangeDate}

                    />
                </Row>
            </Spin>
        );
    }
}

const mapStateToProps = ( state ) => ({
    isLoading: state.EnergyBalance.isLoading,
    isFirstLoading: state.EnergyBalance.dayEnergyBalance.isFirstLoading,
    dayEnergyBalance: state.EnergyBalance.dayEnergyBalance.dataObj
})

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            fetchEnergyBalanceDay,
            setLastUpdate
        },
        dispatch
    )

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withTranslation()(DayTab))
