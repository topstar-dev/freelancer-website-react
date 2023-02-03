import { createAsyncThunk } from "@reduxjs/toolkit";
import { languages } from "../../i18n/i18nextConf";
import { removeTokens, setTokens } from "../account/accountApi";
import { FUNCTION_TYPES } from "../constants";
import { imageDownload } from "../other/otherActions";
import { clearAvatar, clearProfile } from "../other/otherSlice";
import { changeLanguage } from "../resources/resourcesSlice";
import { signIn, signUp, sendEmailCode, checkEmailCode, resetPassword, accountInfo } from "./authApi";
export interface SignUpInterface {
    user_type: 'CLIENT' | 'FREELANCER';
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

export const getAccountInfo = createAsyncThunk(
    'user/getAccountInfo',
    async (params: any, { rejectWithValue }) => {
        try {
            const response = await accountInfo(params);
            return response.success ? response : rejectWithValue(response);
        } catch (error: any) {
            return rejectWithValue({ message: "Error occured" })
        }
    }
)

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
    async (signInData: SignInInterface, { rejectWithValue, dispatch }) => {
        try {
            const response = await signIn(signInData);
            await setTokens(response.data);
            if (response.success) {
                const currentLang = `${localStorage.getItem('i18nextLng')}`;
                if (currentLang !== response.data.language) {
                    dispatch(changeLanguage(languages.includes(response.data.language) ? response.data.language : 'en'))
                }
                if (response.data?.avatar_file_name) {
                    dispatch(imageDownload({ functionType: FUNCTION_TYPES.USER_AVATAR, fileName: response.data.avatar_file_name, isCurrentAvatar: true }))
                } else {
                    dispatch(clearAvatar());
                }
                dispatch(clearProfile());
            }
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
            await removeTokens();
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
