import { apiCall } from "../apiCall";
import { GetFreelancerProfileInterface } from "./profileActions";

export const getFreelancerProile = async (params: GetFreelancerProfileInterface) => {
    const requestOptions = {
        method: 'GET'
    };
    return apiCall(`/user/v1/profile/freelancer/${params.username}`, requestOptions, true);
};

export const editFreelancerProile = async (params: any) => {
    const requestOptions = {
        method: 'PATCH',
        body: JSON.stringify(params)
    };
    return apiCall(`/user/v1/profile/freelancer`, requestOptions, true);
};
