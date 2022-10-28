import { apiCall } from "../apiCall";
import { ImageDownloadInterface } from "./otherActions";

export const downloadImage = (imageData: ImageDownloadInterface) => {
    const requestOptions: RequestInit = {
        method: 'GET',
        headers: {
            "function-type": imageData.functionType,
            "file_name": imageData?.fileName.replace('/image/', ''),
            "Authorization": `Bearer ${localStorage.getItem('access_token')}`
        }
    };
    return apiCall(`/image/${imageData.fileName}`, requestOptions, 'blob');
};