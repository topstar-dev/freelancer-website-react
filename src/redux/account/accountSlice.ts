import { createSlice } from '@reduxjs/toolkit';

export interface AccountState {
}

const initialState: AccountState = {
}

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {},
    extraReducers: (builder) => { }
});

export default accountSlice.reducer;