import { Table, Form, message } from 'antd';
import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import styles from './style.less';
import InputEF from '../../../components/EditForm/InputEF.jsx';
import SelectEF from '../../../components/EditForm/SelectEF.jsx';
import styles2 from '../../../components/EditForm/index.less';

const TableForm = forwardRef((props, ref) => {

    const { primaryKey, tableForm, value, onChange ,formName,setformName} = props;
    const [data, setData] = useState(value);
    const [selectedRows, setSelectedRows] = useState([]);
    const [deleteRecord, setDeleteRecord] = useState([]);//删除记录
    const [departmentDic, setDepartmentDic] = useState([]);

    useEffect(() => {
        setTimeout(3000);
        setDepartmentDic([
            {
                dict_id: '1',
                dict_name: "信息部",
            }, {
                dict_id: '2',
                dict_name: "财务部",
            }, {
                dict_id: '3',
                dict_name: "行政部",
            }
        ])

    }, []);

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
        },
        //手动初始化数据
        initData: (initData) => {
            setData(initData);
            if (onChange) {
                onChange(initData);
            }
        },
        //获取表格数据
        getTableData() {
            return data;
        },
        //获取删除行
        getDeleteData() {
            return deleteRecord;
        }
    }))


    const newMember = (newItem) => {
        const newData = data.map((item) => ({ ...item })) || [];
        newData.push(newItem);
        setData(newData);
    };

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
        setData(newData);
        let newDeleteRecord = deleteRecord.concat(selectedRows);
        setDeleteRecord(newDeleteRecord);
        setSelectedRows([]);

        if (onChange) {
            onChange(newData);
        }
    }

    const getRowByKey = (key, newData) =>
        (newData || data).filter((item) => item[primaryKey] === key)[0];

    const handleFieldChange = (
        filedValue,
        fieldName,
        record,
    ) => {
        console.log("List");
        let key = record[primaryKey];
        const newData = [...(data)];
        const target = getRowByKey(key, newData);
        if (target) {
            target[fieldName] = filedValue;
            setData(newData);
        }
        if (onChange) {
            onChange(newData);
        }
    };

    const columns = [
        {
            title: '字段名',
            dataIndex: 'name',
            key: 'name',
            width: '10%',
            render: (text, record, index) => {
                return (
                    <InputEF
                        tableForm={tableForm}
                        text={text}
                        record={record}
                        index={record.id}
                        name="name"
                        rules={[{ required: true, message: '请输入字段名!' }]}
                        handleFieldChange={handleFieldChange}
                        placeholder={"请输入字段名"}
                    />
                );
            },

        },
        {
            title: '当前表名',
            dataIndex: 'table_name',
            key: 'table_name',
            width: '10%',
            render: (text, record, index) => {
                return (
                    <InputEF
                        disabled
                        tableForm={tableForm}
                        text={formName}
                        record={record}
                        index={record.id}
                        name="table_name"
                        // rules={[{ required: true, message: 'Please input your workId!' }]}
                        // handleFieldChange={handleFieldChange}
                    />
                );
            },
        },
        {
            title: '字段名称',
            dataIndex: 'column_name',
            key: 'column_name',
            width: '10%',
            render: (text, record, index) => {
                return (
                    <InputEF
                        tableForm={tableForm}
                        text={text}
                        record={record}
                        index={record.id}
                        name="column_name"
                        rules={[{ required: true, message: '请输入字段名称' }]}
                        handleFieldChange={handleFieldChange}
                        placeholder={"字段名称"}
                    />
                );
            },
        },
        
        {
            title: '关联表',
            dataIndex: 'link_table_name',
            key: 'link_table_name',
            width: '10%',
            // className:styles.columnshow,
            render: (text, record, index) => {
                return (
                  <InputEF
                  tableForm={tableForm}
                  text={text}
                  record={record}
                  index={record.id}
                  name="link_table_name"
                  rules={[{ required: true, message: '请输入关联表名！' }]}
                  handleFieldChange={handleFieldChange}
                  placeholder={"关联表名"}
                />
              );

            },
        },
        {
            title: '关联字段',
            dataIndex: 'link_column_name',
            key: 'link_column_name',
            width: '10%',
            // className:styles.columnshow,
            render: (text, record, index) => {
                return (
                  <InputEF
                  tableForm={tableForm}
                  text={text}
                  record={record}
                  index={record.id}
                  name="link_column_name"
                  rules={[{ required: true, message: '请输入关联字段' }]}
                  handleFieldChange={handleFieldChange}
                  placeholder={""}
                />
              );

            },
        },
    ];

 
    return (
            <Form
                className={styles2.tableForm}
                key='tableForm'
                form={tableForm}>
                <Table
                    bordered={true}
                    rowKey={primaryKey}
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    rowSelection={{
                        columnWidth:"5%",
                        type: 'checkbox',
                        onChange: onTableChange,
                    }}
                />
            </Form>
    );
});
export default TableForm;
