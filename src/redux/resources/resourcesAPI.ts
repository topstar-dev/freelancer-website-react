import { GetCountriesInterface } from "./resourcesActions";

export const getCountries = (getCountriesParam: GetCountriesInterface | void) => {
    const requestOptions: RequestInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'device-type': 'WEB',
            'accept': 'application/json',
            'Accept-Language': 'en'
        }
    };
    const queryString = getCountriesParam ? `?${new URLSearchParams(getCountriesParam as unknown as Record<string, string>).toString()}` : '';
    return fetch(`/apicall/countries${queryString}`, requestOptions);
};