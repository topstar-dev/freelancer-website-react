import { fetchFileApi } from "../apiCall";
import { ImageDownloadInterface } from "./otherActions";

export const downloadImage = async (imageData: ImageDownloadInterface) => {
    const requestOptions = {
        headers: {
            "function-type": imageData.functionType
        }
    };
    return fetchFileApi(`/user/v1/image/${imageData.fileName}`, requestOptions);
};
