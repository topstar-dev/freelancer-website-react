import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export const apiCall = async (url: string, options: RequestInit, type = 'json') => {
    let headers: any = {
        'Content-Type': 'application/json',
        'device-type': 'WEB',
        'accept': 'application/json',
        'Accept-Language': `${localStorage.getItem('i18nextLng')}`
    }

    if (localStorage.getItem('access-token') && localStorage.getItem('refresh-token') && localStorage.getItem('device-token')) {
        headers = {
            ...headers,
            "device-token": `${localStorage.getItem('device-token')} `,
            "access-token": `${localStorage.getItem('access-token')} `
        }
    }

    if (options.headers) {
        headers = { ...headers, ...options.headers };
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
            response = await axios({
                method: options.method,
                data: options.body,
                url: `${url} `,
                headers: {
                    ...headers
                }
            });
        }
        if (response.status !== 200) {
            return { success: false };
        } else {
            if (type === 'blob') {
                const file = await response.blob();
                return { success: true, file };
            }
            return { success: true, ...response.data };
        }
    } catch (err: any) {
        return { success: false, ...err.response.data }
    }
}