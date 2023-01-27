import { createAsyncThunk } from "@reduxjs/toolkit";
import { getJobFeedback } from "./jobFeedbackApi";

export interface GetJobFeedbackInterface {
    username: string,
    page_index?: number,
    page_size?: number
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