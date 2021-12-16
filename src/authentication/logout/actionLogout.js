import {LOGOUT} from './typeLogout'
import { checkStore } from '../../store/storeListen'

const Logout = () => {
    return {
        type: LOGOUT
    }
}

export const logoutRequest = () => {
    return dispatch => {

        dispatch(Logout())
        //checkStore()
    }
}