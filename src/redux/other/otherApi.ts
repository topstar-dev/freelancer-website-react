import { apiCall } from "../apiCall";
import { ImageDownloadInterface } from "./otherActions";

export const downloadImage = (imageData: ImageDownloadInterface) => {
    const requestOptions: RequestInit = {
        method: 'GET',
        headers: {
            "function-type": imageData.functionType
        }
    };
    return apiCall(`/user/v1/image/${imageData.fileName}`, requestOptions, false, 'blob');
};
