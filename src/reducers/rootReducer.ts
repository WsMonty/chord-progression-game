import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counter';
import userSolutionReducer from './userSolution';
import winReducer from './win';
import solutionChooser from './solutionChooser';
import highscoreReducer from './highscoreReducer';

const rootReducer = combineReducers({
  currentField: counterReducer,
  userSolution: userSolutionReducer,
  win: winReducer,
  solutionNumber: solutionChooser,
  highscore: highscoreReducer,
});

export default rootReducer;
