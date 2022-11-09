import axios from "axios";
import { apiCall, baseURL } from "../apiCall";

export const setTokens = (data: any) => {
    localStorage.setItem('user-info', JSON.stringify(data));
}

export const removeTokens = (doRefresh: boolean = false) => {
    localStorage.removeItem('user-info')
    if (doRefresh) {
        window.location.reload();
    }
}

export const getuserDataFromStorage = () => {
    const userInfo = localStorage.getItem('user-info');
    if (userInfo) {
        try {
            const parseData = JSON.parse(userInfo);
            return parseData;
        } catch (err) {
            return null;
        }
    }
}

export const refreshToken = (previous: boolean, error?: any, cancelToken?: any) => {
    const userData = getuserDataFromStorage();
    const tempHeader: any = {};
    if (userData) {
        tempHeader['refresh-token'] = userData['refresh_token'];
        tempHeader['device-token'] = userData['device_token'];
        tempHeader['access-token'] = userData['access_token'];
    }

    return axios(`${baseURL}/refresh-token`, {
        method: 'post',
        cancelToken,
        headers: {
            'Content-Type': 'application/json',
            'device-type': 'WEB',
            'accept': 'application/json',
            'Accept-Language': `${localStorage.getItem('i18nextLng')}`,
            ...tempHeader
        }
    } as any).then(response => {
        setTokens(response.data.data);
        if (previous && error) {
            const { config } = error.response;
            return apiCall(config.url, {
                method: config.method,
                body: config.data,
                headers: config.headers
            } as any);
        } else {
            return Promise.resolve(response.data);
        }
    }).catch(error => {
        removeTokens(previous);
        return Promise.reject(error);
    })
}; 