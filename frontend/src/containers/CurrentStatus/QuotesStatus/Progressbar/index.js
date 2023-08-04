import React, { Component } from 'react';
import { ProgressBar } from "react-bootstrap"
import { Tracker } from "./index.style"

class QuotesProgressBar extends Component {

    render() {
        return (
            <Tracker>
                <ProgressBar>
                    <ProgressBar animated variant={this.props.foregroundColor} now={this.props.now} label={this.props.label}/>
                    <ProgressBar animated variant={this.props.backgroundColor} now={this.props.maxValue}/>
                </ProgressBar>
            </Tracker>
        );
    }
}

QuotesProgressBar.defaultProps = {};

export default QuotesProgressBar;
