/* eslint-disable consistent-return */
import { toast } from 'react-toastify';

export default function errorHandler(error: any) {
  if (error) {
    let message;

    if (error.response) {
      if (error.response.data.statusCode === 400) {
        // jika status yang ditermia 400 maka munculkan toast error
        toast.error(error.response.data.message);
      }

      if (error.response.data.statusCode === 401) {
        // toast.error(error.response.data.message);
        toast.error('Waktu anda habis. Silahkan login ulang');
      }

      if (error.response.data.statusCode === 403) {
        // return JsCookie.remove("refreshToken");
        toast.error(error.response.data.message);
      }

      if (error.response.data.statusCode === 500) {
        // jika status yang ditermia 500 maka simpan message
        message = 'Something went terribly wrong';
      } else message = error.message;

      // jika tipe dari message string tampilkan pesan di console.log
      if (typeof message === 'string') console.log('message', message);

      // dan kembalikan error ke user
      return Promise.reject(error);
    }
  }
}
