import { createAsyncThunk } from "@reduxjs/toolkit";
import { changePassword, changePrimaryEmail, changeRecoveryEmail, deleteRecoveryEmail } from "./accountApi";

export interface ChangePasswordInterface {
    new_password: string;
    old_password: string;
}
export interface ChangePrimaryEmailInterface {
    email_code: string;
    new_email: string;
    password: string;
}
export interface ChangeRecoveryEmailInterface {
    email_code: string;
    new_email: string;
    password: string;
}
export interface DeleteRecoveryEmailInterface {
    password: string;
}

export const changePasswordAction = createAsyncThunk(
    'account/changePassword',
    async (args: ChangePasswordInterface, { rejectWithValue }) => {
        try {
            const response = await changePassword(args);
            return response.success ? response : rejectWithValue(response);
        } catch (error: any) {
            return rejectWithValue({ message: "Error occured" })
        }
    }
)

export const changePrimaryEmailAction = createAsyncThunk(
    'account/changePrimaryEmail',
    async (args: ChangePrimaryEmailInterface, { rejectWithValue }) => {
        try {
            const response = await changePrimaryEmail(args);
            return response.success ? response : rejectWithValue(response);
        } catch (error: any) {
            return rejectWithValue({ message: "Error occured" })
        }
    }
)

export const changeRecoveryEmailAction = createAsyncThunk(
    'account/changeRecoveryEmail',
    async (args: ChangeRecoveryEmailInterface, { rejectWithValue }) => {
        try {
            const response = await changeRecoveryEmail(args);
            return response.success ? response : rejectWithValue(response);
        } catch (error: any) {
            return rejectWithValue({ message: "Error occured" })
        }
    }
)

export const deleteRecoveryEmailAction = createAsyncThunk(
    'account/deleteRecoveryEmail',
    async (args: DeleteRecoveryEmailInterface, { rejectWithValue }) => {
        try {
            const response = await deleteRecoveryEmail(args);
            return response.success ? response : rejectWithValue(response);
        } catch (error: any) {
            return rejectWithValue({ message: "Error occured" })
        }
    }
)