import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export const apiCall = async (url: string, options: RequestInit, type = 'json') => {
    let headers: any = {
        'Content-Type': 'application/json',
        'device-type': 'WEB',
        'accept': 'application/json',
        'Accept-Language': `${localStorage.getItem('i18nextLng')}`
    }

    if (localStorage.getItem('access_token') && localStorage.getItem('refresh_token') && localStorage.getItem('device_token')) {
        headers = {
            ...headers,
            "device_token": `${localStorage.getItem('device_token')} `,
            "access_token": `${localStorage.getItem('access_token')} `
        }
    }

    if (options.headers) {
        headers = { ...headers, ...options.headers };
    }

    try {
        const response: any = await axios({
            method: options.method,
            data: options.body,
            url: `${url} `,
            headers: {
                ...headers
            }
        });
        if (response.status !== 200) {
            return { success: false };
        } else {
            if (type === 'json') {
                return { success: true, ...response.data };
            } else if (type === 'blob') {
                return { success: true, file: response.data };
            }
        }
    } catch (err) {
        return { success: false, message: "Error occured" }
    }
}