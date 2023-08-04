import API from "../api/Http";
import * as EndPoints from "../api/EndPoints";
import { HTTP_STATUS_CODE } from "../utils/constants";
const FETCH_DASHBOARD_REQUEST = 'Dashboard/FETCH_DASHBOARD_REQUEST'
const FETCH_DASHBOARD_SUCCESS = 'Dashboard/FETCH_DASHBOARD_SUCCESS'
const FETCH_DASHBOARD_FAILURE = 'Dashboard/FETCH_DASHBOARD_FAILURE'

// Initialize State
const initialState = {
    isFirstLoading: true,
    isLoading: true,
    dataObj: {},
    error: {}
}

// Default Reducer
export default ( state = initialState, action ) => {
    switch (action.type) {
        case FETCH_DASHBOARD_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case FETCH_DASHBOARD_SUCCESS:
            return {
                ...state,
                isFirstLoading: false,
                isLoading: false,
                dataObj: action.payload
            }
        case FETCH_DASHBOARD_FAILURE:
            return {
                ...state,
                isFirstLoading: false,
                isLoading: false,
                error: action.error
            }
        default:
            return state
    }
};

// Action Creators
export const fetchData = (stationId) => {
    return async dispatch => {
        try {
            dispatch({
                type: FETCH_DASHBOARD_REQUEST
            })
            let response = await API.get(EndPoints.CURRENT_DASHBOARD_STATUS, {
                params: {
                    stationId: stationId
                }
            });
            if (response.status === HTTP_STATUS_CODE.OK) {
                dispatch({
                    type: FETCH_DASHBOARD_SUCCESS,
                    payload: response.data
                })
            }
        } catch (err) {
            console.error(err)
            dispatch({
                type: FETCH_DASHBOARD_FAILURE
            })
        }
    }
}