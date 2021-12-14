import {LOGIN, LOGIN_SUCCESS, LOGIN_ERROR } from './typeLogin'
import {LOGOUT } from '../logout/typeLogout'
import jwt_decode from "jwt-decode"

const initialStateComments = {
    isLoading: false,
    isLogged: false,
    id: 0,
    nom: '',
    prenom: '',
    token: '',
    error: '',
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
            const decodedToken= jwt_decode(action.payload.token)
            return {
                ...state,
                isLoading: false,
                isLogged: true,
                id: decodedToken.id,
                nom: action.payload.nom,
                prenom: action.payload.prenom,
                token: action.payload.token,
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
                id: 0,
                nom: '',
                prenom: '',
                token: '',
                error: ''
            }
    
        default: return state
    }
}

export default reducerLogin