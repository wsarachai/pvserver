import React, {Component} from 'react';
import Header from "../../../components/shared/Header";
import MainLayout from "../../MainLayout";
import EnergyBalance from "../../../components/EnergyBalance";
import {Row} from "antd";

class YotsukEnergy extends Component {

  render() {
    return (
      <MainLayout>
        <Header prefix={'yotsuk'}/>
        <Row type="flex" justify="center">
          { <EnergyBalance tabs={"Totals"} stationId={3}/> }
        </Row>
      </MainLayout>
    );
  }
}

export default YotsukEnergy;
