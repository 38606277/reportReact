import { Table, Form, message } from 'antd';
import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import InputEF from '@/components/EditForm/InputEF'
import SelectEF from '@/components/EditForm/SelectEF'

const TableForm = forwardRef((props, ref) => {

  const { primaryKey, tableForm, value, onChange, columns } = props;
  const [data, setData] = useState(value);
  const [selectedRows, setSelectedRows] = useState([]);

  const onTableChange = (selectedRowKeys, selectedRows) => {
    setSelectedRows(selectedRows);
  }


  //通过ref暴露函数
  useImperativeHandle(ref, () => ({
    addItem: (item) => {
      //新增一行
      newMember(item);
    },
    //删除选中项
    removeRows: () => {
      removeRows();
    }
  }))

  //新增一行
  const newMember = (newItem) => {
    console.log('newMember');
    const newData = data.map((item) => ({ ...item })) || [];
    newData.push(newItem);
    setData(newData);
    console.log('newMember end');
  };
  //移除选择项
  const removeRows = () => {
    if (selectedRows.length < 1) {
      message.error('请选择删除项');
      return;
    }
    const newData = data.filter(item => {
      let i;
      for (i = 0; i < selectedRows.length; i++) {
        if (selectedRows[i][primaryKey] === item[primaryKey]) {
          return false;
        }
      }
      return true;
    });
    setSelectedRows([]);
    setData(newData);
    if (onChange) {
      onChange(data);
    }
  }
  //根据key获取行
  const getRowByKey = (key, newData) =>
    (newData || data).filter((item) => item[primaryKey] === key)[0];

  //filed字段值修改回调
  const handleFieldChange = (
    filedValue,
    fieldName,
    record,
  ) => {
    const key = record[primaryKey]
    const newData = [...(data)];
    const target = getRowByKey(key, newData);
    if (target) {
      target[fieldName] = filedValue;
      setData(newData);
    }
    onChange(newData);
  };

  /**
   * 根据参数构建columns 
   * @param {} columnsParams 
   */
  const buildColumns = (columnParamsList) => {
    let newColmuns = [];
    let index;
    for (index = 0; index < columnParamsList.length; index++) {
      let columnParams = columnParamsList[index];
      if (columnParams.renderType === 'InputEF') {
        newColmuns.push(getInputEF(columnParams))
      } else if (columnParams.renderType === 'SelectEF') {
        newColmuns.push(getSelectEF(columnParams))
      }
    }
    return newColmuns;
  }

  const getInputEF = (columnParams) => {
    const { params } = columnParams;

    return {
      title: columnParams.title,
      dataIndex: columnParams.dataIndex,
      key: columnParams.key,
      width: columnParams.width,
      render: (text, record, index) => {
        return (
          <InputEF
            tableForm={tableForm}
            text={text}
            record={record}
            index={index}
            name={columnParams.key}
            handleFieldChange={handleFieldChange}
            rules={params.rules}
            placeholder={params.placeholder}
          />
        );
      },
    }
  }

  const getSelectEF = (columnParams) => {
    const { params } = columnParams;
    return {
      title: columnParams.title,
      dataIndex: columnParams.dataIndex,
      key: columnParams.key,
      width: columnParams.width,
      render: (text, record, index) => {
        return (
          <SelectEF
            tableForm={tableForm}
            text={text}
            record={record}
            index={index}
            name={columnParams.key}
            handleFieldChange={handleFieldChange}
            rules={params.rules}
            placeholder={params.placeholder}
            keyName={params.keyName}
            valueName={params.valueName}
            dictData={params.dictData}
          />
        );
      },
    }
  }

  return (
    <Form
      key='tableForm'
      form={tableForm}>
      <Table
        key={primaryKey}
        columns={buildColumns(columns)}
        dataSource={data}
        pagination={false}
        rowSelection={{
          type: 'checkbox',
          onChange: onTableChange,
        }}
      />
    </Form>
  );
});
export default TableForm;
