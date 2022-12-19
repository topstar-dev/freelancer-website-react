import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCountries, getCurrencies, getLanguages } from "./resourcesApi";

export interface GetCountriesInterface {
    page_index: number,
    page_size: number
}

export interface GetLanguagesInterface {
    page_index: number,
    page_size: number
}

export const getCountriesList = createAsyncThunk(
    'resources/getCountries',
    async (countriesData: GetCountriesInterface | void, { rejectWithValue }) => {
        try {
            const response = await getCountries(countriesData);
            return response.success ? response : rejectWithValue(response);
        } catch (error: any) {
            return rejectWithValue({ message: "Error occured" })
        }
    }
)

export const getCurrencyList = createAsyncThunk(
    'resources/getCurrency',
    async (arg: void, { rejectWithValue }) => {
        try {
            const response = await getCurrencies();
            return response.success ? response : rejectWithValue(response);
        } catch (error: any) {
            return rejectWithValue({ message: "Error occured" })
        }
    }
)

export const getLanguageList = createAsyncThunk(
    'resources/getLanguage',
    async (languageData: GetLanguagesInterface | void, { rejectWithValue }) => {
        try {
            const response = await getLanguages();
            return response.success ? response : rejectWithValue(response);
        } catch (error: any) {
            return rejectWithValue({ message: "Error occured" })
        }
    }
)