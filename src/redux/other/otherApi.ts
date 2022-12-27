import { fetchFileApi } from "../apiCall";
import { ImageDownloadInterface } from "./otherActions";

export const downloadImage = async (imageData: ImageDownloadInterface) => {
    const requestOptions = {};
    return fetchFileApi(`/user/v1/image/${imageData.fileName}?function_type=${imageData.functionType}`, requestOptions);
};
