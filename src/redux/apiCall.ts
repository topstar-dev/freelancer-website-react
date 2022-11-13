import axios from 'axios';
import { getuserDataFromStorage, refreshToken } from './account/accountAPI';

export const baseURL = `${process.env.REACT_APP_BASE_URL}`;

export const defaultHeaders = () => ({
    'Content-Type': 'application/json',
    'device-type': 'WEB',
    'accept': 'application/json',
    'Accept-Language': `${localStorage.getItem('i18nextLng')}`
})

const service = axios.create({
    baseURL,
    timeout: 30000
})
service.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status !== 401) {
            return Promise.reject(error);
        }
        return refreshToken(true, error)
    }
);

export const apiCall = async (url: string, options: RequestInit, authRequired = false) => {
    let headers: any = {
        ...defaultHeaders()
    }

    if (options.headers) {
        headers = { ...headers, ...options.headers };
    }

    const userData = getuserDataFromStorage();
    if (userData && authRequired) {
        headers = {
            ...headers,
            "device-token": `${userData['device_token']} `,
            "access-token": `${userData['access_token']} `
        }
    }

    try {
        const response = await service({
            method: options.method,
            data: options.body,
            url: `${url} `,
            headers: {
                ...headers
            }
        });
        return { success: true, ...response.data };
    } catch (err: any) {
        return { success: false, ...err.response.data }
    }
}