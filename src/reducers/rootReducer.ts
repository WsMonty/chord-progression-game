import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counter';
import userSolutionReducer from './userSolution';
import winReducer from './win';
import solutionChooser from './solutionChooser';

const rootReducer = combineReducers({
  currentField: counterReducer,
  userSolution: userSolutionReducer,
  win: winReducer,
  solutionNumber: solutionChooser,
});

export default rootReducer;
