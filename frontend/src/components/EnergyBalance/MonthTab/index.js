import React, { Component } from 'react';
import { connect } from "react-redux";
import { StatusDiv } from "../CurrentTab/index.style";
import { IconPower } from "../index.style";
import moment from "moment";
import { DATE, GRAPH } from "../../../utils/constants";
import { Col, DatePicker, Row, Spin } from "antd";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush
} from 'recharts';
import { bindActionCreators } from "redux";
import { fetchEnergyBalanceMonth } from "../../../modules/EnergyBalance";
import { setLastUpdate } from "../../../modules/datetime";
import { withTranslation } from "react-i18next";
import { AxisLabel, renderTooltip, renderLegend } from "../../../utils/graphUtils";
import Unit from "../../Unit";
import {formatDate} from "../../../utils/formatDate";

class MonthTab extends Component {
    state = {
        date: moment(new Date())
    }

    async componentDidMount() {
        let date = this.state.date;
        await this.props.fetchEnergyBalanceMonth(
          formatDate(date.toDate()),
          this.props.tabName,
          this.props.stationId
        );
        let handleFnc = async () => {
            let date = this.state.date;
            await this.props.fetchEnergyBalanceMonth(
              formatDate(date.toDate()),
              this.props.tabName,
              this.props.stationId
            );
            if (!this.props.isLoading) {
                await this.props.setLastUpdate(this.props.monthEnergyBalance.time);
            }
        };
        this.timeout = setInterval(handleFnc.bind(this), 5000);
    }

    componentWillUnmount() {
        clearInterval(this.timeout)
    }

    onChangeDate = ( date ) => {
        this.setState({
            date: date
        });
        this.props.fetchEnergyBalanceMonth(
          formatDate(date.toDate()),
          this.props.tabName,
          this.props.stationId
        );
        this.props.setLastUpdate(this.props.monthEnergyBalance.time);
    }

    render() {
        const { isFirstLoading, monthEnergyBalance } = this.props;
        return (
            <Spin spinning={isFirstLoading}>
                <Row type="flex" justify="center">
                    <h4>Consumption</h4>
                </Row>
                <Row type="flex" justify="center">
                    <BarChart
                        width={GRAPH.WIDTH}
                        height={GRAPH.HEIGHT}
                        data={monthEnergyBalance.consumptions}
                        margin={{
                            top: 20, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="5 5"/>
                        <XAxis dataKey="name"
                               interval={0}
                               tick={{ fontSize: GRAPH.TICK_FONT_SIZE }}/>
                        <YAxis type="number"
                               tick={{ fontSize: GRAPH.TICK_FONT_SIZE }}
                               domain={monthEnergyBalance.maxValue}
                               tickFormatter={( label ) => AxisLabel(label,'month')}/>
                        <Tooltip content={( data ) => renderTooltip('month', data, `Consumption`)}/>
                        <Legend formatter={( name ) => renderLegend(name)}/>
                        <Brush dataKey='name' height={20} stroke="#8884d8"/>
                        <Bar dataKey="EES" stackId="1" fill="#DE1E27"/>
                        <Bar dataKey="IPS" stackId="1" fill="#0D9839"/>
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
                        data={monthEnergyBalance.generations}
                        margin={{
                            top: 20, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="5 5"/>
                        <XAxis dataKey="name"
                               interval={0}
                               tick={{ fontSize: GRAPH.TICK_FONT_SIZE }}/>
                        <YAxis type="number"
                               tick={{ fontSize: GRAPH.TICK_FONT_SIZE }}
                               domain={monthEnergyBalance.maxValue}
                               tickFormatter={( label ) => AxisLabel(label,'month')}/>
                        <Tooltip content={( data ) => renderTooltip('month', data, `Generation`)}/>
                        <Legend formatter={( name ) => renderLegend(name)}/>
                        <Brush dataKey='name' height={20} stroke="#8884d8"/>
                        <Bar dataKey="SC" stackId="a" fill="#82ca9d"/>
                        <Bar dataKey="GFI" stackId="a" fill="#F1F949"/>
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
                                        <span style={{ fontSize: 12 }}>Monthly consumption</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={4}>
                                <Row type="flex" gutter={8}>
                                    <Col sm={{ span: 2 }} md={{ span: 4 }} lg={{ span: 4 }}>
                                        <IconPower red/>
                                    </Col>
                                    <Col sm={{ span: 22 }} md={{ span: 20 }} lg={{ span: 20 }}>
                                        <span style={{ fontSize: 12 }}>External energy supply</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={4}>
                                <Row type="flex" gutter={8}>
                                    <Col sm={{ span: 2 }} md={{ span: 4 }} lg={{ span: 4 }}>
                                        <IconPower green/>
                                    </Col>
                                    <Col sm={{ span: 22 }} md={{ span: 20 }} lg={{ span: 20 }}>
                                        <span style={{ fontSize: 12 }}>Internal energy supply</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={4}>
                                <Row type="flex" gutter={8}>
                                    <Col sm={{ span: 2 }} md={{ span: 4 }} lg={{ span: 4 }}>
                                        <IconPower greenYellow/>
                                    </Col>
                                    <Col sm={{ span: 22 }} md={{ span: 20 }} lg={{ span: 20 }}>
                                        <span style={{ fontSize: 12 }}>Monthly Yield</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={4}>
                                <Row type="flex" gutter={8}>
                                    <Col sm={{ span: 2 }} md={{ span: 4 }} lg={{ span: 4 }}>
                                        <IconPower green50/>
                                    </Col>
                                    <Col sm={{ span: 22 }} md={{ span: 20 }} lg={{ span: 20 }}>
                                        <span style={{ fontSize: 12 }}>Self-consumption</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={4}>
                                <Row type="flex" gutter={8}>
                                    <Col sm={{ span: 2 }} md={{ span: 4 }} lg={{ span: 4 }}>
                                        <IconPower yellow/>
                                    </Col>
                                    <Col sm={{ span: 22 }} md={{ span: 20 }} lg={{ span: 20 }}>
                                        <span style={{ fontSize: 12 }}>Grid feed-in</span>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row type="flex" justify="center" gutter={8}>
                            <Col span={4}>
                                <Row type="flex">
                                    <Col span={4}/>
                                    <Col span={20}>
                                        <span
                                            style={{ fontSize: 12 }}>{(monthEnergyBalance.monthly_value_of_consumption / 1000).toFixed(2)} kWh</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={4}>
                                <Row type="flex">
                                    <Col span={4}/>
                                    <Col span={20}>
                                        <span
                                            style={{ fontSize: 12 }}>{(monthEnergyBalance.external_energy_supply / 1000).toFixed(2)} kWh</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={4}>
                                <Row type="flex">
                                    <Col span={4}/>
                                    <Col span={20}>
                                        <span
                                            style={{ fontSize: 12 }}>{(monthEnergyBalance.internal_power_supply / 1000).toFixed(2)} kWh</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={4}>
                                <Row type="flex">
                                    <Col span={4}/>
                                    <Col span={20}>
                                        <span
                                            style={{ fontSize: 12 }}>{(monthEnergyBalance.monthly_yield / 1000).toFixed(2)} kWh</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={4}>
                                <Row type="flex">
                                    <Col span={4}/>
                                    <Col span={20}>
                                        <span
                                            style={{ fontSize: 12 }}>{(monthEnergyBalance.self_consumption / 1000).toFixed(2)} kWh</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={4}>
                                <Row type="flex">
                                    <Col span={4}/>
                                    <Col span={20}>
                                        <span
                                            style={{ fontSize: 12 }}>{(monthEnergyBalance.grid_feed_in / 1000).toFixed(2)} kWh</span>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </StatusDiv>
                </Row>
                <Row type="flex" justify="center" style={{ marginTop: 10 }}>
                    <DatePicker size="small"
                                picker="month"
                                onChange={this.onChangeDate}
                                defaultValue={moment(new Date(), DATE.formatDate)}
                    />
                </Row>
            </Spin>
        );
    }
}

const mapStateToProps = ( state ) => ({
    isLoading: state.EnergyBalance.isLoading,
    isFirstLoading: state.EnergyBalance.monthEnergyBalance.isFirstLoading,
    monthEnergyBalance: state.EnergyBalance.monthEnergyBalance.dataObj
})

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            fetchEnergyBalanceMonth,
            setLastUpdate
        },
        dispatch
    )

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withTranslation()(MonthTab))
