import { configureStore } from '@reduxjs/toolkit';
import reducerLogin from '../authentication/login/reducerLogin'
import missionsReducer from './missionsSlice';
import participantsReducer from './participantsSlice';
import interactionsReducer from './interactionsSlice';
import thunkMiddleware from 'redux-thunk'
import projetReducer from './projetsSlice'

export default configureStore({
  reducer: {
    login: reducerLogin,
    missions: missionsReducer,
    participants: participantsReducer,
    interactions: interactionsReducer,
    projets: projetReducer,
  },
  middleware: [
    thunkMiddleware
  ]
})