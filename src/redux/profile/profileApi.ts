import { apiCall } from "../apiCall";
import { GetClientProfileInterface, GetFreelancerProfileInterface } from "./profileActions";

export const getClientProile = async (params: GetClientProfileInterface) => {
    const requestOptions = {
        method: 'GET'
    };
    return apiCall(`/user/v1/profile/client/${params.username}`, requestOptions, true);
};

export const editClientProile = async (params: any) => {
    const requestOptions = {
        method: 'PATCH',
        body: JSON.stringify(params)
    };
    return apiCall(`/user/v1/profile/client`, requestOptions, true);
};

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
