import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCountries } from "./resourcesAPI";

export interface GetCountriesInterface {
    page_index: string,
    page_size: string
}

export const getCountriesList = createAsyncThunk(
    'resources/getCountries',
    async (countriesData: GetCountriesInterface | void, { rejectWithValue }) => {
        try {
            const response = await getCountries(countriesData);
            const countryData = await response.json();
            return { status: response.status, ...countryData };
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }

    }
)