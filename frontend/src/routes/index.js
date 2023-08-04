import React, { Component } from 'react';
import { Button, Result } from "antd";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { Route, Switch, withRouter } from "react-router";
import { connect } from "react-redux";
import YotsukDashboard from "../containers/Dashboard/yotsuk";
import RenewableDashboard from "../containers/Dashboard/renewable";
import YotsukCurrentStatus from "../containers/CurrentStatus/yotsuk";
import RenewableCurrentStatus from "../containers/CurrentStatus/renewable";
import YotsukEnergy from "../containers/Energy/yotsuk";
import RenewableEnergy from "../containers/Energy/renewable";

function NotFound() {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary"><Link to="/">Back Home</Link></Button>}
        />
    )
}

class App extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/yotsuk/dashboard" component={YotsukDashboard}/>
                    <Route exact path="/yotsuk" component={YotsukCurrentStatus}/>
                    <Route exact path="/yotsuk/energy/balance" component={YotsukEnergy}/>
                    <Route exact path="/renewable/dashboard" component={RenewableDashboard}/>
                    <Route exact path="/renewable" component={RenewableCurrentStatus}/>
                    <Route exact path="/renewable/energy/balance" component={RenewableEnergy}/>
                    <Route exact path="*" component={NotFound}/>
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = ( state ) => ({

})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App))