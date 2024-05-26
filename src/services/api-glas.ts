import axios from "axios";

import ConnectionErrorModalHandler from "@/components/modals/connectionErrorModal/handler";
import InternalServerErrorModalHandler from "@/components/modals/internalServerErrorModal/handler";
import NotAllowedModalHandler from "@/components/modals/notAllowedModal/handler";
import UnauthorizedModalHandler from "@/components/modals/unauthorizedModal/handler";
import { AppError } from "./AppError";

const api = axios.create({
  baseURL: process.env.EXPO_API_GLAS,
  headers: {
    Authorization: `Bearer ${process.env.EXPO_ACCESS_TOKEN}`
  }
});

function handleConnectionError() {
  ConnectionErrorModalHandler.showModal();
}

function handleServerError(error: any) {
  switch (error.response.status) {
    // case 400:
    //   UnauthorizedModalHandler.showModal();
    //   break;
    case 401:
      UnauthorizedModalHandler.showModal();
      break;
    case 403:
      NotAllowedModalHandler.showModal();
      break;
    case 500:
    case 503:
      InternalServerErrorModalHandler.showModal();
  }
}


api.interceptors.request.use(
  async (config) => {

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log({ api: error?.resposnse })
    const repnseApi = error?.response?.data?.errors[0]
    if (!error.response) {
      handleConnectionError();
    } else {
      handleServerError(error);
    }

    if (repnseApi) {
      return Promise.reject(new AppError(repnseApi))
    }
    return Promise.reject(error);
  }
);
const api_glas = api
export { api_glas };

