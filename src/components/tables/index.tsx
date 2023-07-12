import React, { useState } from 'react';
import { BaseTable } from '../common/BaseTable/BaseTable';
import { BasePagination } from '../common/BasePagination/BasePagination';
import { TableWrapped } from './styled';
import { EditableCell } from './EditTableCell';
import { BaseForm } from 'components/common/forms/BaseForm/BaseForm';
import { ITableCell } from 'Models/table.model';
import { BaseSpace } from 'components/common/BaseSpace/BaseSpace';
import { BaseButton } from 'components/common/BaseButton/BaseButton';
import { BasePopconfirm } from 'components/common/BasePopconfirm/BasePopconfirm';
import { useTranslation } from 'react-i18next';
const TableComponent = ({
  limit = 20,
  page = 1,
  total = 0,
  dataSource = [],
  columns,
  loading = false,
  bordered = true,
  onChange,
  isTableEdit = false,
  pagination = false,
  showSizePagination = false,
  isShowTwoPaging = false,
  ...rest
}: any) => {
  const [form] = BaseForm.useForm();
  const [editingKey, setEditingKey] = useState<number | undefined>(0);
  const isEditing = (record: ITableCell) => record.id === editingKey;
  const { t } = useTranslation();
  const edit = (record: any) => {
    form.setFieldsValue({ name: '', age: '', address: '', ...record });
    setEditingKey(record.id);
  };

  // const save = async (key: React.Key) => {
  //   try {
  //     const row = (await form.validateFields()) as BasicTableRow;

  //     const newData = [...tableData.data];
  //     const index = newData.findIndex((item) => key === item.key);
  //     if (index > -1) {
  //       const item = newData[index];
  //       newData.splice(index, 1, {
  //         ...item,
  //         ...row,
  //       });
  //     } else {
  //       newData.push(row);
  //     }
  //     setTableData({ ...tableData, data: newData });
  //     setEditingKey(0);
  //   } catch (errInfo) {
  //     console.log('Validate Failed:', errInfo);
  //   }
  // };

  // const handleDeleteRow = (rowId: number) => {
  //   setTableData({
  //     ...tableData,
  //     data: tableData.data.filter(item => item.key !== rowId),
  //   });
  // };
  const cancel = () => {
    setEditingKey(0);
  };
  const mergedColumns = columns(dataSource)
    .map((col: any) => {
      if (col.dataIndex !== 'actions') {
        return col;
      }
      return {
        ...col,
        render: (text: string, record: ITableCell) => {
          const editable = isEditing(record);
          return (
            <BaseSpace>
              {editable ? (
                <>
                  <BaseButton type="primary">{t('common.save')}</BaseButton>
                  <BasePopconfirm
                    title={t('tables.cancelInfo')}
                    onConfirm={cancel}
                  >
                    <BaseButton type="ghost">{t('common.cancel')}</BaseButton>
                  </BasePopconfirm>
                </>
              ) : (
                <>
                  <BaseButton
                    type="ghost"
                    disabled={editingKey !== 0}
                    onClick={() => edit(record)}
                  >
                    {t('common.edit')}
                  </BaseButton>
                  <BaseButton
                    type="default"
                    danger
                    // onClick={() => handleDeleteRow(record.key)}
                  >
                    {t('tables.delete')}
                  </BaseButton>
                </>
              )}
            </BaseSpace>
          );
        },
      };
    })
    .map((col: any) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record: ITableCell) => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }),
      };
    });

  return (
    <TableWrapped>
      {pagination && isShowTwoPaging && (
        <BasePagination
          current={page}
          pageSize={limit}
          total={total}
          onChange={(current, size) => onChange({ current, pageSize: size })}
          showSizeChanger={showSizePagination}
        />
      )}
      {isTableEdit ? (
        <BaseForm form={form} component={false}>
          <BaseTable
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            dataSource={dataSource}
            columns={mergedColumns}
            loading={loading}
            onChange={onChange}
            bordered={bordered}
            pagination={false}
            {...rest}
          />
        </BaseForm>
      ) : (
        <BaseTable
          dataSource={dataSource}
          columns={columns}
          loading={loading}
          onChange={onChange}
          bordered={bordered}
          pagination={false}
          {...rest}
        />
      )}

      {pagination && (
        <BasePagination
          current={page}
          pageSize={limit}
          total={total}
          onChange={(current, size) => onChange({ current, pageSize: size })}
          showSizeChanger={showSizePagination}
        />
      )}
    </TableWrapped>
  );
};

export default TableComponent;
