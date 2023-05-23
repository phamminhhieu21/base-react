declare namespace Types {
  export interface IResponseData<T = any> {
    is_error: boolean;
    message: string;
    type: string;
    data: T;
  }

  export interface IGetDrawingsParams {
    page: number | string;
    page_size: number | string;
  }

  export interface IGetDrawingsResponseData {
    // number of total records
    count: number;
    // link to next page
    next: Types.Nullable<string>;
    // link to previous page
    previous: Types.Nullable<string>;
    // list of result records
    results: Types.IDrawing[];
  }

  export interface IGetDrawingItemsParams {
    page: string | number;
    page_size: string | number;
  }

  export interface IGetDrawingItemsResponseData {
    // number of total records
    count: number;
    // link to next page
    next: Types.Nullable<string>;
    // link to previous page
    previous: Types.Nullable<string>;
    // list of result records
    results: Types.IDrawingItems[];
  }

  export type IGetDrawingsResponse = IResponseData<IGetDrawingsResponseData>;

  export type IGetDrawingDetailResponse = IResponseData<Types.IDrawing>;
  export type IGetDrawingItemsResponse =
    IResponseData<IGetDrawingItemsResponseData>;
}
