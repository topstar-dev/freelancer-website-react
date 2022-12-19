import { apiCall } from "../apiCall";
import { GetCountriesInterface, GetLanguagesInterface } from "./resourcesActions";

export const getCountries = (getCountriesParam: GetCountriesInterface | void) => {
    const requestOptions: RequestInit = {
        method: 'GET'
    };
    const queryString = getCountriesParam ? `?${new URLSearchParams(getCountriesParam as unknown as Record<string, any>).toString()}` : '';
    return apiCall(`/user/v1/countries${queryString}`, requestOptions);
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
