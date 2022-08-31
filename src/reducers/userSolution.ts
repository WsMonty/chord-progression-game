import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface solutionState {
  solution: string[];
}

const initialState: solutionState = {
  solution: [],
};

export const userSolutionReducer = createSlice({
  name: 'userSolution',
  initialState,
  reducers: {
    addToSolution: (state, action: PayloadAction<string>) => {
      state.solution.push(action.payload);
    },
    wipeSolution: (state) => {
      state.solution = [];
    },
    deleteLastEntry: (state) => {
      state.solution.splice(-1, 1);
    },
  },
});

export const { addToSolution, wipeSolution, deleteLastEntry } =
  userSolutionReducer.actions;

export default userSolutionReducer.reducer;
