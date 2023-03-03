import { apiCall } from "../apiCall";
import { RecommendedFreelancersInterface } from "./freelancerActions";

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

export const getRecommendedFreelancers = async (parmas: RecommendedFreelancersInterface) => {
    const requestOptions: RequestInit = {
        method: 'GET'
    };
    const queryString = parmas ? `?${new URLSearchParams(parmas as unknown as Record<string, any>).toString()}` : '';
    return apiCall(`/user/v1/recommended-freelancers${queryString}`, requestOptions, true);
};
