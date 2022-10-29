import { apiCall } from "../apiCall";
import { CheckEmailCodeInterface, ResetPasswordInterface, SendEmailCodeInterface, SignInInterface, SignUpInterface } from "./authActions";

export const signUp = (signUpData: SignUpInterface) => {
    const requestOptions: RequestInit = {
        method: 'POST',
        body: JSON.stringify(signUpData)
    };
    return apiCall(`/sign-up`, requestOptions);
};

export const signIn = (signInData: SignInInterface) => {
    const requestOptions: RequestInit = {
        method: 'POST',
        body: JSON.stringify(signInData)
    };
    return apiCall(`/sign-in`, requestOptions);
};

export const resetPassword = (resetPasswordData: ResetPasswordInterface) => {
    const requestOptions: RequestInit = {
        method: 'POST',
        body: JSON.stringify(resetPasswordData)
    };
    return apiCall(`/reset-password`, requestOptions);
};

export const sendEmailCode = (sendEmailObj: SendEmailCodeInterface) => {
    const requestOptions: RequestInit = {
        method: 'POST',
        body: JSON.stringify(sendEmailObj)
    };
    return apiCall(`/send-email-code`, requestOptions);
};

export const checkEmailCode = (checkEmailObj: CheckEmailCodeInterface) => {
    const requestOptions: RequestInit = {
        method: 'POST',
        body: JSON.stringify(checkEmailObj)
    };
    return apiCall(`/check-email-code`, requestOptions);
}; 