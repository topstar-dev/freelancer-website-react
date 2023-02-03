import { createAsyncThunk } from "@reduxjs/toolkit";
import { downloadImage } from "../other/otherApi";
import { getJobFeedback } from "./jobFeedbackApi";

export interface GetJobFeedbackInterface {
    username: string;
    page_index?: number;
    page_size?: number;
}

export interface FeedbackImageDownloadInterface {
    functionType: string;
    fileName: string;
}

export const getJobFeedbackAction = createAsyncThunk(
    'jobFeedback/getJobFeedback',
    async (params: GetJobFeedbackInterface, { rejectWithValue }) => {
        try {
            const response = await getJobFeedback(params);
            return response.success ? response : rejectWithValue(response);
        } catch (error: any) {
            return rejectWithValue({ message: "Error occured" })
        }
    }
)

export const feedbackImageDownload = createAsyncThunk(
    'jobFeedback/downloadImage',
    async (imageData: FeedbackImageDownloadInterface, { rejectWithValue }) => {
        try {
            const response = await downloadImage(imageData);
            return response.success ? { ...response, functionType: imageData.functionType } : rejectWithValue({ ...response, functionType: imageData.functionType });
        } catch (error: any) {
            return rejectWithValue({ message: "Error occured" })
        }
    }
)