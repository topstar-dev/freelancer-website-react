import { createSlice } from '@reduxjs/toolkit';
import { getCountriesList } from './resourcesActions';

export interface CountryData {
    page_size?: number;
    total_size?: number;
    records?: []
}

export interface ResourcesState {
    message?: string,
    loading: boolean;
    countryData: CountryData,
    error?: string | null,
    status?: number
}

const initialState: ResourcesState = {
    loading: false,
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
            state.error = null
        })
        builder.addCase(getCountriesList.fulfilled, (state: ResourcesState, action) => {
            state.loading = false;
            state.status = action.payload.status;
            state.countryData = action.payload.data;
            state.message = action.payload.message;
        })
        builder.addCase(getCountriesList.rejected, (state: ResourcesState, action) => {
            state.loading = false
            state.error = action.payload as string
        })
    }
});

export default resourceslice.reducer;