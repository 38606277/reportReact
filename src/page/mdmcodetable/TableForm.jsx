import { Table, Form, message } from 'antd';
import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import styles from './style.less';
import InputEF from '../../components/EditForm/InputEF.jsx';
import styles2 from '../../components/EditForm/index.less';

const TableForm = forwardRef((props, ref) => {

    const { primaryKey, tableForm, value, onChange } = props;

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
            title: '字典编码',
            dataIndex: 'value_code',
            key: 'value_code',
            width: '40%',
            render: (text, record, index) => {
                return (
                    <InputEF
                        tableForm={tableForm}
                        text={text}
                        record={record}
                        index={record.value_id}
                        name="value_code"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                        handleFieldChange={handleFieldChange}
                        placeholder={"请输入成员姓名"}
                    />
                );
            },

        },
        {
            title: '字典名称',
            dataIndex: 'value_name',
            key: 'value_name',
            width: '40%',
            render: (text, record, index) => {
                return (
                    <InputEF
                        tableForm={tableForm}
                        text={text}
                        record={record}
                        index={record.value_id}
                        name="value_name"
                        rules={[{ required: true, message: 'Please input your workId!' }]}
                        handleFieldChange={handleFieldChange}
                        placeholder={"请输入工号"}
                    />
                );
            },
        },
        {
            title: '父ID',
            dataIndex: 'value_pid',
            key: 'value_pid',
            className:styles.columnshow,
            render: (text, record, index) => {
                return (
                  <InputEF
                  tableForm={tableForm}
                  text={text}
                  record={record}
                  index={record.value_id}
                  name="value_pid"
                  rules={[{ required: false, message: 'Please input your workId!' }]}
                  handleFieldChange={handleFieldChange}
                  placeholder={"请输入工号"}
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
                    rowKey={primaryKey}
                    columns={columns}
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
