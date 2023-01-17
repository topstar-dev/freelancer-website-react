import { createAsyncThunk } from "@reduxjs/toolkit";
import { editFreelancerProile, getFreelancerProile } from "./profileApi";

export interface GetFreelancerProfileInterface {
    username: string
}

export const getFreelancerProfileAction = createAsyncThunk(
    'profile/getFreelancerProfile',
    async (params: GetFreelancerProfileInterface, { rejectWithValue }) => {
        try {
            const response = await getFreelancerProile(params);
            return response.success ? response : rejectWithValue(response);
        } catch (error: any) {
            return rejectWithValue({ message: "Error occured" })
        }
    }
)

export const editFreelancerProfileAction = createAsyncThunk(
    'profile/editFreelancerProfile',
    async (params: any, { rejectWithValue }) => {
        try {
            const response = await editFreelancerProile(params);
            return response.success ? response : rejectWithValue(response);
        } catch (error: any) {
            return rejectWithValue({ message: "Error occured" })
        }
    }
)