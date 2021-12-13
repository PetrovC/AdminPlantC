import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './sessionSlice';
import missionsReducer from './missionsSlice';
import participantsReducer from './participantsSlice';
import interactionsReducer from './interactionsSlice';
import thunkMiddleware from 'redux-thunk'

export default configureStore({
  reducer: {
    session: sessionReducer,
    missions: missionsReducer,
    participants: participantsReducer,
    interactions: interactionsReducer
  },
  middleware: [
    thunkMiddleware
  ]
})