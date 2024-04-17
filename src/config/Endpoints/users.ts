import Axios from '../Axios';

export default {
  createUsers: (body: string, config: object) =>
    Axios.post('/user', body, config).then((res) => res),
  detailUser: (config: object, id: any) =>
    Axios.get(`/user/${id}`, config).then((res) => res),
};
