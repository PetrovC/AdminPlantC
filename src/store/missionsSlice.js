import { createSlice } from '@reduxjs/toolkit';

export const missionsSlice = createSlice({
    name: 'missions',
    initialState: {
        selectedMission: null,
        list: [],
    },
    reducers: {
        loadMissions: (state, {payload}) => {
            state.list = payload;
        },
        addMission: (state, {payload}) => {
            state.list = [...state.list, payload];
        },
        removeMission: (state, {payload}) => {
            state.list = state.list.filter(ev => ev.id !== payload);
        },
        updateMission: (state, {payload}) => {
            const toUpdate = state.list.find(ev => ev.id === payload.id);
            Object.assign(toUpdate, payload);
            state.list = [...state.list]
        },
        selectMission: (state, {payload}) => {
            state.selectedMission = { ...payload }
        }
    },
})

export const { loadMissions, addMission, removeMission, updateMission, selectMission } = missionsSlice.actions

export default missionsSlice.reducer