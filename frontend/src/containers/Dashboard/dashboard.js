import React, { Component } from 'react';
import { Col, Row } from "antd";
import MainMenu from "../../components/MainMenu";
import { MENU } from "../../utils/menu";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
//import homeJson from "../../utils/home.json";
import ValueFormat from "../../components/shared/ValueFormat/ValueFormat";
import UnitFormat from "../../components/shared/ValueFormat/UnitFormat";


class DashboardTotal extends Component {
  render() {
    let dataObj = this.props.dataObj;

    return (
      <div>
        <Row type="flex" justify="center">
          <Col span={8}>
            <MainMenu titleHeader="Current PV Power"
                      titleFooter="Energy Balance"
                      titleContent={MENU.CURRENT_PV_POWER}
                      dataObj={dataObj}
                      active={true}
            />
          </Col>
          <Col span={8}>
            <MainMenu titleHeader="Current Consumption"
                      titleFooter="Energy Balance"
                      titleContent={MENU.CURRENT_CONSUMPTION}
                      dataObj={dataObj}
                      gridLineStatus={dataObj}
                      active={true}
            />
          </Col>
          <Col span={8}>
            <MainMenu titleHeader="Irradiation"
                      titleFooter=""
                      titleContent={MENU.IRRADIATION}
                      dataObj={dataObj}
                      active={true}/>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span={8}>
            {/*<MainMenu titleHeader="Inverter Comparision Status"*/}
            {/*          titleFooter="PV System Monitoring"*/}
            {/*          titleContent={MENU.INVERTER_COMPARISON_STATUS}*/}
            {/*          dataObj={currentStatus}*/}
            {/*          active={true}*/}
            {/*/>*/}
            <MainMenu titleHeader="Temperature Measurement"
                      titleFooter=""
                      titleContent={MENU.TEMPERATURE_MEASUREMENT}
                      dataObj={dataObj}
                      active={true}
            />
          </Col>
          <Col span={8}>
            <MainMenu titleHeader="PV Energy"
                      titleFooter={
                        (
                          <span>
                            Total: <ValueFormat value={dataObj.pvEnergy.total.power} /> <UnitFormat value={dataObj.pvEnergy.total.power} h={'h'} />
                          </span>
                        )
                      }
                      titleContent={MENU.PV_ENERGY}
                      dataObj={dataObj}
                      active={false}
            />
          </Col>
          <Col span={8}>
            <MainMenu titleHeader="CO2 Avoided"
                      titleFooter={`Total: ${dataObj.co2Avoided.total.power} ${dataObj.co2Avoided.total.unit}`}
                      titleContent={MENU.CO2_AVOIDED}
                      dataObj={dataObj}
                      active={false}
            />
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span={8}>
            <MainMenu titleHeader="PV System Information"
                      titleFooter="PV System Profile"
                      titleContent={MENU.PV_SYSTEM_INFORMATION}
                      dataObj={dataObj}
                      active={true}
            />
          </Col>
          <Col span={8}>
            <MainMenu titleHeader={`Weather for - ${dataObj.weatherFor.station}`}
                      titleFooter="Tomorrow"
                      titleContent={MENU.WEATHER_FOR}
                      dataObj={dataObj}
                      active={true}
            />
          </Col>
          <Col span={8}>
            <MainMenu titleHeader="Location"
                      titleFooter="Enlarge Map"
                      titleContent={MENU.LOCATION}
                      dataObj={dataObj}
                      active={true}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ( state ) => ({

})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {

    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(DashboardTotal))
