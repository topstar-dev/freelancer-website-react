import { apiCall } from "../apiCall";

export const getFreelancerApplication = async () => {
    const requestOptions: RequestInit = {
        method: 'GET'
    };
    return apiCall(`/user/v1/apply-freelancer`, requestOptions, true);
};

export const submitFreelancerApplication = async () => {
    const requestOptions: RequestInit = {
        method: 'POST'
    };
    return apiCall(`/user/v1/apply-freelancer`, requestOptions, true);
};
