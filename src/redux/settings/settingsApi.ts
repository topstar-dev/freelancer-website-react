import { apiCall } from "../apiCall";
import { UpdateCurrencyDataInterface, UpdatePersonalDataInterface } from "./settingsActions";

export const getPersonalSettings = () => {
    const requestOptions: RequestInit = {
        method: 'GET'
    };
    return apiCall(`/user/v1/settings/personal`, requestOptions, true);
};

export const setPersonalSettings = (personalData: UpdatePersonalDataInterface) => {
    const requestOptions: RequestInit = {
        method: 'PATCH',
        body: JSON.stringify(personalData)
    };
    return apiCall(`/user/v1/settings/personal`, requestOptions, true);
};

export const getCurrencySettings = () => {
    const requestOptions: RequestInit = {
        method: 'GET'
    };
    return apiCall(`/user/v1/settings/currency`, requestOptions, true);
};

export const setCurrencySettings = (currencyData: UpdateCurrencyDataInterface) => {
    const requestOptions: RequestInit = {
        method: 'PUT',
        body: JSON.stringify(currencyData)
    };
    return apiCall(`/user/v1/settings/currency`, requestOptions, true);
};


export const getSecuritySettings = () => {
    const requestOptions: RequestInit = {
        method: 'GET'
    };
    return apiCall(`/user/v1/settings/security`, requestOptions, true);
};