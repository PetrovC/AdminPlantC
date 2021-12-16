import { createSlice } from '@reduxjs/toolkit';
import   React,{ useNavigate }from "react"

export const interactionsSlice = createSlice({
    name: 'interactions',
    initialState: {
        toast: {
            open: false
        },
        confirmation: {
            open: false,
        },
        navigate: useNavigate()
    },
    reducers: {
        showToast: (state, {payload}) =>  {
            state.toast = { open: true, ...payload }
        },
        hideToast: (state, {payload}) =>  {
            state.toast = { open: false }
        },
        askConfirmation: (state, {payload}) => {
            state.confirmation = { open: true, ...payload }
            useNavigate('participant-list')
        },
        hideConfirmation: (state, {payload}) =>  {
            state.confirmation = { open: false }
        },
    },
})

export const { showToast, hideToast, askConfirmation, hideConfirmation } = interactionsSlice.actions;

export default interactionsSlice.reducer;