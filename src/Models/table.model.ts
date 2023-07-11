export interface ITableCell {
  id: string;
  title : string;
  price : number;
  available : number;
  image : string;
  description : string;
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