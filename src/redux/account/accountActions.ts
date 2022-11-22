import { createAsyncThunk } from "@reduxjs/toolkit";
import { changePassword } from "./accountApi";

export interface ChangePasswordInterface {
    new_password: string;
    old_password: string;
}

export const changePasswordAction = createAsyncThunk(
    'account/changePassword',
    async (args: ChangePasswordInterface, { rejectWithValue }) => {
        try {
            console.log(args)
            const response = await changePassword(args);
            return response.success ? response : rejectWithValue(response);
        } catch (error: any) {
            return rejectWithValue({ message: "Error occured" })
        }
    }
)