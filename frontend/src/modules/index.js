import { combineReducers } from 'redux'
import auth from "./auth";
import EnergyBalance from "./EnergyBalance";
import CurrentStatus from "./CurrentStatus";
import Dashboard from "./Dashboard";
import tabs from "./tabs";
import headers from "./headers"
import datetime from "./datetime";

export default combineReducers({
    datetime,
    CurrentStatus,
    Dashboard,
    EnergyBalance,
    tabs,
    headers,
    auth,
})