import { httpApi } from 'api/http.api';
import {ITableData} from 'Models/table.model';

export const getTableDataApi = (payload: any): Promise<ITableData> =>
  httpApi.get<any>(`/api/v1/book`, payload).then((resp: any) => resp.data);
