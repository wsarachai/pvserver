// import API from '../api/Http'
// import * as EndPoints from '../api/EndPoints'

const LOGIN_REQUEST = 'Auth/LOGIN_REQUEST'
const LOGIN_SUCCESS = 'Auth/LOGIN_SUCCESS'
const LOGIN_FAILURE = 'Auth/LOGIN_FAILURE'

const LOGOUT_REQUEST = 'Auth/LOGOUT_REQUEST'
const LOGOUT_SUCCESS = 'Auth/LOGOUT_SUCCESS'
const LOGOUT_FAILURE = 'Auth/LOGOUT_FAILURE'

// Initialize State
const initialState = {
    user: {},
    isLoginLoading: true,
    isLoading: true,
    error: {},
    token: '',
    isAuthenticate: false
}

// Default Reducer
export default ( state = initialState, action ) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoginLoading: true
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoginLoading: false,
                isAuthenticate: true,
                token: action.payload
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                error: action.error,
                isLoginLoading: false
            }
        case LOGOUT_REQUEST:
            return {
                ...state,
                isLoginLoading: true
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLoginLoading: false,
                isAuthenticate: false,
                token: ''
            }
        case LOGOUT_FAILURE:
            return {
                ...state,
                error: action.error,
                isLoginLoading: false
            }
        default:
            return state
    }
};