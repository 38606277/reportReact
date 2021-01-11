import { Table, Form, message, Input, Button } from 'antd';
import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import styles from './style.less';
import InputEF from '@/components/EditForm/InputEF';
import { PlusOutlined } from '@ant-design/icons';
import styles2 from '@/components/EditForm/index.less';

const TreeTableForm = forwardRef((props, ref) => {

    const { primaryKey, tableForm, value, onChange } = props;

    const [data, setData] = useState(value);
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedRowKeys,setSelectedRowKeys] =useState([]);
    const [deleteRecord, setDeleteRecord] = useState([]);//删除记录
    const [departmentDic, setDepartmentDic] = useState([]);
    const [expandedRowKeys,setExpandedRowKeys] = useState([]);

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

    const onTableChange = (currentSelectedRowKeys, selectedRows) => {
        //setSelectedRows(selectedRows);
        // const newKeys=[...currentSelectedRowKeys,...selectedRowKeys];
        // const newkey=[...new Set(newKeys)];
       // setSelectedRowKeys(newkey);
    }

    const onTableSelectAll = (selected, selectedRows, changeRows) =>{
        const temp=[];
        if(selected){
            for(let i=0;i<selectedRows.length;i++){
                temp.push(selectedRows[i][primaryKey]);
            }
        }
        setSelectedRowKeys(temp);
    }
    const onTableSelect = (record, selected, selectedRows, nativeEvent) =>{
        const newdata=[];
        newdata.push(record[primaryKey]);
        if(selected){
            if(undefined!=record.children){
                findTreeListItemRowKey(record.children, newdata);
            }
            const newd=[...selectedRowKeys,...newdata];
            const lastData=[...new Set(newd)];
            setSelectedRowKeys(lastData);
           
        }else{
            if(undefined!=record.children){
                findTreeListItemRowKey(record.children, newdata);
            }
            const tempOld=[...selectedRowKeys];
            for (let i = 0; i < tempOld.length; i++) {
                for(let ii = 0; ii < newdata.length; ii++) {
                    if (tempOld[i] == newdata[ii]) {
                        selectedRowKeys.splice(selectedRowKeys.findIndex(item => item === newdata[ii]), 1);
                        break;
                    }
                }
            }
            const temp=[];
            const tempId=[...selectedRowKeys,...temp];
            setSelectedRowKeys(tempId);
        }
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
        const newData = data?.map((item) => ({ ...item })) || [];
        newData.push(newItem);
        setData(newData);
    };

    const removeRows = () => {
        if (selectedRowKeys.length < 1) {
            message.error('请选择删除项');
            return;
        }
        const newSlectRow=[];
        const newData =[];
        for (let i = 0; i < selectedRowKeys.length; i++) {
            removeTreeListItem(data,selectedRowKeys[i]);
            // newSlectRow.push(selectedRows[i])
            // if(undefined!=selectedRows[i].children){
            //     getChildrenRowKey(selectedRows[i].children,newSlectRow);
            // }
        }
        for(let ii=0;expandedRowKeys.length;ii++){
            for (let iii = 0; iii < selectedRowKeys.length; iii++) {
                expandedRowKeys.splice(expandedRowKeys.findIndex(item => item === selectedRowKeys[iii]), 1);
            }
        }
       
        const newdd=[...newData,...data];
        setData(newdd);
        //赋值失败
        const newDelte= [...deleteRecord,...selectedRowKeys];
        setDeleteRecord(newDelte);
        setSelectedRows([]);
        setSelectedRowKeys([]);
    }

    const findTreeListItemRowKey = (treeList, idlist) => { // 根据id属性从数组（树结构）中移除元素
        if (!treeList || !treeList.length) {
            return
        }
        for (let i = 0; i < treeList.length; i++) {
            if(idlist.indexOf(treeList[i][primaryKey])==-1){
                idlist.push(treeList[i][primaryKey]);
            }
            if(undefined!=treeList[i].children){
                findTreeListItemRowKey(treeList[i].children, idlist);
            }
        }
    }

    const removeTreeListItem = (treeList, id) => { // 根据id属性从数组（树结构）中移除元素
        if (!treeList || !treeList.length) {
            return
        }
        for (let i = 0; i < treeList.length; i++) {
            if (treeList[i][primaryKey] == id) {
                treeList.splice(i, 1);
                break;
            }
            if(undefined!=treeList[i].children){
                removeTreeListItem(treeList[i].children, id);
            }
        }
    }
    const getChildrenRowKey = (valueChild,childrenRowkey) => {
        for(let i=0;i<valueChild.length;i++){
            childrenRowkey.push(valueChild[i])
            if(undefined!=valueChild[i].children){
                getChildrenRowKey(valueChild[i].children,childrenRowkey);
            }
        }
        return childrenRowkey;
    }

    const getChildrenRowKeyForRemove = (valueChild) => {
        valueChild.filter(item => {
            for (let i = 0; i < valueChild.length; i++) {
                if (valueChild[i][primaryKey] === item[primaryKey]) {
                    return false
                }
                if(undefined!=item.children){
                   getChildrenRowKeyForRemove(item.children);
                }
            }
            return true;
        });
    }

    const getChildrenDataByRowKey = (key , valueChild, childrenRowkey,tempData) => {
        for(let i=0;i<valueChild.length;i++){
            if(valueChild[i][primaryKey]===key){
                return valueChild[i];
            }
            if(undefined!=valueChild[i].children){
                tempData = getChildrenDataByRowKey(key,valueChild[i].children, childrenRowkey,tempData);
            }
        }
        return tempData;
    }

    const getRowByKey = (key, valueChild) =>{
        let childrenRowkey =[];
        let tempData=null;
        for(let i=0;i<valueChild.length;i++){
            if(valueChild[i][primaryKey]===key){
                return valueChild[i];
            }
            if(undefined!=valueChild[i].children){
                tempData=getChildrenDataByRowKey(key,valueChild[i].children, childrenRowkey,tempData);
            }
        }
        return tempData;
    }

    const handleFieldChange = (
        filedValue,
        fieldName,
        record,
    ) => {
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

    const addChilren = (record) =>{
        if(undefined==record.children){
            record["children"]=[];
            record.children.push({
                value_id: `NEW_${(Math.random() * 1000000).toFixed(0)}`,
                value_code: '',
                value_name: '',
                value_pid:record.value_id,
                dict_id:record.dict_id,
                editable: true,
                isNew: true,
            })
        }else{
            record.children.push({
                value_id: `NEW_${(Math.random() * 1000000).toFixed(0)}`,
                value_code: '',
                value_name: '',
                value_pid:record.value_id,
                dict_id:record.dict_id,
                editable: true,
                isNew: true,
            })
        }
        addTreeListItem(data,record);
        const newData=[];
        const newdd=[...newData,...data];
        setData(newdd);
        setSelectedRows([]);
        setSelectedRowKeys([]);

        expandedRowKeys.push(record[primaryKey]);
        const tempss=[...expandedRowKeys];
        setExpandedRowKeys(tempss)
    }
    const addTreeListItem = (treeList,Obj) => { // 根据id属性从数组（树结构）中添加元素
        if (!treeList || !treeList.length) {
            return
        }
        for (let i = 0; i < treeList.length; i++) {
            if (treeList[i][primaryKey] == Obj[primaryKey]) {
                treeList[i]=Obj;
                return;
            }
            if(undefined!=treeList[i].children){
                addTreeListItem(treeList[i].children,Obj);
            }
        }
    }

    const onExpandedRowsChange = (expandedRows) => {
        setExpandedRowKeys(expandedRows)
    }

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
            title: '操作',
            key: 'option',
            width: '10%',
            render: (text, record, index) => {
                return (
                    <Button icon={<PlusOutlined />} onClick={()=>addChilren(record)}></Button>
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

    const [checkStrictly, setCheckStrictly] = React.useState(true);
    return (
        <>
            <Form
                className={styles2.tableForm}
                key='tableForm'
                form={tableForm}>
                <Table
                    expandable={{
                        defaultExpandAllRows:true,
                        onExpandedRowsChange:onExpandedRowsChange,
                        expandedRowKeys:expandedRowKeys
                    }}
                    rowKey={primaryKey}
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    rowSelection={{
                        selectedRowKeys:selectedRowKeys,
                        checkStrictly,
                        type: 'checkbox',
                        onChange: onTableChange,
                        onSelect: onTableSelect,
                        onSelectAll:onTableSelectAll,
                    }}
                />
            </Form>
        </>
    );
});
export default TreeTableForm;
