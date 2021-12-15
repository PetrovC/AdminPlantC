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