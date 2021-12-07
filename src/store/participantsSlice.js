import { createSlice } from '@reduxjs/toolkit';

export const participantsSlice = createSlice({
    name: 'participants',
    initialState: {
        
        selectedParticipant: null,
        list: []
    },
    reducers: {
        loadParticipants: (state, {payload}) =>  {
            state.list = payload
        },
        addParticipants: (state, {payload}) => {
            state.list = [...state.list, payload];
        },
        removeParticipant: (state, {payload}) => {
            state.list = state.list.filter(ev => ev.id !== payload);
        },
        updateParticipant: (state, {payload}) => {
            const toUpdate = state.list.find(ev => ev.id === payload.id);
            Object.assign(toUpdate, payload);
            state.list = [...state.list]
        },
        selectParticipant: (state, {payload}) => {
            state.selectedMission = { ...payload }
        }
    },
})

export const { loadParticipants } = participantsSlice.actions;

export default participantsSlice.reducer;

