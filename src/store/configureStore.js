import {configureStore} from '@reduxjs/toolkit';
import simpsonsSlice from './slices/simpsonsSlice';

export default configureStore({
  reducer: {
    simpsons: simpsonsSlice,
  },
});
