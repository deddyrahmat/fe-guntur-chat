import { setAuthToken } from '../config/Axios';
import storeRedux from './store';

let currentAuth: any;

function listener() {
  const previousAuth = currentAuth;
  currentAuth = storeRedux.getState().auth;
  if (currentAuth !== previousAuth) {
    localStorage.setItem('auth', JSON.stringify(currentAuth));
    setAuthToken(currentAuth.token);
  }
}

function listen() {
  storeRedux.subscribe(listener);
}

export default listen;
