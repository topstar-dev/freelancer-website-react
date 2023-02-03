import { createAsyncThunk } from "@reduxjs/toolkit";
import { downloadImage, uploadImage } from "./otherApi";

export interface ImageDownloadInterface {
    functionType: string,
    fileName: string,
    isCurrentAvatar?: boolean
}

export const imageDownload = createAsyncThunk(
    'other/downloadImage',
    async (imageData: ImageDownloadInterface, { rejectWithValue }) => {
        try {
            const response = await downloadImage(imageData);
            return response.success ? { ...response, functionType: imageData.functionType } : rejectWithValue({ ...response, functionType: imageData.functionType });
        } catch (error: any) {
            return rejectWithValue({ message: "Error occured" })
        }
    }
)

export const imageUpload = createAsyncThunk(
    'other/uploadImage',
    async (imageData: any, { rejectWithValue }) => {
        try {
            const response = await uploadImage(imageData);
            return response.success ? { ...response, functionType: imageData.functionType } : rejectWithValue({ ...response, functionType: imageData.functionType });
        } catch (error: any) {
            return rejectWithValue({ message: "Error occured" })
        }
    }
)