import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface winState {
  win: boolean;
}

const initialState: winState = {
  win: false,
};

const winReducer = createSlice({
  name: 'win',
  initialState,
  reducers: {
    gameWon: (state, action: PayloadAction<boolean>) => {
      state.win = action.payload;
    },
  },
});

export const { gameWon } = winReducer.actions;

export default winReducer.reducer;
