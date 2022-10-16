export const apiCall = async (url: string, options: RequestInit) => {
    let _options: RequestInit = {
        headers: {
            'Content-Type': 'application/json',
            'device-type': 'WEB',
            'accept': 'application/json',
            'Accept-Language': 'en'
        }
    }

    let temp = { ..._options.headers };
    if (options.headers) {
        temp = { ...options.headers };
    }

    _options = { ...options, ...options };
    _options.headers = temp;

    try {
        const response = await fetch(`/apicall${url}`, _options);
        if (!response.ok) {
            const error = await response.json();
            return { success: false, ...error };
        } else {
            const data = await response.json();
            return { success: true, ...data };
        }
    } catch (err) {
        return { success: false, message: "Error occured" }
    }
}