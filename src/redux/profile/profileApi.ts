import { apiCall } from "../apiCall";
import { GetProfileInterface } from "./profileActions";

export const getProile = async (params: GetProfileInterface) => {
    const requestOptions = {
        method: 'GET'
    };
    return apiCall(`/user/v1/profile/${params.username}`, requestOptions, true);
};

export const editClientProile = async (params: any) => {
    const requestOptions = {
        method: 'PATCH',
        body: JSON.stringify(params)
    };
    return apiCall(`/user/v1/profile/client`, requestOptions, true);
};

export const editFreelancerProile = async (params: any) => {
    const requestOptions = {
        method: 'PATCH',
        body: JSON.stringify(params)
    };
    return apiCall(`/user/v1/profile/freelancer`, requestOptions, true);
};
