import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrencySettings, getPersonalSettings, getSecuritySettings, setCurrencySettings, setPersonalSettings } from "./settingsApi";

export interface PersonalDataInterface {
    birthday?: string;
    gender?: string;
    language_code?: string;
    language_name?: string;
    primary_email?: string;
}

export type UpdatePersonalDataInterface = Omit<PersonalDataInterface, "language_name" | "primary_email">

export interface SelectedCurrencyInterface {
    currency_code: string;
    currency_name: string;
    currency_symbol: string
}

export interface UpdateCurrencyDataInterface {
    currency_code: string;
}

export const personalSettings = createAsyncThunk(
    'settings/personal',
    async (args: void, { rejectWithValue }) => {
        try {
            const response = await getPersonalSettings();
            return response.success ? response : rejectWithValue(response);
        } catch (error: any) {
            return rejectWithValue({ message: "Error occured" })
        }
    }
)

export const personalSettingsUpdate = createAsyncThunk(
    'settings/personalUpdate',
    async (args: UpdatePersonalDataInterface, { rejectWithValue }) => {
        try {
            const response = await setPersonalSettings(args);
            return response.success ? response : rejectWithValue(response);
        } catch (error: any) {
            return rejectWithValue({ message: "Error occured" })
        }
    }
)

export const currencySettings = createAsyncThunk(
    'settings/currency',
    async (args: void, { rejectWithValue }) => {
        try {
            const response = await getCurrencySettings();
            return response.success ? response : rejectWithValue(response);
        } catch (error: any) {
            return rejectWithValue({ message: "Error occured" })
        }
    }
)

export const currencySettingsUpdate = createAsyncThunk(
    'settings/currencyUpdate',
    async (args: UpdateCurrencyDataInterface, { rejectWithValue }) => {
        try {
            const response = await setCurrencySettings(args);
            return response.success ? response : rejectWithValue(response);
        } catch (error: any) {
            return rejectWithValue({ message: "Error occured" })
        }
    }
)

export const securitySettings = createAsyncThunk(
    'settings/security',
    async (args: void, { rejectWithValue }) => {
        try {
            const response = await getSecuritySettings();
            return response.success ? response : rejectWithValue(response);
        } catch (error: any) {
            return rejectWithValue({ message: "Error occured" })
        }
    }
)
