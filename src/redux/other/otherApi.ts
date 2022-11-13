import { baseURL, defaultHeaders } from "../apiCall";
import { ImageDownloadInterface } from "./otherActions";

export const downloadImage = async (imageData: ImageDownloadInterface) => {
    try {
        const requestOptions: RequestInit = {
            method: 'GET',
            headers: {
                ...defaultHeaders(),
                "function-type": imageData.functionType
            }
        };
        const response = await fetch(`${baseURL}/user/v1/image/${imageData.fileName}`, requestOptions);
        const file = await response.blob();
        return { success: true, file };
    } catch (err: any) {
        return { success: false, ...err.response.data }
    }
};
