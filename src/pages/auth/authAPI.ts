export const signIn = (email: string, password: string) => {
    const requestOptions: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'device-type': 'WEB',
            'accept': 'application/json',
            'Accept-Language': 'en'
        },
        body: JSON.stringify({ email, password })
    };
    return fetch(`/apicall/sign-in`, requestOptions);
};

export const signOut = () => {
    const requestOptions: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'device-type': 'WEB',
            'accept': 'application/json',
            'Accept-Language': 'en'
        },
        credentials: "include"
    };
    return fetch(`/apicall/sign-out`, requestOptions);
}; 