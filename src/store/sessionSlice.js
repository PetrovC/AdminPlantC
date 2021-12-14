import { createSlice } from '@reduxjs/toolkit';

export const sessionSlice = createSlice({
    name: 'session',
    initialState: {
        isLogged: false,
        token: null,
    },
    reducers: {
        start: (state, {payload}) =>  {
            state.isLogged = true;
            state.token = payload;
        },
        end: (state) => {
            state.isLogged = false;
            state.token = null;
        }
    },
})

export const { start, end } = sessionSlice.actions

export default sessionSlice.reducer