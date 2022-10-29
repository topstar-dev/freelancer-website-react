import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

export const setTokens = (data: any) => {
    localStorage.setItem('userInfo', JSON.stringify(data))
    localStorage.setItem('access-token', data.access_token)
    localStorage.setItem('refresh-token', data.refresh_token)
    localStorage.setItem('device-token', data.device_token)
}

export const removeTokens = () => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('access-token')
    localStorage.removeItem('refresh-token')
    localStorage.removeItem('device-token')
    // window.location.reload();
}

const service = axios.create({ baseURL })
service.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status !== 401) {
            return Promise.reject(error);
        }
        return axios(`${baseURL}/refresh-token`, {
            method: 'post',
            headers: {
                'device-type': 'WEB',
                'Accept-Language': `${localStorage.getItem('i18nextLng')}`,
                'refresh-token': localStorage.getItem('refresh-token')
            }
        } as any).then(response => {
            setTokens(response.data);
            const { config } = error.response;
            return apiCall(config.url, {
                method: config.method,
                body: config.data,
                headers: config.headers
            } as any);
        }).catch(error => {
            removeTokens();
            return Promise.reject(error);
        })
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