import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    list: [],
    files: [],
};

const fileSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {
        setFileList: (state, action) => {
            state.list = action.payload;
        },
        setFilesData: (state, action) => {
            state.files = action.payload;
        },
    },
});

export const { setFileList, setFilesData } = fileSlice.actions;

export default fileSlice.reducer;