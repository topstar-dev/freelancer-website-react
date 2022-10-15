import { CheckEmailCodeInterface, SendEmailCodeInterface, SignInInterface, SignUpInterface } from "./authActions";

export const signUp = (signUpData: SignUpInterface) => {
    const requestOptions: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'device-type': 'WEB',
            'accept': 'application/json',
            'Accept-Language': 'en'
        },
        body: JSON.stringify(signUpData)
    };
    return fetch(`/apicall/sign-up`, requestOptions);
};

export const signIn = (signInData: SignInInterface) => {
    const requestOptions: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'device-type': 'WEB',
            'accept': 'application/json',
            'Accept-Language': 'en'
        },
        body: JSON.stringify(signInData)
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

export const sendEmailCode = (sendEmailObj: SendEmailCodeInterface) => {
    const requestOptions: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'Accept-Language': 'en'
        },
        body: JSON.stringify(sendEmailObj),
        credentials: "include"
    };
    return fetch(`/apicall/send-email-code`, requestOptions);
};

export const checkEmailCode = (checkEmailObj: CheckEmailCodeInterface) => {
    const requestOptions: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'Accept-Language': 'en'
        },
        body: JSON.stringify(checkEmailObj),
        credentials: "include"
    };
    return fetch(`/apicall/check-email-code`, requestOptions);
}; 