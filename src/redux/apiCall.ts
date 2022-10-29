import axios from 'axios';
import { refreshToken } from './account/accountAPI';

export const baseURL = process.env.REACT_APP_BASE_URL;

const service = axios.create({ baseURL })
service.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status !== 401) {
            return Promise.reject(error);
        }
        return refreshToken(true, error)
    }
);

export const apiCall = async (url: string, options: RequestInit, type = 'json') => {
    let headers: any = {
        'Content-Type': 'application/json',
        'device-type': 'WEB',
        'accept': 'application/json',
        'Accept-Language': `${localStorage.getItem('i18nextLng')}`
    }

    if (options.headers) {
        headers = { ...headers, ...options.headers };
    }

    if (localStorage.getItem('access-token') && localStorage.getItem('refresh-token') && localStorage.getItem('device-token')) {
        headers = {
            ...headers,
            "device-token": `${localStorage.getItem('device-token')} `,
            "access-token": `${localStorage.getItem('access-token')} `
        }
    }

    try {
        let response: any;
        if (type === 'blob') {
            response = await fetch(`${process.env.REACT_APP_BASE_URL}${url}`, {
                ...options,
                headers: {
                    ...headers
                }
            });
        } else {
            response = await service({
                method: options.method,
                data: options.body,
                url: `${url} `,
                headers: {
                    ...headers
                }
            });
        }
        if (type === 'blob') {
            const file = await response.blob();
            return { success: true, file };
        }
        return { success: true, ...response.data };
    } catch (err: any) {
        return { success: false, ...err.response.data }
    }
}