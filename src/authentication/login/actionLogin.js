import {LOGIN, LOGIN_SUCCESS, LOGIN_ERROR } from './typeLogin'
import axios from 'axios'
import {falseLoginService} from './falseLoginService'

const APILogin = () => {
    return {
        type: LOGIN
    }
}

const APILoginSuccess = (data) => {
    return {
        type: LOGIN_SUCCESS,
        payload: data
    }
}

const APILoginError = (error) => {
    return {
        type: LOGIN_ERROR,
        payload: error
    }
}

export const LoginRequest = ({email, password}) => {
    console.log('Im here');
    return dispatch => {
        
        dispatch(APILogin())
        
        axios.post('http://192.168.10.60:81/Login', {email, password})
        .then(res => {
            
            dispatch(APILoginSuccess(res.data))
        })
        .catch(err => {
            dispatch(APILoginError(err.message))
            
            
        })
    }
}

//!/ faux login en attendant le déploiement du backend /!//
//!/ A remplacer par le loginRequest ci-dessous /!//
export const FalseLoginRequest = ({email, password}) => {
    return dispatch => {

        dispatch(APILogin())

        falseLoginService.login({email, password})
        .then(res => {
            //dispatch(APILoginSuccess(res.data))
            dispatch(APILoginSuccess(res))
            console.log('logged')
        })
        .catch(err => {
            //dispatch(APILoginError(err.message))
            dispatch(APILoginError(err))
            console.log('notLogged')
        })
    }
}