import { apiCall, fetchFileApi } from "../apiCall";
import { ImageDownloadInterface } from "./otherActions";

export const downloadImage = async (imageData: ImageDownloadInterface) => {
    const requestOptions = {};
    return fetchFileApi(`/user/v1/image/${imageData.fileName}?function_type=${imageData.functionType}`, requestOptions);
};

export const uploadImage = async (imageData: any) => {
    let formData = new FormData();
    formData.append('image', imageData.image.file, imageData.image.fileName);

    const requestOptions = {
        method: "POST",
        timeout: 0,
        headers: {
            'Content-Type': `multipart/form-data`,
            "function-type": imageData.functionType,
        },
        body: formData
    };
    return apiCall(`/user/v1/image`, requestOptions, true);
};
