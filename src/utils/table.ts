export const handleFilterColumn = (data: any, dataIndex: string) => {
  const filterData = data.map((item: any) => {
    return {
      text: item[dataIndex],
      value: item[dataIndex],
    };
  });
  return filterData;
};
