import { API_BASE_URL } from "@/consts/apiConfig";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

const get = <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return axiosInstance.get(url, config);
};

const post = <T, U>(
  url: string,
  data?: T,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<U>> => {
  return axiosInstance.post(url, data, config);
};

const put = <T, U>(
  url: string,
  data?: T,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<U>> => {
  return axiosInstance.put(url, data, config);
};

const patch = <T, U>(
  url: string,
  data?: T,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<U>> => {
  return axiosInstance.patch(url, data, config);
};

const _delete = <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return axiosInstance.delete(url, config);
};

const api = {
  get,
  post,
  put,
  patch,
  delete: _delete,
};

export default api;
