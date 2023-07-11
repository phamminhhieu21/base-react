import { updateUserCurrentRequest } from 'Models/user.model';
import { httpApi, httpUploadApi } from 'api/http.api';



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
