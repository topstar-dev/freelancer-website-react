import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCountries } from "./resourcesApi";

export interface GetCountriesInterface {
    page_index: string,
    page_size: string
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