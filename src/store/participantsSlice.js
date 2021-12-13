import { createSlice } from '@reduxjs/toolkit';

export const participantsSlice = createSlice({
    name: 'participants',
    initialState: {
        selectParticipant:null,
        list: []
    },
    reducers: {
        loadParticipants: (state, {payload}) =>  {
            state.list = payload
        },
        addParticipant:(state, {payload})=>{
            state.list=[...state.list,payload]
        },
        removeParticipant : (state, {payload}) => {
            state.list = state.list.filter(element => element.id !== payload.id)
        },
        updateParticipant : (state, {payload}) => {
            const toUpdate = state.list.find(element => element.id === payload.id);
            Object.assign(toUpdate,payload);
            state.list = [...state.list]
        },
        selectParticipant : (state, {payload}) => {
            state.selectParticipant = {...payload}
        }
    },
})

export const { loadParticipants } = participantsSlice.actions;

export default participantsSlice.reducer;

