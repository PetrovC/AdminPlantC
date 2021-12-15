import { createSlice } from '@reduxjs/toolkit';

export const projetsSlice = createSlice({
    name: 'projets',
    initialState: {
        
        selectedProjet: null,
        list: [{}]
    },
    reducers: {
        loadProjet: (state, {payload}) =>  {
            state.list = payload
        },
        addProjet: (state, {payload}) => {
            state.list = [...state.list, payload];
        },
        removeProjet: (state, {payload}) => {
            state.list = state.list.filter(ev => ev.id !== payload);
        },
        updateProjet: (state, {payload}) => {
            const toUpdate = state.list.find(ev => ev.id === payload.id);
            Object.assign(toUpdate, payload);
            state.list = [...state.list]
        },
        selectProjet: (state, {payload}) => {
            state.selectedMission = { ...payload }
        }
    },
})

export const { loadProjets } = projetsSlice.actions;
import { createSlice } from "@reduxjs/toolkit";

export const projetsSlice = createSlice({
    name: 'projets',
    initialState:{
        list:[]
    },
    reducers:{
        loadProjets: (state,{payload}) => {
            state.list = payload
        }

    }
})

export  const {loadProjets} = projetsSlice.actions;

export default projetsSlice.reducer;