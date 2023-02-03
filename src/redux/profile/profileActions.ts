import { createAsyncThunk } from "@reduxjs/toolkit";
import { downloadImage } from "../other/otherApi";
import { editClientProile, editFreelancerProile, getProile } from "./profileApi";

export interface GetProfileInterface {
    username: string
}

export interface ProfileImageDownloadInterface {
    functionType: string,
    fileName: string
}

export const getProfileAction = createAsyncThunk(
    'profile/getProfile',
    async (params: GetProfileInterface, { rejectWithValue }) => {
        try {
            const response = await getProile(params);
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

export const profileImageDownload = createAsyncThunk(
    'profile/downloadImage',
    async (imageData: ProfileImageDownloadInterface, { rejectWithValue }) => {
        try {
            const response = await downloadImage(imageData);
            return response.success ? { ...response, functionType: imageData.functionType } : rejectWithValue({ ...response, functionType: imageData.functionType });
        } catch (error: any) {
            return rejectWithValue({ message: "Error occured" })
        }
    }
)