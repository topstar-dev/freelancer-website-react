import { apiCall } from "../apiCall";
import { GetFreelancerProfileInterface } from "./profileActions";

export const getFreelancerProile = async (params: GetFreelancerProfileInterface) => {
    const requestOptions = {
        method: 'GET'
    };
    return apiCall(`/user/v1/profile/freelancer/${params.username}`, requestOptions);
};
