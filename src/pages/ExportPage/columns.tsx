import { Status } from 'components/common/StatusTag';

export default () => {
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
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 3,
      editable: true,
    },
    {
      title: 'Available',
      dataIndex: 'available',
      key: 4,
      editable: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 5,
      editable: true,
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
