import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearAvatar } from "../other/otherSlice";
import { signIn, signUp, sendEmailCode, checkEmailCode, resetPassword } from "./authApi";

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

export interface ResetPasswordInterface {
    email: string,
    code: string,
    password: string
}

export const signUpUser = createAsyncThunk(
    'user/signup',
    async (signUpData: SignUpInterface, { rejectWithValue }) => {
        try {
            const response = await signUp(signUpData);
            return response.success ? response : rejectWithValue(response);
        } catch (error: any) {
            return rejectWithValue({ message: "Error occured" })
        }
    }
)

export const signInUser = createAsyncThunk(
    'user/signin',
    async (signInData: SignInInterface, { rejectWithValue }) => {
        try {
            const response = await signIn(signInData);
            return response.success ? response : rejectWithValue(response);
        } catch (error: any) {
            return rejectWithValue({ message: "Error occured" })
        }
    }
)

export const signOutUser = createAsyncThunk(
    'user/signout',
    async (arg: void, { rejectWithValue, dispatch }) => {
        try {
            dispatch(clearAvatar());
            const response = {
                success: true,
                message: "header-user-signout-message"
            }
            return response;
        } catch (error: any) {
            return rejectWithValue({ message: "Error occured" })
        }
    }
)

export const resetPasswordUser = createAsyncThunk(
    'user/resetPassword',
    async (resetPasswordData: ResetPasswordInterface, { rejectWithValue }) => {
        try {
            const response = await resetPassword(resetPasswordData);
            return response.success ? response : rejectWithValue(response);
        } catch (error: any) {
            return rejectWithValue({ message: "Error occured" })
        }
    }
)

export const sendCodeToEmail = createAsyncThunk(
    'user/sendEmailCode',
    async (sendEmailObj: SendEmailCodeInterface, { rejectWithValue }) => {
        try {
            const response = await sendEmailCode(sendEmailObj);
            return response.success ? response : rejectWithValue(response);
        } catch (error: any) {
            return rejectWithValue({ message: "Error occured" })
        }
    }
)

export const checkCodeOfEmail = createAsyncThunk(
    'user/checkEmailCode',
    async (checkEmailObj: CheckEmailCodeInterface, { rejectWithValue }) => {
        try {
            const response = await checkEmailCode(checkEmailObj);
            return response.success ? response : rejectWithValue(response);
        } catch (error: any) {
            return rejectWithValue({ message: "Error occured" })
        }
    }
)
