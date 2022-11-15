import { apiCall } from "../apiCall";

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

export const refreshToken = (error?: any, previous: boolean = false) => {
    const userData = getuserDataFromStorage();

    const requestConfigs: any = {
        method: 'post',
        headers: {
            'refresh-token': userData['refresh_token']
        }
    };

    return apiCall(`/user/v1/refresh-token`, requestConfigs, true).then(response => {
        if (response.success) {
            // setTokens(response.data);
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
        } else {
            // removeTokens(previous);
            return Promise.reject(error);
        }
    }).catch(error => {
        // removeTokens(previous);
        return Promise.reject(error);
    })
}; 