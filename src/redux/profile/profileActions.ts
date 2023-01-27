import { createAsyncThunk } from "@reduxjs/toolkit";
import { editClientProile, editFreelancerProile, getClientProile, getFreelancerProile } from "./profileApi";

export interface GetClientProfileInterface {
    username: string
}

export interface GetFreelancerProfileInterface {
    username: string
}

export const getClientProfileAction = createAsyncThunk(
    'profile/getClientProfile',
    async (params: GetClientProfileInterface, { rejectWithValue }) => {
        try {
            const response = await getClientProile(params);
            return response.success ? response : rejectWithValue(response);
        } catch (error: any) {
            return rejectWithValue({ message: "Error occured" })
        }
    }
)

export const editClientProfileAction = createAsyncThunk(
    'profile/editClientProfile',
    async (params: any, { rejectWithValue }) => {
        try {
            const response = await editClientProile(params);
            return response.success ? response : rejectWithValue(response);
        } catch (error: any) {
            return rejectWithValue({ message: "Error occured" })
        }
    }
)

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