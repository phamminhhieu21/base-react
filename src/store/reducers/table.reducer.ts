/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { getTableDataApi } from 'api/tableCrud.api';
import { notificationController } from 'controllers/notificationController';

interface dataItem {
  id: number;
  title: string;
  price: number;
  available: number;
  image: string;
  description: string;
  category: string;
}
interface tableState {
  isLoading: boolean;
  data: dataItem[];
  pagination: {
    page: number;
    pages: number;
    total: number;
    limit: number;
  };
}

const initialState: tableState = {
  isLoading: false,
  data: [],
  pagination: {
    page: 1,
    pages: 1,
    total: 0,
    limit: 10,
  },
};

const tableCrudSlice = createSlice({
  name: 'tableCrud',
  initialState,
  reducers: {
    setTableData: (state, action: PayloadAction<any>) => {
      state.data = action.payload.data;
      state.pagination = action.payload.pagination;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setTableData, setLoading } = tableCrudSlice.actions;
export const loadTableData = (payload: any) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const resp: any = await getTableDataApi(payload);
    if (resp && resp.code == 0) {
      const { page, limit, total, pages, output } = resp.data;
      dispatch(
        setTableData({
          data: output,
          pagination: {
            page,
            pages,
            total,
            limit,
          },
        }),
      );
      dispatch(setLoading(false));
    }
  } catch (error: any) {
    dispatch(setLoading(false));
    notificationController.error({
      message: error.message,
    });
  }
};

export const updateTableData = (payload: any) => async (dispatch: any) => {
  //
};

// selectors
export const tableDataSelector = createSelector(
  (state: any) => state.tableCrud,
  (tableCrud) => {
    return {
      data: tableCrud.data,
      pagination: tableCrud.pagination,
      isLoading : tableCrud.isLoading
    }
  },
);
// export const tableDataSelector = () => (state: any) => {
//   return {
//     data: state.tableCrud.data,
//     pagination: state.tableCrud.pagination,
//     isLoading: state.tableCrud.isLoading,
//   };
// };

export default tableCrudSlice.reducer;
