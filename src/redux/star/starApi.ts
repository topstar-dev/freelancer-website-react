import { apiCall } from "../apiCall";

export const getStarUser = (params: any) => {
    const requestOptions: RequestInit = {
        method: 'GET'
    };
    const queryString = params ? `?${new URLSearchParams(params as unknown as Record<string, any>).toString()}` : '';
    return apiCall(`/user/v1/star/users${queryString}`, requestOptions, true);
};

export const starUser = (username: string) => {
    const requestOptions: RequestInit = {
        method: 'POST',
        body: JSON.stringify({ username })
    };
    return apiCall(`/user/v1/star/user`, requestOptions, true);
};

export const deleteStarUser = (username: string) => {
    const requestOptions: RequestInit = {
        method: 'DELETE'
    };
    return apiCall(`/user/v1/star/user/${username}`, requestOptions, true);
};
