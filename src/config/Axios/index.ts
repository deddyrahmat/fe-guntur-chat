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

export default Axios;
