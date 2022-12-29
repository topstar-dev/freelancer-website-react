import { createSlice } from '@reduxjs/toolkit';
import { getSkillsList } from './occupationSkillsActions';

export interface ResourcesState {
    message?: string | null,
    skillsList: any;
    loading: boolean;
}

const initialState: ResourcesState = {
    message: null,
    skillsList: [],
    loading: false
}

export const occupationSkillsSlice = createSlice({
    name: 'occupationSkills',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //getSkills
        builder.addCase(getSkillsList.pending, (state: ResourcesState, _action) => {
            state.loading = true
        })
        builder.addCase(getSkillsList.fulfilled, (state: ResourcesState, action) => {
            state.skillsList = action.payload.data;
            state.message = action.payload.message;
            state.loading = false
        })
        builder.addCase(getSkillsList.rejected, (state: ResourcesState, action) => {
            const payload = action.payload as ResourcesState;
            state.message = payload.message;
            state.loading = false
        })
    }
});

export default occupationSkillsSlice.reducer;