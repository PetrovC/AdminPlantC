import { createSlice } from '@reduxjs/toolkit';

export const projetsSlice = createSlice({
    name: 'projets',
    initialState: {
        
        selectedProjet: null,
        list: [{}]
    },
    reducers: {
        loadProjets: (state, {payload}) =>  {
            state.list = payload
        },
        addProjets: (state, {payload}) => {
            state.list = [...state.list, payload];
        },
        removeProjets: (state, {payload}) => {
            state.list = state.list.filter(ev => ev.id !== payload);
        },
        updateProjets: (state, {payload}) => {
            const toUpdate = state.list.find(ev => ev.id === payload.id);
            Object.assign(toUpdate, payload);
            state.list = [...state.list]
        },
        selectProjets: (state, {payload}) => {
            state.selectedMission = { ...payload }
        }
    },
})

export const { loadProjets } = projetsSlice.actions;

export default projetsSlice.reducer;