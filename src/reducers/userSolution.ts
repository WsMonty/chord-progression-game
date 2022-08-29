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
  },
});

export const { addToSolution, wipeSolution } = userSolutionReducer.actions;

export default userSolutionReducer.reducer;
