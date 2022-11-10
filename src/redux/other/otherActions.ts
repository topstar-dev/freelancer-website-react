import { createAsyncThunk } from "@reduxjs/toolkit";
import { downloadImage } from "./otherAPI";

export interface ImageDownloadInterface {
    functionType: string,
    fileName: string
}

export const imageDownload = createAsyncThunk(
    'other/downloadImage',
    async (imageData: ImageDownloadInterface, { rejectWithValue }) => {
        try {
            const response = await downloadImage(imageData);
            return response.success ? response : rejectWithValue(response);
        } catch (error: any) {
            return rejectWithValue({ message: "Error occured" })
        }
    }
)