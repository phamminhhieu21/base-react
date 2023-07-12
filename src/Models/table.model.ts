export interface ITableCell {
  id: number;
  title : string;
  price : number;
  available : number;
  image : string;
  category : string;
}

export interface ITableData {
  code : string;
  data : {
    page : number;
    pages : number;
    total : number;
    limit : number;
    output : ITableCell[];
  };
}