import { createSlice } from '@reduxjs/toolkit';
import { getCountriesList } from './resourcesActions';

export interface CountryData {
    page_size?: number;
    total_size?: number;
    records?: []
}

export interface ResourcesState {
    message?: string | null,
    loading: boolean;
    countryData: CountryData;
}

const initialState: ResourcesState = {
    loading: false,
    message: null,
    countryData: {}
}

export const resourceslice = createSlice({
    name: 'resources',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //getCountries
        builder.addCase(getCountriesList.pending, (state: ResourcesState, _action) => {
            state.loading = true
        })
        builder.addCase(getCountriesList.fulfilled, (state: ResourcesState, action) => {
            state.loading = false;
            state.countryData = action.payload.data;
            state.message = action.payload.message;
        })
        builder.addCase(getCountriesList.rejected, (state: ResourcesState, action) => {
            const payload = action.payload as ResourcesState;
            state.loading = false
            state.message = payload.message;
        })
    }
});

export default resourceslice.reducer;