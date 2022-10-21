import { apiCall } from "../apiCall";
import { ImageDownloadInterface } from "./otherActions";

interface ImageHeaderInterface extends RequestInit {
    'function-type': string
}
export const downloadImage = (imageData: ImageDownloadInterface) => {
    const requestOptions: ImageHeaderInterface = {
        method: 'GET',
        "function-type": imageData.functionType
    };
    return apiCall(`/image/${imageData.fileName}`, requestOptions);
};