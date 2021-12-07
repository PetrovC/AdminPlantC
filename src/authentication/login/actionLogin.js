import {LOGIN, LOGIN_SUCCESS, LOGIN_ERROR } from './typeLogin'
import axios from 'axios'
import { useNavigate } from 'react-router'
import {falseLoginService} from './falseLoginService'

const APILogin = () => {
    return {
        type: LOGIN
    }
}

const APILoginSuccess = (token) => {
    return {
        type: LOGIN_SUCCESS,
        payload: token
    }
}

const APILoginError = (error) => {
    return {
        type: LOGIN_ERROR,
        payload: error
    }
}

export const LoginRequest = ({email, password}) => {

    return dispatch => {
        
        dispatch(APILogin())

        axios.post('https://', {email, password})
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