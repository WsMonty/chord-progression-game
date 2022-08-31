import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface winState {
  win: boolean;
  loose: boolean;
}

const initialState: winState = {
  win: false,
  loose: false,
};

const winReducer = createSlice({
  name: 'win',
  initialState,
  reducers: {
    gameWon: (state, action: PayloadAction<boolean>) => {
      state.win = action.payload;
    },
    gameLost: (state, action: PayloadAction<boolean>) => {
      state.loose = action.payload;
    },
  },
});

export const { gameWon, gameLost } = winReducer.actions;

export default winReducer.reducer;
