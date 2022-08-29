import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface counterState {
  field: number;
  row: number;
}

const initialState: counterState = {
  field: 1,
  row: 1,
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
  },
});

export const { nextField, nextRow, setField } = counterReducer.actions;

export default counterReducer.reducer;
