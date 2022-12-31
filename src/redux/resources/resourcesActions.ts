import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCities, getCountries, getCurrencies, getLanguages, getProvinces } from "./resourcesApi";

export interface GetCountriesInterface {
    page_index: number,
    page_size: number
}

export interface GetProvincesInterface {
    country_id: number;
    page_index?: number,
    page_size?: number
}

export interface GetCitiesInterface {
    province_id: number;
    page_index?: number,
    page_size?: number
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

export const getProvincesList = createAsyncThunk(
    'resources/getProvinces',
    async (provinceParams: GetProvincesInterface, { rejectWithValue }) => {
        try {
            const response = await getProvinces(provinceParams);
            return response.success ? response : rejectWithValue(response);
        } catch (error: any) {
            return rejectWithValue({ message: "Error occured" })
        }
    }
)

export const getCitiesList = createAsyncThunk(
    'resources/getCities',
    async (cityParams: GetCitiesInterface, { rejectWithValue }) => {
        try {
            const response = await getCities(cityParams);
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