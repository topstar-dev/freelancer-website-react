import { createSlice } from '@reduxjs/toolkit';
import { feedbackImageDownload, getJobFeedbackAction } from './jobFeedbackActions';

export interface JobFeedbackState {
    message?: string | null;
    loading: boolean;
    jobFeedbackData: any;
    jobFeedbackAvatars: any;
}

const initialState: JobFeedbackState = {
    loading: false,
    message: null,
    jobFeedbackData: null,
    jobFeedbackAvatars: {}
}

export const jobFeedbackSlice = createSlice({
    name: 'jobFeedback',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getJobFeedbackAction.pending, (state: JobFeedbackState) => {
            state.loading = true;
        });
        builder.addCase(getJobFeedbackAction.fulfilled, (state: JobFeedbackState, action) => {
            if (action.payload.success) {
                if (state.jobFeedbackData && state.jobFeedbackData.records) {
                    const feedbacks = [...state.jobFeedbackData.records.job_feedbacks]
                    const newValue: any = [];
                    action.payload.data.records.job_feedbacks.forEach((e: any) => {
                        const index = feedbacks.findIndex(f => f.feedback_id === e.feedback_id)
                        if (index === -1) {
                            newValue.push(e);
                        }
                    })
                    state.jobFeedbackData = {
                        ...action.payload.data,
                        records: {
                            ...state.jobFeedbackData.records,
                            job_feedbacks: [...feedbacks, ...newValue]
                        }
                    }
                } else {
                    state.jobFeedbackData = action.payload.data;
                }
            }
            state.loading = false;
        });
        builder.addCase(getJobFeedbackAction.rejected, (state: JobFeedbackState) => {
            state.loading = false
        });

        builder.addCase(feedbackImageDownload.fulfilled, (state: JobFeedbackState, action) => {
            if (action.payload.success) {
                state.jobFeedbackAvatars[action.meta.arg.fileName] = URL.createObjectURL(action.payload.file);
            }
        });
    }
});

export default jobFeedbackSlice.reducer;