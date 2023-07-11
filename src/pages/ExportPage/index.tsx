import React from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './Tables.styles';
import { BasicTable } from './components/tables/BasicTable/BasicTable';
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
  console.log('dataTable', dataTable);
  const { limit, page, total } = pagination;
  useEffect(() => {
    dispatch(
      loadTableData({
        limit: 20,
        page: 1,
      }),
    );
  }, []);

  return (
    <>
      <S.TablesWrapper>
        <S.Card
          id="basic-table"
          title={t('tables.basicTable')}
          padding="1.25rem 1.25rem 0"
        >
          <TableComponent
            dataSource={dataTable}
            isTableEdit={true}
            columns={tableColumns}
            loading={isLoading}
            pagination={true}
            limit={limit}
            page={page}
            total={total}
          />
        </S.Card>
      </S.TablesWrapper>
    </>
  );
};

export default ExportPage;
