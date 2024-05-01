import Axios from '../Axios';

export default {
  createMessage: (body: any, config: object) =>
    Axios.post('/message', body, config).then((res) => res),
};
