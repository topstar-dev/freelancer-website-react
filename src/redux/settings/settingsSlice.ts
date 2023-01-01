import { createSlice } from '@reduxjs/toolkit';
import { currencySettings, personalSettings, personalSettingsUpdate, SecurityInterface, securitySettings, SelectedCurrencyInterface } from './settingsActions';
import { PersonalDataInterface } from './settingsActions';

export interface SettingsState {
    loading: boolean;
    success: boolean,
    message: string | null,
    personal: PersonalDataInterface;
    selectedCurrency: SelectedCurrencyInterface,
    security: SecurityInterface
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
    },
    security: {
        password_change_time: '',
        recovery_email: ''
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

        //personal info
        builder.addCase(personalSettingsUpdate.fulfilled, (state: SettingsState, action) => {
            state.personal = {};
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

        //security info
        builder.addCase(securitySettings.pending, (state: SettingsState, _action) => {
            state.loading = true;
            state.message = null;
        })
        builder.addCase(securitySettings.fulfilled, (state: SettingsState, action) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload.message;
            state.security = action.payload.data;
        })
        builder.addCase(securitySettings.rejected, (state: SettingsState, action) => {
            const payload = action.payload as SettingsState;
            state.success = false;
            state.loading = false;
            state.message = payload.message;
        })
    }
});

export default settingsSlice.reducer;