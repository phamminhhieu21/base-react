import React from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './Tables.styles';
import TableComponent from 'components/tables';
import { loadTableData, tableDataSelector } from 'store/reducers/table.reducer';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import tableColumns from './columns';

const ExportPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const {
    data: dataTable,
    pagination,
    isLoading,
  }: any = useAppSelector(tableDataSelector);
  const { limit, page, total } = pagination;

  useEffect(() => {
    dispatch(
      loadTableData({
        limit: 10,
        page: 1,
      }),
    );
  }, []);

  const handleTableChange = (tablePaging: any) => {
    console.log(tablePaging)
    if(tablePaging.current || tablePaging.pageSize){
      console.log(1)
      dispatch(
        loadTableData({
          limit: tablePaging.pageSize,
          page: tablePaging.current,
        }),
      );
    }
  };

  return (
    <>
      <S.TablesWrapper>
        <S.Card
          id="basic-table"
          title={t('tables.basicTable')}
          padding="1.25rem 1.25rem 0"
        >
          <div className='ml-3'>
            <p className='text-sm text-orange-500'>Total : {total}</p>
          </div>
          <TableComponent
            dataSource={dataTable}
            isTableEdit={true}
            columns={tableColumns}
            loading={isLoading}
            pagination={true}
            limit={limit}
            page={page}
            total={total}
            onChange={handleTableChange}
            showSizePagination={true}
            isShowTwoPaging={true}
          />
        </S.Card>
      </S.TablesWrapper>
    </>
  );
};

export default ExportPage;
