import { createAsyncThunk } from "@reduxjs/toolkit";
import { getStarUser, starUser, deleteStarUser } from "./starApi";

export const getStarUserAction = createAsyncThunk(
    'star/getStarUsers',
    async (params: Object | void, { rejectWithValue }) => {
        try {
            const response = await getStarUser(params);
            return response.success ? response : rejectWithValue(response);
        } catch (error: any) {
            return rejectWithValue({ message: "Error occured" })
        }
    }
)

export const starUserAction = createAsyncThunk(
    'star/starUser',
    async (username: string, { rejectWithValue }) => {
        try {
            const response = await starUser(username);
            return response.success ? response : rejectWithValue(response);
        } catch (error: any) {
            return rejectWithValue({ message: "Error occured" })
        }
    }
)

export const deleteStarUserAction = createAsyncThunk(
    'star/deleteStarUser',
    async (username: string, { rejectWithValue }) => {
        try {
            const response = await deleteStarUser(username);
            return response.success ? response : rejectWithValue(response);
        } catch (error: any) {
            return rejectWithValue({ message: "Error occured" })
        }
    }
)