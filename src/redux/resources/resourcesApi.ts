import { apiCall } from "../apiCall";
import { GetCitiesInterface, GetCountriesInterface, GetLanguagesInterface, GetProvincesInterface } from "./resourcesActions";

export const getCountries = (getCountriesParam: GetCountriesInterface | void) => {
    const requestOptions: RequestInit = {
        method: 'GET'
    };
    const queryString = getCountriesParam ? `?${new URLSearchParams(getCountriesParam as unknown as Record<string, any>).toString()}` : '';
    return apiCall(`/user/v1/countries${queryString}`, requestOptions);
};

export const getProvinces = (getProvincesParam: GetProvincesInterface) => {
    const requestOptions: RequestInit = {
        method: 'GET'
    };
    const queryString = getProvincesParam ? `?${new URLSearchParams(getProvincesParam as unknown as Record<string, any>).toString()}` : '';
    return apiCall(`/user/v1/provinces${queryString}`, requestOptions);
};

export const getCities = (getCitiesParam: GetCitiesInterface) => {
    const requestOptions: RequestInit = {
        method: 'GET'
    };
    const queryString = getCitiesParam ? `?${new URLSearchParams(getCitiesParam as unknown as Record<string, any>).toString()}` : '';
    return apiCall(`/user/v1/cities${queryString}`, requestOptions);
};

export const getCurrencies = () => {
    const requestOptions: RequestInit = {
        method: 'GET'
    };
    return apiCall(`/user/v1/currencies`, requestOptions);
};

export const getLanguages = (getLanguagesParam: GetLanguagesInterface | void) => {
    const requestOptions: RequestInit = {
        method: 'GET'
    };
    const queryString = getLanguagesParam ? `?${new URLSearchParams(getLanguagesParam as unknown as Record<string, any>).toString()}` : '';
    return apiCall(`/user/v1/languages${queryString}`, requestOptions);
};
