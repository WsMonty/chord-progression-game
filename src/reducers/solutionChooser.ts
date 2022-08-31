import { createSlice } from '@reduxjs/toolkit';

interface solutionState {
  solutionNumber: number;
  oldSolutions: number[];
}

const initialState: solutionState = {
  solutionNumber: Math.floor(Math.random() * 10 + 1),
  oldSolutions: [],
};

export const solutionChooser = createSlice({
  name: 'solutionNumber',
  initialState,
  reducers: {
    getNewSolution: (state) => {
      state.oldSolutions.push(state.solutionNumber);
      const checkIfDifferent = (number: number) => {
        return state.oldSolutions.indexOf(number) === -1;
      };
      const getNewRandomNumber = () => {
        if (state.oldSolutions.length === 10) state.oldSolutions = [];
        return Math.floor(Math.random() * 10 + 1);
      };
      let newSolutionNumber = getNewRandomNumber();
      while (checkIfDifferent(newSolutionNumber) === false)
        newSolutionNumber = getNewRandomNumber();
      state.solutionNumber = newSolutionNumber;
    },
  },
});

export const { getNewSolution } = solutionChooser.actions;

export default solutionChooser.reducer;
