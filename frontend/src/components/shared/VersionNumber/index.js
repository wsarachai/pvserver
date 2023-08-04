import React, {Component} from "react";
import {VersionNumberDiv} from "./index.style";
import moment from 'moment';
import packageJson from '../../../../package.json';
import preval from 'preval.macro';

const buildTimestamp = preval`module.exports = new Date().getTime();`;

class VersionNumber extends Component {

  getDateString = () => {
    const lastUpdateMoment = moment.unix(buildTimestamp / 1000);
    return lastUpdateMoment.format('DD.MM.YYYY HH:mm:ss');
  };

  render() {
    return (
      <VersionNumberDiv>
        {'v'}
        {packageJson.version}
        {' '}
        {'(rev '}
        {this.getDateString()}
        {')'}
      </VersionNumberDiv>
    );
  };
}

VersionNumber.propTypes = {};

VersionNumber.defaultProps = {};

export default VersionNumber;