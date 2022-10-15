import { createAsyncThunk } from "@reduxjs/toolkit";
import { signIn, signOut, signUp, sendEmailCode, checkEmailCode } from "./authAPI";

export interface SignUpInterface {
    account_type: 'CLIENT' | 'FREELANCER';
    first_name: string;
    last_name: string;
    birthday: string;
    country_id: number;
    password: string;
    primary_email: string;
    email_code: string;
}

export interface SignInInterface {
    email: string;
    password: string;
}

export interface SendEmailCodeInterface {
    email: string;
    function_type: string;
}

export interface CheckEmailCodeInterface extends SendEmailCodeInterface {
    code: string;
}

export const signUpUser = createAsyncThunk(
    'user/signup',
    async (signInData: SignUpInterface, { rejectWithValue }) => {
        try {
            const response = await signUp(signInData);
            const userData = await response.json();
            return { status: response.status, ...userData };
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }

    }
)

export const signInUser = createAsyncThunk(
    'user/signin',
    async (signInData: SignInInterface, { rejectWithValue }) => {
        try {
            const response = await signIn(signInData);
            const userData = await response.json();
            return { status: response.status, ...userData };
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }

    }
)

export const signOutUser = createAsyncThunk(
    'user/signout',
    async (arg: void, { rejectWithValue }) => {
        try {
            const response = await signOut();
            const data = await response.json();
            return { status: response.status, ...data };
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }

    }
)

export const sendCodeToEmail = createAsyncThunk(
    'user/sendEmailCode',
    async (sendEmailObj: SendEmailCodeInterface, { rejectWithValue }) => {
        try {
            const response = await sendEmailCode(sendEmailObj);
            const userData = await response.json();
            return { status: response.status, ...userData };
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }

    }
)

export const checkCodeOfEmail = createAsyncThunk(
    'user/checkEmailCode',
    async (checkEmailObj: CheckEmailCodeInterface, { rejectWithValue }) => {
        try {
            const response = await checkEmailCode(checkEmailObj);
            const userData = await response.json();
            return { status: response.status, ...userData };
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }

    }
)
