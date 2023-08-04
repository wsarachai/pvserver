const SET_TABS = 'Tabs/SET_TABS'
const RESET_TABS = 'Tabs/RESET_TABS'
const SET_CHILD_TABS = 'Tabs/SET_CHILD_TABS'
const RESET_CHILD_TABS = 'Tabs/RESET_CHILD_TABS'

// Initialize State
const initialState = {
    tabs: "Totals",
    child_tabs: "1",
}

// Default Reducer
export default ( state = initialState, action ) => {
    switch (action.type) {
        case SET_TABS:
            return {
                ...state,
                tabs: action.payload
            }
        case SET_CHILD_TABS:
            return {
                ...state,
                child_tabs: action.payload
            }
        case RESET_TABS:
            return {
                ...state,
                tabs: "Totals"
            }
        case RESET_CHILD_TABS:
            return {
                ...state,
                child_tabs: "1"
            }
        default:
            return state
    }
};

// Action Creators
export const setTabs = (tabs) => {
    return async dispatch => {
        dispatch({
            type: SET_TABS,
            payload: tabs
        })
    }
}

// Action Creators
export const setChildTabs = (tabs) => {
    return async dispatch => {
        dispatch({
            type: SET_CHILD_TABS,
            payload: tabs
        })
    }
}
