import {LOGOUT} from './typeLogout'

const Logout = () => {
    return {
        type: LOGOUT
    }
}

export const logoutRequest = () => {
    return dispatch => {

        dispatch(Logout())
        console.log('logout')

    }
}