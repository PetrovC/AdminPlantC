import {LOGIN, LOGIN_SUCCESS, LOGIN_ERROR } from './typeLogin'
import {LOGOUT } from '../logout/typeLogout'

const initialStateComments = {
    isLoading: false,
    isLogged: false,
    token: '',
    error: ''
}

const reducerLogin = (state = initialStateComments, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isLoading: true,
                isLogged: false,
                token: '',
                error: ''
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isLogged: true,
                token: action.payload,
                error: ''
            }
        case LOGIN_ERROR:
            return {
                ...state,
                isLoading: false,
                isLogged: false,
                token: '',
                error: action.payload
            }
        case LOGOUT:
            return {
                ...state,
                isLoading: false,
                isLogged: false,
                token: '',
                error: ''
            }
    
        default: return state
    }
}

export default reducerLogin