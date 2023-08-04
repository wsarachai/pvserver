import moment from 'moment';

const FETCH_LAST_UPDATE = 'PVSystem/FETCH_LAST_UPDATE'

const initialState = {
  datetimeString: moment(new Date()).format('HH:mm:ss')
}

// Default Reducer
export default ( state = initialState, action ) => {
  switch (action.type) {
    case FETCH_LAST_UPDATE:
      return {
        ...state,
        datetimeString: action.payload
      };
    default:
      return state;
  }
};

export const setLastUpdate = (datetimeString) => {
  return async dispatch => {
    try {
      dispatch({
        type: FETCH_LAST_UPDATE,
        payload: datetimeString
      })
    } catch (err) {
      console.error(err);
    }
  };
};
