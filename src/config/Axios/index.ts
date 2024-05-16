import axios from 'axios';
import dataHandler from './dataHandler';
import errorHandler from './errorHandler';

const Axios = axios.create({
  baseURL: `${import.meta.env.VITE_URL_SERVER}`,
});

// saat axios menerima response, jika berhasil maka akan menampilkan response dan jika gagal akan eksekusi errorHandler
Axios.interceptors.response.use(
  (response) => dataHandler(response),
  errorHandler
);

export const setAuthToken = (token: string) => {
  if (token) {
    Axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete Axios.defaults.headers.common.Authorization;
  }
};

export default Axios;
