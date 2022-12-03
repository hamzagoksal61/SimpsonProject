import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {client} from '../../helper/client';
import {getObjectData, storeObjectData} from '../../helper/localStorage';

const initialState = {
  simpsons: {
    data: [],
    loading: false,
  },
  selectedSimpson: {},
};

export const getSimpsons = createAsyncThunk('getSimpsons', async () => {
  let data = [];
  await getObjectData('simpsons').then(simp => {
    if (simp !== null && simp.length > 0) {
      data = simp;
    }
  });
  if (data.length === 0) {
    const response = await client.get(
      'https://5fc9346b2af77700165ae514.mockapi.io/simpsons',
    );
    return response.data.concat(data);
  } else return data;
});

const simpsonsSlice = createSlice({
  name: 'simspons',
  initialState,
  reducers: {
    setSelectedSimpson(state, action) {
      state.selectedSimpson = action.payload;
    },
    addSimpson(state, action) {
      state.simpsons.data.push(action.payload);
      storeObjectData('simpsons', state.simpsons.data);
    },
    deleteSimpson(state, action) {
      state.simpsons.data.splice(action.payload, 1);
      storeObjectData('simpsons', state.simpsons.data);
    },
    changePosition(state, action) {
      if (action.payload.position === 'up') {
        let prevState = [...state.simpsons.data];
        let temp = prevState[action.payload.index - 1];
        prevState[action.payload.index - 1] = prevState[action.payload.index];
        prevState[action.payload.index] = temp;
        state.simpsons.data = prevState;
        storeObjectData('simpsons', prevState);
      } else {
        let prevState = [...state.simpsons.data];
        let temp = prevState[action.payload.index + 1];
        prevState[action.payload.index + 1] = prevState[action.payload.index];
        prevState[action.payload.index] = temp;
        state.simpsons.data = prevState;
        storeObjectData('simpsons', prevState);
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(getSimpsons.pending, (state, action) => {
      state.simpsons.loading = true;
    });
    builder.addCase(getSimpsons.fulfilled, (state, action) => {
      state.simpsons.loading = false;
      state.simpsons.data = action.payload;
    });
    builder.addCase(getSimpsons.rejected, (state, action) => {
      state.simpsons.loading = false;
    });
  },
});
export const {setSelectedSimpson, addSimpson, deleteSimpson, changePosition} =
  simpsonsSlice.actions;

export default simpsonsSlice.reducer;
