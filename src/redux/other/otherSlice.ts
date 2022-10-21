import { createSlice } from '@reduxjs/toolkit';
import { imageDownload } from './otherActions';

export interface OtherState {
    message?: string | null,
    loading: boolean;
}

const initialState: OtherState = {
    loading: false,
    message: null
}

export const otherSlice = createSlice({
    name: 'other',
    initialState,
    reducers: {},
    extraReducers: (builder) => { }
});

export default otherSlice.reducer;