import {customHttp} from "./httpConfiguration";

export const getRequest = async (url, params) => {
    return await customHttp.get(url, { params });
};

export const postRequest = async (url, params, options = null) => {
    return await customHttp.post(url, params, options);
};

export const putRequest = async (url, params) => {
    return await customHttp.put(url, params);
};

export const patchRequest = async (url, params) => {
    return await customHttp.patch(url, params);
};

export const deleteRequest = async (url, body = null) => {
    return await customHttp.delete(url, { data: body });
};

