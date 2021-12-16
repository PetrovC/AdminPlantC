import {LOGIN, LOGIN_SUCCESS, LOGIN_ERROR } from './typeLogin'
import {LOGOUT } from '../logout/typeLogout'
import jwt_decode from "jwt-decode"

const initialStateComments = {
    isLoading: false,
    isLogged: false,
    email: '',
    nom: '',
    prenom: '',
    userlevel: '',
    id: 0,
    fonction: '',
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
                email: decodedToken.email,
                nom: decodedToken.nom,
                prenom: decodedToken.prenom,
                userlevel: decodedToken.userlevel,
                id: decodedToken.id,
                fonction: decodedToken.fonction,
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
                email: '',
                nom: '',
                prenom: '',
                userlevel: '',
                id: 0,
                fonction: '',
                token: '',
                error: '',
            }
    
        default: return state
    }
}

export default reducerLogin