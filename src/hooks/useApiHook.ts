import { type AxiosResponse, type Method } from "axios";
import apiInstance from "../utils/apiInstance";
import { getCookie } from "../utils/utils";

interface ApiParams {
  method?: Method;
  endPoint: string;
  data?: any;
  showToastMessage?: boolean;
  toastMessage?: string;
  responseType?: ResponseType;
  header?: Record<string, string>;
  needLoader?: boolean;
  loaderName?: string;
  fullResponse?: boolean;
  params?: Record<string, any>;
  showErrorToast?: boolean;
  attachAccessToken?: boolean;
}

interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  error_code?: string;
  statusCode?: number;
  [key: string]: unknown;
}

const useApiHook = () => {
  const api = <T = any>({
    method,
    endPoint,
    data,
    header = {},
    params,
    attachAccessToken = true,
  }: ApiParams): Promise<ApiResponse<T>> =>
    new Promise((resolve) => {
      const accessToken = getCookie("access_token");

      const headers = {
        ...(accessToken &&
          attachAccessToken && { Authorization: `Bearer ${accessToken}` }),
        ...(data instanceof FormData
          ? {}
          : { "Content-Type": "application/json" }),
        ...header,
      };

      apiInstance({
        method,
        url: endPoint,
        data,
        withCredentials: true,
        params,
        paramsSerializer: (params) => {
          const queryString = Object.entries(params)
            .flatMap(([key, value]) => {
              if (Array.isArray(value)) {
                // Repeat key for each value, without []
                return value.map(
                  (v) => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`
                );
              } else if (value !== undefined && value !== null) {
                return `${encodeURIComponent(key)}=${encodeURIComponent(
                  value
                )}`;
              } else {
                return [];
              }
            })
            .join("&");

          return queryString;
        },
        headers,
      })
        .then((response: AxiosResponse<T>) => {
          const { data } = response;
          return resolve({ success: true, data });
        })
        .catch((error) => {
          const { response, code } = error;

          if (response?.status === 401 || code === "ERR_NETWORK") {
            console.log(response);
          }

          return resolve({
            success: false,
            error: response?.data?.message,
            error_code: response?.data?.status_code,
            statusCode: response?.status,
            data: response?.data,
          });
        });
    });

  return { api };
};

export default useApiHook;
