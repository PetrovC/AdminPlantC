import { createSlice } from '@reduxjs/toolkit';

export const interactionsSlice = createSlice({
    name: 'interactions',
    initialState: {
        toast: {
            open: false
        },
        confirmation: {
            open: false,
        }
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
        },
        hideConfirmation: (state, {payload}) =>  {
            state.confirmation = { open: false }
        },
    },
})

export const { showToast, hideToast, askConfirmation, hideConfirmation } = interactionsSlice.actions;

export default interactionsSlice.reducer;