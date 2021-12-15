import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './sessionSlice';
import missionsReducer from './missionsSlice';
import participantsReducer from './participantsSlice';
import interactionsReducer from './interactionsSlice';
import projetsReducer from './projetsSlice';
import thunkMiddleware from 'redux-thunk'
import projetReducer from './projetsSlice'

export default configureStore({
  reducer: {
    session: sessionReducer,
    missions: missionsReducer,
    participants: participantsReducer,
    interactions: interactionsReducer,
    projets: projetReducer,
  },
  middleware: [
    thunkMiddleware
  ]
})