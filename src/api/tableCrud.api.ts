import { httpApi } from 'api/http.api';
import { ITableData } from 'Models/table.model';
import { parseParamsToQueryString } from 'utils/object';
export const getTableDataApi = (payload: any): Promise<ITableData> => {
  const q = parseParamsToQueryString(payload);
  return httpApi
    .get<any>(`/api/v1/book?${q}`)
    .then((resp: any) => resp.data);
};
