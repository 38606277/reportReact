import { Table, Form, message,Checkbox } from 'antd';
import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import styles from './style.less';
import InputEF from '../../../components/EditForm/InputEF.jsx';
import styles2 from '../../../components/EditForm/index.less';
import SelectEF from '../../../components/EditForm/SelectEF.jsx';
import InputNumberEF from '../../../components/EditForm/InputNumberEF.jsx'
import Check from './Check.jsx'
const TableForm = forwardRef((props, ref) => {
    const Obj={
        "Hive":[
            {value:"TINYINT",text:"TINYINT"},
            {value:"SMALLINT",text:"SMALLINT"},
            {value:"INT",text:"INT"},
            {value:"BIGINT",text:"BIGINT"},
            {value:"FLOAT",text:"FLOAT"},
            {value:"DOUBLE",text:"DOUBLE"},
            {value:"DECIMAL",text:"DECIMAL"},
            {value:"TIMESTAMP",text:"TIMESTAMP"},
            {value:"DATE",text:"DATE"},
            {value:"INTERVAL",text:"INTERVAL"},
            {value:"STRING",text:"STRING"},
            {value:"VARCHAR",text:"VARCHAR"},
            {value:"CHAR",text:"CHAR"},
            {value:"BOOLEAN",text:"BOOLEAN"},
            {value:"BINARY",text:"BINARY"},
            {value:"ARRAY",text:"ARRAY"},
            {value:"MAP",text:"MAP"},
            {value:"STRUCT",text:"STRUCT"},
            {value:"UNIONTYPE",text:"UNIONTYPE"}
        ],
        "hbase":[
            {value:"INTEGER",text:"INTEGER"},
            {value:"UNSIGNED_INT",text:"UNSIGNED_INT"},
            {value:"BIGINT",text:"BIGINT"},
            {value:"UNSIGNED_LONG",text:"UNSIGNED_LONG"},
            {value:"TINYINT",text:"TINYINT"},
            {value:"UNSIGNED_TINYINT",text:"UNSIGNED_TINYINT"},
            {value:"SMALLINT",text:"SMALLINT"},
            {value:"UNSIGNED_SMALLINT",text:"UNSIGNED_SMALLINT"},
            {value:"FLOAT",text:"FLOAT"},
            {value:"UNSIGNED_FLOAT",text:"UNSIGNED_FLOAT"},
            {value:"DOUBLE",text:"DOUBLE"},
            {value:"UNSIGNED_DOUBLE",text:"UNSIGNED_DOUBLE"},
            {value:"DECIMAL",text:"DECIMAL"},
            {value:"BOOLEAN",text:"BOOLEAN"},
            {value:"TIME",text:"TIME"},
            {value:"DATE",text:"DATE"},
            {value:"TIMESTAMP",text:"TIMESTAMP"},
            {value:"UNSIGNED_TIME",text:"UNSIGNED_TIME"},
            {value:"UNSIGNED_DATE",text:"UNSIGNED_DATE"},
            {value:"UNSIGNED_TIMESTAMP",text:"UNSIGNED_TIMESTAMP"},
            {value:"VARCHAR",text:"VARCHAR"},
            {value:"CHAR",text:"CHAR"},
            {value:"BINARY",text:"BINARY"},
            {value:"VARBINARY",text:"VARBINARY"},
            {value:"ARRAY",text:"ARRAY"},
        ],
        "Mysql":[
            {value:"tinyint",text:"tinyint"},
            {value:"varchar",text:"varchar"},
            {value:"smallint",text:"smallint"},
            {value:"mediumint",text:"mediumint"},
            {value:"int",text:"int"},
            {value:"integer",text:"integer"},
            {value:"bigint",text:"bigint"}, {value:"bit",text:"bit"},   {value:"real",text:"real"},
            {value:"double",text:"double"},
            {value:"float",text:"float"},
            {value:"decimal",text:"decimal"},
            {value:"numeric",text:"numeric"},
            {value:"char",text:"char"},
            {value:"date",text:"date"},
            {value:"time",text:"time"},
            {value:"year",text:"year"},
            {value:"timestamp",text:"timestamp"},
            {value:"datetime",text:"datetime"},
            {value:"tinyblob",text:"tinyblob"},
            {value:"blob",text:"blob"},{value:"mediumblob",text:"mediumblob"},
            {value:"longblob",text:"longblob"},{value:"tinytext",text:"tinytext"},{value:"text",text:"text"},
            {value:"mediumtext",text:"mediumtext"},
            {value:"longtext",text:"longtext"},
            {value:"enum",text:"enum"},
            {value:"set",text:"set"},
            {value:"binary",text:"binary"},
            {value:"varbinary",text:"varbinary"},
            {value:"point",text:"point"},
            {value:"linestring",text:"linestring"},
            {value:"polygon",text:"polygon"},
            {value:"geometry",text:"geometry"},
            {value:"multipoint",text:"multipoint"},
            {value:"multilinestring",text:"multilinestring"},
            {value:"multipolygon",text:"multipolygon"},
            {value:"geometrycollection",text:"geometrycollection"} 
        ]

    }
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
        ]);


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
            dataIndex: 'column_name',
            key: 'column_name',
            width: '10%',
            render: (text, record, index) => {
                return (
                    <InputEF
                        tableForm={tableForm}
                        text={text}
                        record={record}
                        index={record.value_id}
                        name="column_name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                        handleFieldChange={handleFieldChange}
                        placeholder={"请输入字段名"}
                    />
                );
            },

        },
        {
            title: '中文名',
            dataIndex: 'column_title',
            key: 'column_title',
            width: '10%',
            render: (text, record, index) => {
                return (
                    <InputEF
                        tableForm={tableForm}
                        text={text}
                        record={record}
                        index={record.value_id}
                        name="column_title"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                        handleFieldChange={handleFieldChange}
                        placeholder={"请输入字段名"}
                    />
                );
            },

        },
        {
            title: '类型',
            dataIndex: 'column_type',
            key: 'column_type',
            width: '10%',
            render: (text, record, index) => {
                return (
                    <SelectEF
                        tableForm={tableForm}
                        defaultValue={{value:"varbinary"}}
                        text={text}
                        record={record}
                        dictData={[...Obj['Mysql']]}
                        index={record.value_id}
                        keyName={'value'}
                        valueName={'text'}
                        name="column_type"
                        rules={[{ required: true, message: 'Please input your workId!' }]}
                        handleFieldChange={handleFieldChange}
                        placeholder={"请选择"}
                    />
                );
            },
        },
        {
            title: '长度',
            dataIndex: 'column_length',
            key: 'column_length',
            width: '10%',
            className:styles.columnshow,
            render: (text, record, index) => {
                // if(record.column_type){
                //     text=255
                //     console.log("默认值")
                // }
                return (
                  <InputNumberEF
                  tableForm={tableForm}
                  text={text}
                  record={record}
                  index={record.value_id}
                  name="column_length"
                  rules={[{ required: true, message: 'Please input your workId!' }]}
                  handleFieldChange={handleFieldChange}
                  placeholder={"请输入长度"}
                />
              );

            },
        },
        {
            title: '精度',
            dataIndex: 'column_decimal',
            key: 'column_decimal',
            width: '10%',
            render: (text, record, index) => {
                return (
                    <InputNumberEF
                        tableForm={tableForm}
                        text={text}
                        record={record}
                        index={record.value_id}
                        name="column_decimal"
                        rules={[{ required: true, message: 'Please input your workId!' }]}
                        handleFieldChange={handleFieldChange}
                        placeholder={"请输入精度"}
                  />
                );
            },
        },
        {
            title: '键',
            dataIndex: 'column_primaryKey',
            key: 'column_primaryKey',
            width: '10%',
            name:"column_primaryKey",
            className:styles.columnshow,
            render: (text, record, index) => {
                return (
                    <Check tableForm={tableForm} name="column_primaryKey" text={text} handleFieldChange={handleFieldChange} record={record}/>
                //   <InputEF
                //   tableForm={tableForm}
                //   text={text}
                //   record={record}
                //   index={record[primaryKey]}
                //   name="column_isnull"
                //   rules={[{ required: false, message: 'Please input your workId!' }]}
                //   handleFieldChange={handleFieldChange}
                //   placeholder={"是否为空"}
                // />
              );

            },
        },
        {
            title: '是否为空',
            dataIndex: 'column_isnull',
            key: 'column_isnull',
            width: '10%',
            name:"column_isnull",
            className:styles.columnshow,
            render: (text, record, index) => {
                return (
                    <Check tableForm={tableForm} name="column_isnull" text={text} handleFieldChange={handleFieldChange} record={record}/>
                //   <InputEF
                //   tableForm={tableForm}
                //   text={text}
                //   record={record}
                //   index={record[primaryKey]}
                //   name="column_isnull"
                //   rules={[{ required: false, message: 'Please input your workId!' }]}
                //   handleFieldChange={handleFieldChange}
                //   placeholder={"是否为空"}
                // />
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
                    onHeaderRow={(res,index)=>{
                        
                    }}
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
