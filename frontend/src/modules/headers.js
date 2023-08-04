const SET_TITLE_HEADER = 'HEADER/SET_TITLE_HEADER'
const RESET_TITLE_HEADER = 'HEADER/RESET_TITLE_HEADER'

// Initialize State
const initialState = {
  titleHeader: "Current Status",
}

// Default Reducer
export default ( state = initialState, action ) => {
  switch (action.type) {
    case SET_TITLE_HEADER:
      return {
        ...state,
        titleHeader: action.payload
      }
    case RESET_TITLE_HEADER:
      return {
        ...state,
        titleHeader: "----"
      }
    default:
      return state
  }
};

// Action Creators
export const setTitleHeader = (title) => {
  return async dispatch => {
    dispatch({
      type: SET_TITLE_HEADER,
      payload: title
    })
  }
}
