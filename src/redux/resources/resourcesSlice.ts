import { createSlice } from '@reduxjs/toolkit';
import { getCountriesList } from './resourcesActions';

// initialize userToken from local storage
var selectedLanguage = localStorage.getItem('i18nextLng') || 'en';

export interface CountryData {
    page_size?: number;
    total_size?: number;
    records?: []
}

export interface ResourcesState {
    message?: string | null,
    language: string,
    countryData: CountryData;
}

const initialState: ResourcesState = {
    language: selectedLanguage,
    message: null,
    countryData: {}
}

export const resourceslice = createSlice({
    name: 'resources',
    initialState,
    reducers: {
        changeLanguage: (state, action) => {
            state.language = action.payload;
            state.countryData = {};
            localStorage.setItem('i18nextLng', action.payload);
        }
    },
    extraReducers: (builder) => {
        //getCountries
        builder.addCase(getCountriesList.pending, (state: ResourcesState, _action) => {
        })
        builder.addCase(getCountriesList.fulfilled, (state: ResourcesState, action) => {
            state.countryData = action.payload.data;
            state.message = action.payload.message;
        })
        builder.addCase(getCountriesList.rejected, (state: ResourcesState, action) => {
            const payload = action.payload as ResourcesState;
            state.message = payload.message;
        })
    }
});

const { changeLanguage } = resourceslice.actions;
export { changeLanguage }
export default resourceslice.reducer;