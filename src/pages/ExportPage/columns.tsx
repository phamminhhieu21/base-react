import { Status } from 'components/common/StatusTag';
import { handleFilterColumn } from 'utils/table';

export default (dataSource : any ) => {

  return [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 1,
      editable: true,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 2,
      editable: true,
      filters : handleFilterColumn(dataSource, 'title'),
      onFilter : (value: string, record : any) => record.title.includes(value)
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 3,
      editable: true,
      sorter: (a: any, b: any) => a.price - b.price,
    },
    {
      title: 'Available',
      dataIndex: 'available',
      key: 4,
      editable: true,
      filters : handleFilterColumn(dataSource, 'available'),
    },
    {
      title: 'Category',
      dataIndex: 'categoryData',
      key: 6,
      render: (categoryData: any) => {
        return <Status color="#c5c5c5" text={categoryData?.value} />;
      },
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 7,
    },
  ];
};
