import React from 'react';
import {Row} from "antd";
import {Content} from "./index.style";
import {MENU} from "../../../utils/menu";
import CurrentPvPower from "./CurrentPvPower";
import CurrentConsumption from "./CurrentConsumption";
import Location from "./Location";
import WeatherFor from "./WeatherFor";
import PvSystemInformation from "./PvSystemInformation";
import Co2Avoided from "./Co2Avoided";
import PvEnergy from "./PvEnergy";
import TemperatureMeasurement from "./TemperatureMeasurement";
import Irradiation from "./Irradiation";

const MenuContent = ({title, gridLineStatus, dataObj}) => {
  let temperature = {
    "temperatureMeasurement": dataObj.temperatureMeasurement,
    "ambientTemperature": dataObj.ambientTemperature
  };
  return (
    <Content>
      <Row type="flex" justify="center">
        {title === MENU.CURRENT_PV_POWER && <CurrentPvPower currentPvPower={dataObj.currentPvPower}/>}
        {title === MENU.CURRENT_CONSUMPTION &&
        <CurrentConsumption currentConsumption={dataObj.currentConsumption} gridLineStatus={gridLineStatus}/>}
        {title === MENU.IRRADIATION && <Irradiation totalIrradiation={dataObj.total_irradiation}/>}
        {/*{ title === MENU.INVERTER_COMPARISON_STATUS && <InverterComparisonStatus inverterComparisonStatus={dataObj.inverterComparisonStatus}/>}*/}
        {title === MENU.TEMPERATURE_MEASUREMENT && <TemperatureMeasurement temperature={temperature}/>}
        {title === MENU.PV_ENERGY && <PvEnergy pvEnergy={dataObj.pvEnergy}/>}
        {title === MENU.CO2_AVOIDED && <Co2Avoided co2Avoided={dataObj.co2Avoided}/>}
        {title === MENU.PV_SYSTEM_INFORMATION &&
        <PvSystemInformation pvSystemInformation={dataObj.pvSystemInformation}/>}
        {title === MENU.WEATHER_FOR && <WeatherFor weatherFor={dataObj.weatherFor}/>}
        {title === MENU.LOCATION && <Location location={dataObj.location}/>}
      </Row>
    </Content>
  )
}

export default MenuContent;
