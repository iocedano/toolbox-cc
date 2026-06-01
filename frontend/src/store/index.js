import { configureStore } from '@reduxjs/toolkit';
import filesReducer from './fileSlice';

const store = configureStore({
    reducer: {
        files: filesReducer,
    },
});

export default store;