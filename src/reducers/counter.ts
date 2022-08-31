import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface counterState {
  field: number;
  row: number;
  tries: number;
}

const initialState: counterState = {
  field: 1,
  row: 1,
  tries: 4,
};

export const counterReducer = createSlice({
  name: 'fieldCounter',
  initialState,
  reducers: {
    nextField: (state) => {
      state.field === 9 ? (state.field -= 8) : (state.field += 1);
    },
    nextRow: (state) => {
      state.row += 1;
    },
    setField: (state, action: PayloadAction<number>) => {
      state.field = action.payload;
    },
    newTry: (state) => {
      state.tries -= 1;
    },
    resetField: (state) => {
      state.row = 1;
      state.field = 1;
      state.tries = 4;
    },
  },
});

export const { nextField, nextRow, setField, newTry, resetField } =
  counterReducer.actions;

export default counterReducer.reducer;
