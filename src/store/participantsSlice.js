import { createSlice } from '@reduxjs/toolkit';

export const participantsSlice = createSlice({
    name: 'participants',
    initialState: {
        list: []
    },
    reducers: {
        loadParticipants: (state, {payload}) =>  {
            state.list = payload
        },
    },
})

export const { loadParticipants } = participantsSlice.actions;

export default participantsSlice.reducer;

