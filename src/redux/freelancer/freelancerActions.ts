import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFreelancerApplication, getRecommendedFreelancers, submitFreelancerApplication } from "./freelancerApi";

export interface FreelancerDataInterface {
    functionType: string,
    fileName: string
}

export interface RecommendedFreelancersInterface {
    req_type: string;
    page_index?: number,
    page_size?: number
}

export const getFreelancerApplicationAction = createAsyncThunk(
    'freelancer/getApplication',
    async (args: void, { rejectWithValue }) => {
        try {
            const response = await getFreelancerApplication();
            return response.success ? response : rejectWithValue(response);
        } catch (error: any) {
            return rejectWithValue({ message: "Error occured" })
        }
    }
)

export const submitFreelancerApplicationAction = createAsyncThunk(
    'freelancer/submitApplication',
    async (freelancerData: void, { rejectWithValue }) => {
        try {
            const response = await submitFreelancerApplication();
            return response.success ? response : rejectWithValue(response);
        } catch (error: any) {
            return rejectWithValue({ message: "Error occured" })
        }
    }
)

export const getRecommendedFreelancersAction = createAsyncThunk(
    'freelancer/getRecommendedFreelancers',
    async (params: RecommendedFreelancersInterface, { rejectWithValue }) => {
        try {
            const response = await getRecommendedFreelancers(params);
            return response.success ? response : rejectWithValue(response);
        } catch (error: any) {
            return rejectWithValue({ message: "Error occured" })
        }
    }
)