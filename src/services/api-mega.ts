import axios from 'axios';

import ConnectionErrorModalHandler from '@/components/modals/connectionErrorModal/handler';
import InternalServerErrorModalHandler from '@/components/modals/internalServerErrorModal/handler';
import NotAllowedModalHandler from '@/components/modals/notAllowedModal/handler';
import UnauthorizedModalHandler from '@/components/modals/unauthorizedModal/handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AppError } from './AppError';

// const baseURL = 'https://abbb-45-191-206-66.ngrok-free.app/';
const baseURL = 'https://prd-megabem-api.azurewebsites.net/api/v1';

const api = axios.create({
  baseURL,
});

function handleConnectionError() {
  ConnectionErrorModalHandler.showModal();
}

function handleServerError(error: any) {
  switch (error.response.status) {
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
  async config => {
    const token = await AsyncStorage.getItem('@megabem:token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    console.log({ api: error });
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const repnseApi = error?.response?.data?.errors[0];
    console.log({ api: repnseApi });
    if (!error.response) {
      handleConnectionError();
    } else {
      handleServerError(error);
    }

    if (repnseApi) {
      return Promise.reject(new AppError(repnseApi));
    }
    return Promise.reject(error);
  },
);
const apiMega = api;
export { apiMega };
