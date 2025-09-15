import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import testOutlineSlice from '../slice/test-outline.slice';
import matrixSlice from '../slice/matrix.slice';
import questionSlice from '../slice/questions.slice';

const store = configureStore({
  reducer: {
    test_outline: testOutlineSlice,
    matrixs: matrixSlice,
    questions: questionSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
