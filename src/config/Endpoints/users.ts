import Axios from '../Axios';

export default {
  createUsers: (body: string, config: object) =>
    Axios.post('/user', body, config).then((res) => res),
  detailUser: (config: object, id: any) =>
    Axios.get(`/user/${id}`, config).then((res) => res),
  findUserRole: (config: object) =>
    Axios.get(`/user/role/user`, config).then((res) => res),
  findUserRoleByEmail: (config: object, email: string) =>
    Axios.get(`/user/role/user/${email}`, config).then((res) => res),
};
