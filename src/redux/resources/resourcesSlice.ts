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
    loading: boolean;
}

const initialState: ResourcesState = {
    language: selectedLanguage,
    message: null,
    countryData: {},
    loading: false
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
            state.loading = true
        })
        builder.addCase(getCountriesList.fulfilled, (state: ResourcesState, action) => {
            const temp = action.payload.data.records.map((c: any) => ({
                label: c.country_name,
                id: c.country_id
            }));
            state.countryData = {
                ...action.payload.data,
                records: temp
            }
            state.message = action.payload.message;
            state.loading = false
        })
        builder.addCase(getCountriesList.rejected, (state: ResourcesState, action) => {
            const payload = action.payload as ResourcesState;
            state.message = payload.message;
            state.loading = false
        })
    }
});

const { changeLanguage } = resourceslice.actions;
export { changeLanguage }
export default resourceslice.reducer;