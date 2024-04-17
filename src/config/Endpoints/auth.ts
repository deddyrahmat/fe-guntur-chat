import Axios from '../Axios';

export default {
  Login: (body: string, config: object) =>
    Axios.post('/auth/login', body, config).then((res) => res),
};
