import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface highscoreState {
  numberWon: number;
  guesses: { [index: number]: number };
  lost: number;
}

const initialState: highscoreState = {
  numberWon: 0,
  guesses: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  lost: 0,
};

const highscoreReducer = createSlice({
  name: 'highscore',
  initialState,
  reducers: {
    updateHighscore: (state, action: PayloadAction<Array<any>>) => {
      switch (action.payload[0]) {
        case 'win':
          state.numberWon++;
          state.guesses[action.payload[1]]++;
      }
    },
  },
});

export const { updateHighscore } = highscoreReducer.actions;

export default highscoreReducer.reducer;
