import { createSlice } from '@reduxjs/toolkit';
import { currencySettings, personalSettings, SelectedCurrencyInterface } from './settingsActions';
import { PersonalDataInterface } from './settingsActions';

export interface SettingsState {
    loading: boolean;
    success: boolean,
    message: string | null,
    personal: PersonalDataInterface;
    selectedCurrency: SelectedCurrencyInterface
}

const initialState: SettingsState = {
    loading: false,
    success: false,
    message: null,
    personal: {},
    selectedCurrency: {
        currency_code: '',
        currency_name: '',
        currency_symbol: ''
    }
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //personal info
        builder.addCase(personalSettings.pending, (state: SettingsState, _action) => {
            state.loading = true;
            state.message = null;
        })
        builder.addCase(personalSettings.fulfilled, (state: SettingsState, action) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload.message;
            state.personal = action.payload.data;
        })
        builder.addCase(personalSettings.rejected, (state: SettingsState, action) => {
            const payload = action.payload as SettingsState;
            state.success = false;
            state.loading = false;
            state.message = payload.message;
        })

        //currency info
        builder.addCase(currencySettings.pending, (state: SettingsState, _action) => {
            state.loading = true;
            state.message = null;
        })
        builder.addCase(currencySettings.fulfilled, (state: SettingsState, action) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload.message;
            state.selectedCurrency = action.payload.data;
        })
        builder.addCase(currencySettings.rejected, (state: SettingsState, action) => {
            const payload = action.payload as SettingsState;
            state.success = false;
            state.loading = false;
            state.message = payload.message;
        })
    }
});

export default settingsSlice.reducer;