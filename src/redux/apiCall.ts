import axios from 'axios';
import { getuserDataFromStorage, refreshToken } from './account/accountApi';

export const baseURL = `${process.env.REACT_APP_BASE_URL}`;

export const service = axios.create({
    baseURL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        'device-type': 'WEB'
    }
})

service.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status !== 401 || error.config.url.includes('/refresh-token')) {
            return Promise.reject(error);
        }
        return refreshToken(true, error)
    }
);

const commonHeaders = (options: any, authRequired: boolean = false) => {
    let headers: any = {
        'Accept-Language': `${localStorage.getItem('i18nextLng')}`
    }

    if (options.headers) {
        headers = { ...headers, ...options.headers };
    }

    const userData = getuserDataFromStorage();
    if (userData && authRequired) {
        headers = {
            ...headers,
            "refresh-token": `${userData['refresh_token']} `,
            "device-token": `${userData['device_token']} `,
            "access-token": `${userData['access_token']} `
        }
    }

    return headers;
}

export const apiCall = async (url: string, options: RequestInit, authRequired = false) => {
    try {
        const requestOptions = {
            method: options.method,
            data: options.body,
            url: `${url} `,
            headers: {
                ...commonHeaders(options, authRequired)
            }
        }
        const response = await service(requestOptions);

        const result = typeof response.data === 'string' ? { data: response.data } : response.data;
        return { success: true, ...result };
    } catch (err: any) {
        return { success: false, ...err.response.data }
    }
}

export const fetchFileApi = async (url: string, options: RequestInit, authRequired = false) => {
    try {
        const response = await fetch(`${baseURL}${url}`, { ...options, headers: { ...commonHeaders(options) } });
        const file = await response.blob();
        return { success: true, file };
    } catch (err: any) {
        return { success: false, ...err.response.data }
    }
}