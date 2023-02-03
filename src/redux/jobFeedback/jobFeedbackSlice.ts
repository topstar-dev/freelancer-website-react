import { createSlice } from '@reduxjs/toolkit';
import { feedbackImageDownload } from './jobFeedbackActions';

export interface JobFeedbackState {
    message?: string | null;
    jobFeedbackAvatars: any;
}

const initialState: JobFeedbackState = {
    message: null,
    jobFeedbackAvatars: {}
}

export const jobFeedbackSlice = createSlice({
    name: 'jobFeedback',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(feedbackImageDownload.fulfilled, (state: JobFeedbackState, action) => {
            if (action.payload.success) {
                state.jobFeedbackAvatars[action.meta.arg.fileName] = URL.createObjectURL(action.payload.file);
            }
        });
    }
});

export default jobFeedbackSlice.reducer;