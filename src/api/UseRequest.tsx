// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AlertContext } from "../context/AlertContext";
import { useLoader } from "./../hooks/useLoader";
import axios, { AxiosError, AxiosResponse } from "axios";
import useToaster from "../hooks/useToaster";
import {
    ApiErrorResponse,
    ILogin,
} from "./../interfaces/ApiInterfaces";
import { IUser } from "./../interfaces/AuthInterface"
import { useAuth } from "./../context/AuthContext";
import { Endpoints } from "./routes";

export const useRequest = () => {
    //const { addAlert } = useContext(AlertContext);
    const { showLoader, hideLoader } = useLoader();
    const { notify } = useToaster()

    //#region AxiosConfig

    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    const { login, UserData, isAuthenticated } = useAuth();
    // Create an axios instance for the UserData endpoint
    const ApiTokenRequest = axios.create({
        baseURL: Endpoints.BaseURL + Endpoints.Api + Endpoints.login,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "POST",
    });

    // Create an axios instance for the other endpoints
    const ApiRequest = axios.create({
        baseURL: Endpoints.BaseURL + Endpoints.Api,
        headers: {
            "Content-Type": "application/json",
            ...(UserData?.auth.access_Token !== "" && UserData?.auth.access_Token !== undefined ? { Authorization: `Bearer ${UserData?.auth.access_Token}` } : {}),
            ...(process.env.REACT_APP_DEBUGG && { "ngrok-skip-browser-warning":"69420"})
        },
    });


    const ApiPostFileRequest = axios.create({
        baseURL: Endpoints.BaseURL + Endpoints.Api,
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${UserData?.auth.access_Token}`,
        },
    });


    const getRequest = async <T extends unknown>(
        endpoint: string,
        params?: object,
    ): Promise<T> => {
        showLoader();
        return await ApiRequest.get(endpoint, { params })
            .then(({ data }: AxiosResponse<T>) => data)
            .catch((error: AxiosError<ApiErrorResponse>) => {
                notify(
                    `Ha ocurrido un error al obtener los datos ${typeof error.response?.data === 'string' ? error.response?.data : error.message}`,
                    "error"
                )
                throw error;
            })
            .finally(() => {
                hideLoader();
            });
    };
    const deleteRequest = async <T extends unknown>(
        endpoint: string,
        params?: object,
    ): Promise<T> => {
        showLoader();
        return await ApiRequest.delete(endpoint, { params })
            .then(({ data }: AxiosResponse<T>) => {
                notify(
                    `${typeof data === 'string' ? data : "Registro eliminado exitosamente!"}`,
                    "success"
                )
                return data
            })
            .catch((error: AxiosError<ApiErrorResponse>) => {
                notify(
                    `Ha ocurrido un error al eliminar el registro ${typeof error.response?.data === 'string' ? error.response?.data : error.message}`,
                    "error"
                )
                throw error;
            })
            .finally(() => {
                hideLoader();
            });
    };
    const postRequest = async <T extends unknown>(
        endpoint: string,
        data?: object,
        params?: object
    ): Promise<T> => {
        showLoader();
        return await ApiRequest.post(endpoint, data, { params })
            .then(({ data }: AxiosResponse<T>) => {
                // Notificar que el registro fue exitoso
                endpoint != Endpoints.login && notify("El registro se ha completado exitosamente", "success");
                return data;
            })
            .catch((error: AxiosError<ApiErrorResponse>) => {
                console.log("error.....")
                console.log(error)
                notify(
                    `Ha ocurrido un error del sistema ${typeof error.response?.data === 'string' ? error.response?.data : error.message}`,
                    "error"
                )
                throw error;
            })
            .finally(() => {
                hideLoader();
            });
    };
    const putRequest = async <T extends unknown>(
        endpoint: string,
        data?: object,
        params?: object
    ): Promise<T> => {
        showLoader();
        return await ApiRequest.put(endpoint, data, { params })
            .then(({ data }: AxiosResponse<T>) => {
                notify(`${data ? data : "El registro se ha actualizado exitosamente"}`, "success");
                return data
            })
            .catch((error: AxiosError<ApiErrorResponse>) => {
                notify(
                    `Ha ocurrido un error al actualizar el registro! ${typeof error.response?.data === 'string' ? error.response?.data : error.message}`,
                    "error"
                )
                throw error;
            })
            .finally(() => {
                hideLoader();
            });
    };
    const postRequestToken = async <T extends IUser>(
        data: ILogin
    ): Promise<T> => {
        showLoader();
        return await ApiTokenRequest.request({
            data,
        })
            .then(({ data }: AxiosResponse<T>) => {
                login(data);
                console.log(data);
                return data;
            })
            .catch((error: AxiosError<ApiErrorResponse>) => {
                console.log(JSON.stringify(error, null, 3));
                throw error;
            })
            .finally(() => {
                hideLoader();
            });
    };

    const postFileRequest = async <T extends unknown>(
        endpoint: string,
        data?: object,
        params?: object
    ): Promise<T> => {
        showLoader();
        return await ApiPostFileRequest.post(endpoint, data, { params })
            .then(({ data }: AxiosResponse<T>) => data)
            .catch((error: AxiosError<ApiErrorResponse>) => {
                notify(
                    `Ha ocurrido un error del sistema ${typeof error.response?.data === 'string' ? error.response?.data : error.message}`,
                    "error"
                )
                throw error;
            })
            .finally(() => {
                hideLoader();
            });
    };

    return {
        getRequest,
        postRequestToken,
        postRequest,
        postFileRequest,
        putRequest,
        deleteRequest,
    };
};
