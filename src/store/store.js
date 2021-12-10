import { configureStore } from '@reduxjs/toolkit';
import reducerLogin from '../authentication/login/reducerLogin'
import missionsReducer from './missionsSlice';
import participantsReducer from './participantsSlice';
import interactionsReducer from './interactionsSlice';
import projetsReducer from './projetsSlice';
import thunkMiddleware from 'redux-thunk'

export default configureStore({
  reducer: {
    login: reducerLogin,
    missions: missionsReducer,
    participants: participantsReducer,
    projets: projetsReducer,
    interactions: interactionsReducer
  },
  middleware: [
    thunkMiddleware
  ]
})