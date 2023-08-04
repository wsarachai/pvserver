import API from "../api/Http";
import * as EndPoints from "../api/EndPoints";
import { HTTP_STATUS_CODE } from "../utils/constants";

const FETCH_CURRENT_STATUS_REQUEST = 'PVSystem/FETCH_CURRENT_STATUS_REQUEST'
const FETCH_CURRENT_STATUS_SUCCESS = 'PVSystem/FETCH_CURRENT_STATUS_SUCCESS'
const FETCH_CURRENT_STATUS_FAILURE = 'PVSystem/FETCH_CURRENT_STATUS_FAILURE'


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
    case FETCH_CURRENT_STATUS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_CURRENT_STATUS_SUCCESS:
      return {
        ...state,
        isFirstLoading: false,
        isLoading: false,
        dataObj: action.payload
      };
    case FETCH_CURRENT_STATUS_FAILURE:
      return {
        ...state,
        isFirstLoading: false,
        isLoading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export const fetchData = (tabName, stationId) => {
  return async dispatch => {
    try {
      dispatch({
        type: FETCH_CURRENT_STATUS_REQUEST
      });
      let response = await API.get(EndPoints.CURRENT_STATUS, {
        params: {
          key: tabName,
          stationId: stationId
        }
      });
      if(response.status === HTTP_STATUS_CODE.OK){
        dispatch({
          type: FETCH_CURRENT_STATUS_SUCCESS,
          payload: response.data
        })
      }
    } catch (err) {
      console.error(err)
      dispatch({
        type: FETCH_CURRENT_STATUS_FAILURE
      })
    }
  }
}
