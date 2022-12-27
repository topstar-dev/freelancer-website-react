import { apiCall } from "../apiCall";
import { FreelancerDataInterface } from "./freelancerActions";

export const getFreelancerApplication = async () => {
    const requestOptions: RequestInit = {
        method: 'GET'
    };
    return apiCall(`/user/v1/apply-freelancer`, requestOptions, true);
};

export const submitFreelancerApplication = async (freelancerData: FreelancerDataInterface) => {
    const requestOptions: RequestInit = {
        method: 'POST',
        body: JSON.stringify(freelancerData)
    };
    return apiCall(`/user/v1/apply-freelancer`, requestOptions, true);
};
