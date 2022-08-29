import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counter';
import userSolutionReducer from './userSolution';
import winReducer from './win';

const rootReducer = combineReducers({
  currentField: counterReducer,
  userSolution: userSolutionReducer,
  win: winReducer,
});

export default rootReducer;
