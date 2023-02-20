import { createSlice } from '@reduxjs/toolkit';

export interface StarState {
    message?: string | null,
    loading: boolean;
    staredUsers: any
}

const initialState: StarState = {
    message: null,
    loading: false,
    staredUsers: []
}

export const starSlice = createSlice({
    name: 'star',
    initialState,
    reducers: {
        addStarUser: (state, action: any) => {
            state.staredUsers = action.payload
        }
    },
    extraReducers: (builder) => {

    }
});

const { addStarUser } = starSlice.actions;
export { addStarUser }
export default starSlice.reducer;