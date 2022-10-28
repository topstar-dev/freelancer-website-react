export const apiCall = async (url: string, options: RequestInit, type = 'json') => {
    let _options: RequestInit = {
        headers: {
            'Content-Type': 'application/json',
            'device-type': 'WEB',
            'accept': 'application/json',
            'Accept-Language': `${localStorage.getItem('i18nextLng')}`,
            "device_token": `${localStorage.getItem('device_token')}`,
            "access_token": `${localStorage.getItem('access_token')}`
        }
    }

    let temp = { ..._options.headers };
    if (options.headers) {
        temp = { ...options.headers };
    }

    _options = { ...options, ...options };
    _options.headers = temp;

    try {
        const response = await fetch(`${process.env.REACT_APP_PROXY_URL}${url}`, _options);
        if (!response.ok) {
            const error = await response.json();
            return { success: false, ...error };
        } else {
            if (type === 'json') {
                const data = await response.json();
                return { success: true, ...data };
            } else if (type === 'blob') {
                const file = await response.blob();
                return { success: true, file };
            }
        }
    } catch (err) {
        return { success: false, message: "Error occured" }
    }
}