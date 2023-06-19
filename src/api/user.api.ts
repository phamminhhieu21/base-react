import { httpApi } from 'api/http.api';

export interface updateUserCurrentRequest {
  name?: string | null;
  email?: string | null;
  phone_number?: string | null;
  date_of_birth?: string | null;
  gender?: string | null;
  avatar?: string | null;
}

export const getUserCurrentApi = (idUser: string): Promise<any> =>
  httpApi.post<any>(`/api/v1/user/${idUser}`).then((resp: any) => resp.data);

export const updateUserCurrentApi = (
  payload: updateUserCurrentRequest,
): Promise<any> =>
  httpApi
    .put<any>(`/api/v1/user/update-profile`, {
      ...payload,
    })
    .then((resp: any) => resp.data);
