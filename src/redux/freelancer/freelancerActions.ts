import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFreelancerApplication, submitFreelancerApplication } from "./freelancerApi";

export interface FreelancerDataInterface {
    functionType: string,
    fileName: string
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
    async (freelancerData: FreelancerDataInterface, { rejectWithValue }) => {
        try {
            const response = await submitFreelancerApplication(freelancerData);
            return response.success ? response : rejectWithValue(response);
        } catch (error: any) {
            return rejectWithValue({ message: "Error occured" })
        }
    }
)