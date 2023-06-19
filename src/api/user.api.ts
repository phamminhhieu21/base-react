import { httpApi } from 'api/http.api';

export const getUserCurrentApi = (idUser: string): Promise<any> =>
  httpApi.post<any>(`/api/v1/user/${idUser}`).then((resp: any) => resp.data);
