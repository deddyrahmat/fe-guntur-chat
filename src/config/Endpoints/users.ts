import Axios from '../Axios';

export default {
  detailUser: (config: object, id: any) =>
    Axios.get(`/user/${id}`, config).then((res) => res),
  searchUsers: (
    config: object,
    keyword: string,
    page: number,
    pageSize: number
  ) =>
    Axios.get(`/user/search/${keyword}/${page}/${pageSize}`, config).then(
      (res) => res
    ),
  findUserRole: (config: object) =>
    Axios.get(`/user/role/user`, config).then((res) => res),
  findUserRoleByEmail: (config: object, email: string) =>
    Axios.get(`/user/role/user/${email}`, config).then((res) => res),
};
