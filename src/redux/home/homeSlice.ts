import { createSlice } from '@reduxjs/toolkit';

export interface HomeState { }

const initialState: HomeState = {};

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {}
});

export default homeSlice.reducer;