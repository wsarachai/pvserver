import React, {Component} from "react";
import { DateTimeDiv } from "./index.style";
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import {setLastUpdate} from "../../../modules/datetime";
import {withTranslation} from "react-i18next";


class DateTime extends Component {
  render() {

    let { datetimeString } = this.props;

    return (
      <DateTimeDiv>
        <span>{datetimeString}</span>
      </DateTimeDiv>
    );
  };
}

const mapStateToProps = ( state ) => (
  {
    datetimeString: state.datetime.datetimeString
  })

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setLastUpdate
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(DateTime))