import { apiCall } from "../apiCall";
import { GetCountriesInterface } from "./resourcesActions";

export const getCountries = (getCountriesParam: GetCountriesInterface | void) => {
    const requestOptions: RequestInit = {
        method: 'GET'
    };
    const queryString = getCountriesParam ? `?${new URLSearchParams(getCountriesParam as unknown as Record<string, any>).toString()}` : '';
    return apiCall(`/user/v1/countries${queryString}`, requestOptions);
};
