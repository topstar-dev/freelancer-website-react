import { apiCall } from "../apiCall";
import { GetJobFeedbackInterface } from "./jobFeedbackActions";

export const getJobFeedback = async (params: GetJobFeedbackInterface) => {
    const requestOptions = {
        method: 'GET'
    };
    const queryString = `?${new URLSearchParams(params as unknown as Record<string, any>).toString()}`;
    return apiCall(`/user/v1/job-feedback${queryString}`, requestOptions, true);
};