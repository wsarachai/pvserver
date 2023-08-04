import API from "../api/Http";
import * as EndPoints from "../api/EndPoints";
import { HTTP_STATUS_CODE } from "../utils/constants";

const FETCH_ENERGY_BALANCE_CURRENT_REQUEST = 'PVSystem/FETCH_ENERGY_BALANCE_CURRENT_REQUEST'
const FETCH_ENERGY_BALANCE_CURRENT_SUCCESS = 'PVSystem/FETCH_ENERGY_BALANCE_CURRENT_SUCCESS'
const FETCH_ENERGY_BALANCE_CURRENT_FAILURE = 'PVSystem/FETCH_ENERGY_BALANCE_CURRENT_FAILURE'
const FETCH_ENERGY_BALANCE_DAY_REQUEST = 'PVSystem/FETCH_ENERGY_BALANCE_DAY_REQUEST'
const FETCH_ENERGY_BALANCE_DAY_SUCCESS = 'PVSystem/FETCH_ENERGY_BALANCE_DAY_SUCCESS'
const FETCH_ENERGY_BALANCE_DAY_FAILURE = 'PVSystem/FETCH_ENERGY_BALANCE_DAY_FAILURE'
const FETCH_ENERGY_BALANCE_MONTH_REQUEST = 'PVSystem/FETCH_ENERGY_BALANCE_MONTH_REQUEST'
const FETCH_ENERGY_BALANCE_MONTH_SUCCESS = 'PVSystem/FETCH_ENERGY_BALANCE_MONTH_SUCCESS'
const FETCH_ENERGY_BALANCE_MONTH_FAILURE = 'PVSystem/FETCH_ENERGY_BALANCE_MONTH_FAILURE'
const FETCH_ENERGY_BALANCE_YEAR_REQUEST = 'PVSystem/FETCH_ENERGY_BALANCE_YEAR_REQUEST'
const FETCH_ENERGY_BALANCE_YEAR_SUCCESS = 'PVSystem/FETCH_ENERGY_BALANCE_YEAR_SUCCESS'
const FETCH_ENERGY_BALANCE_YEAR_FAILURE = 'PVSystem/FETCH_ENERGY_BALANCE_YEAR_FAILURE'
const FETCH_ENERGY_BALANCE_TOTAL_REQUEST = 'PVSystem/FETCH_ENERGY_BALANCE_TOTAL_REQUEST'
const FETCH_ENERGY_BALANCE_TOTAL_SUCCESS = 'PVSystem/FETCH_ENERGY_BALANCE_TOTAL_SUCCESS'
const FETCH_ENERGY_BALANCE_TOTAL_FAILURE = 'PVSystem/FETCH_ENERGY_BALANCE_TOTAL_FAILURE'
const FETCH_ALL_FAILURE = 'PVSystem/FETCH_ALL_FAILURE'
const RESET_ALL_STATE = 'PVSystem/RESET_ALL_STATE'

// Initialize State
const initialState = {
    isLoading: true,
    currentEnergyBalance: {
        isFirstLoading: true,
        dataObj: {}
    },
    dayEnergyBalance:  {
        isFirstLoading: true,
        dataObj: {}
    },
    monthEnergyBalance:  {
        isFirstLoading: true,
        dataObj: {}
    },
    yearEnergyBalance: {
        isFirstLoading: true,
        dataObj: {}
    },
    totalEnergyBalance: {
        isFirstLoading: true,
        dataObj: {}
    },
    statusOverview: {},
    error: {},
}

// Default Reducer
export default ( state = initialState, action ) => {
    switch (action.type) {
        case RESET_ALL_STATE:
            return {
                ...state,
                isFirstLoading: true,
                isLoading: true
            }
        case FETCH_ENERGY_BALANCE_CURRENT_REQUEST:
        case FETCH_ENERGY_BALANCE_DAY_REQUEST:
        case FETCH_ENERGY_BALANCE_MONTH_REQUEST:
        case FETCH_ENERGY_BALANCE_YEAR_REQUEST:
        case FETCH_ENERGY_BALANCE_TOTAL_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case FETCH_ENERGY_BALANCE_CURRENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                currentEnergyBalance: {
                    isFirstLoading: false,
                    dataObj: action.payload
                }
            }
        case FETCH_ENERGY_BALANCE_DAY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                dayEnergyBalance: {
                    isFirstLoading: false,
                    dataObj: action.payload
                }
            }
        case FETCH_ENERGY_BALANCE_MONTH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                monthEnergyBalance: {
                    isFirstLoading: false,
                    dataObj: action.payload
                }
            }
        case FETCH_ENERGY_BALANCE_YEAR_SUCCESS:
            return {
                ...state,
                isLoading: false,
                yearEnergyBalance: {
                    isFirstLoading: false,
                    dataObj: action.payload
                }
            }
        case FETCH_ENERGY_BALANCE_TOTAL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                totalEnergyBalance: {
                    isFirstLoading: false,
                    dataObj: action.payload
                }
            }
        case FETCH_ENERGY_BALANCE_CURRENT_FAILURE:
        case FETCH_ENERGY_BALANCE_DAY_FAILURE:
        case FETCH_ENERGY_BALANCE_MONTH_FAILURE:
        case FETCH_ENERGY_BALANCE_YEAR_FAILURE:
        case FETCH_ENERGY_BALANCE_TOTAL_FAILURE:
        case FETCH_ALL_FAILURE:
            return {
                ...state,
                error: action.error,
                isLoading: false
            }
        default:
            return state
    }
};

export const resetAllStates = () => {
    return async dispatch => {
        try {
            dispatch({
                type: RESET_ALL_STATE
            })
        } catch (err) {
            console.error(err)
            dispatch({
                type: FETCH_ALL_FAILURE
            })
        }
    }
};

// Action Creators
export const fetchEnergyBalanceCurrent = (tabName, stationId) => {
    return async dispatch => {
        try {
            dispatch({
                type: FETCH_ENERGY_BALANCE_CURRENT_REQUEST
            });

            let response = await API.get(EndPoints.ENERGY_BALANCE_CURRENT, {
                params: {
                    key: tabName,
                    stationId: stationId
                }
            });
            if(response.status === HTTP_STATUS_CODE.OK){
                dispatch({
                    type: FETCH_ENERGY_BALANCE_CURRENT_SUCCESS,
                    payload: response.data
                })
            }
        } catch (err) {
            console.error(err)
            dispatch({
                type: FETCH_ENERGY_BALANCE_CURRENT_FAILURE
            })
        }
    }
}

export const fetchEnergyBalanceDay = (date, tabName, stationId) => {
    return async dispatch => {
        try {
            dispatch({
                type: FETCH_ENERGY_BALANCE_DAY_REQUEST
            })

            let response = await API.get(EndPoints.ENERGY_BALANCE_DAY , {
                params: {
                    day: date,
                    key: tabName,
                    stationId: stationId
                }
            });

            if(response.status === HTTP_STATUS_CODE.OK){
                dispatch({
                    type: FETCH_ENERGY_BALANCE_DAY_SUCCESS,
                    payload: response.data
                })
            }
        } catch (err) {
            console.error(err)
            dispatch({
                type: FETCH_ENERGY_BALANCE_DAY_FAILURE
            })
        }
    }
}

export const fetchEnergyBalanceMonth = (date, tabName, stationId) => {
    return async dispatch => {
        try {
            dispatch({
                type: FETCH_ENERGY_BALANCE_MONTH_REQUEST
            })

            let response = await API.get(EndPoints.ENERGY_BALANCE_MONTH , {
                params: {
                    month: date,
                    key: tabName,
                    stationId: stationId
                }
            });

            if(response.status === HTTP_STATUS_CODE.OK){
                dispatch({
                    type: FETCH_ENERGY_BALANCE_MONTH_SUCCESS,
                    payload: response.data
                })
            }
        } catch (err) {
            console.error(err)
            dispatch({
                type: FETCH_ENERGY_BALANCE_MONTH_FAILURE
            })
        }
    }
}

export const fetchEnergyBalanceYear = (year, tabName, stationId) => {
    return async dispatch => {
        try {
            dispatch({
                type: FETCH_ENERGY_BALANCE_YEAR_REQUEST
            })

            let response = await API.get(EndPoints.ENERGY_BALANCE_YEAR , {
                params: {
                    year: year,
                    key: tabName,
                    stationId: stationId
                }
            });

            if(response.status === HTTP_STATUS_CODE.OK){
                dispatch({
                    type: FETCH_ENERGY_BALANCE_YEAR_SUCCESS,
                    payload: response.data
                })
            }
        } catch (err) {
            console.error(err)
            dispatch({
                type: FETCH_ENERGY_BALANCE_YEAR_FAILURE
            })
        }
    }
}

export const fetchEnergyBalanceTotal = (tabName, stationId) => {
    return async dispatch => {
        try {
            dispatch({
                type: FETCH_ENERGY_BALANCE_TOTAL_REQUEST
            })

            let response = await API.get(EndPoints.ENERGY_BALANCE_TOTAL, {
                params: {
                    key: tabName,
                    stationId: stationId
                }
            });

            if(response.status === HTTP_STATUS_CODE.OK){
                dispatch({
                    type: FETCH_ENERGY_BALANCE_TOTAL_SUCCESS,
                    payload: response.data
                })
            }
        } catch (err) {
            console.error(err)
            dispatch({
                type: FETCH_ENERGY_BALANCE_TOTAL_FAILURE
            })
        }
    }
}
