import React, { useRef, useState } from 'react';
import { Button, Space, Modal, message, Row, TreeSelect, Tree } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer  } from '@ant-design/pro-layout';
import HttpService from '../../util/HttpService.jsx';
import { FormOutlined, MinusCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

//删除按钮事件
const onDeleteClickListener = (ref,selectedRowKeys) => {
    if (selectedRowKeys.length < 1) {
        message.error('请选择需要删除的内容');
        return;
    }

    confirm({
        title: '温馨提示',
        content: `您确定要删除吗？`,
        okText: '确定',
        cancelText: '取消',
        okType: 'danger',
        onOk() {
           deleteByIds(ref,selectedRowKeys);
        },
        onCancel() {

        },
    });

}
//删除
const deleteByIds = (ref, selectedRowKeys) => {
    if (selectedRowKeys.length < 1) {
        message.error('请选择需要删除的内容');
        return;
    }
    HttpService.post('reportServer/mdmDict/deleteDictById', JSON.stringify({ dict_id: selectedRowKeys.toString() }))
        .then(res => {
            if (res.resultCode == "1000") {
                //刷新
                ref.current.clearSelected();
                ref.current.reload();
                // 清空选中项
               // fetchData({current:0,pageSize:10},"","");
            } else {
                message.error(res.message);
            }
        });
}

//获取数据
const fetchData = async (params, sort, filter) => {
    console.log('getByKeyword', params, sort, filter);
    let requestParam = {
        startIndex: params.current,
        perPage: params.pageSize,
        ...params
    }
    const result = await HttpService.post('reportServer/mdmDict/getAllPage', JSON.stringify(requestParam));
    return Promise.resolve({
        data: result.data.list,
        total: result.data.total,
        success: result.resultCode == "1000"
    });
}

const dictList = () => {
    const ref = useRef();
    //定义列
    const columns = [
        {
            title: '编号',
            dataIndex: 'dict_id',
            valueType: 'text',
        },
        {
            title: '编码',
            dataIndex: 'dict_code',
            valueType: 'text',
        },
        {
            title: '名称',
            dataIndex: 'dict_name',
            valueType: 'text',
        },
        {
            title: '操作',
            width: 180,
            key: 'option',
            valueType: 'option',
            render: (text, record) => [
                <Button onClick={() => window.location.href="#/mdmdict/dict/"+`${record.dict_id}`} icon={<FormOutlined />}></Button>,
                <Button onClick={() => onDeleteClickListener(ref,[record.dict_id])}  icon={<MinusCircleOutlined />}></Button>,
            ]
        },
    ];

    return (
        <PageContainer
        style={{paddingTop:'15px'}}
        >
            <ProTable
                actionRef={ref}
                columns={columns}
                request={fetchData}
                rowKey="dict_id"
                rowSelection={{
                    // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
                    // 注释该行则默认不显示下拉选项
                    //selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
                }}
                tableAlertRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => (
                    <Space size={24}>
                        <span>
                            已选 {selectedRowKeys.length} 项
                    <a
                                style={{
                                    marginLeft: 8,
                                }}
                                onClick={onCleanSelected}
                            >
                                取消选择
                    </a>
                        </span>
                    </Space>
                )}
                tableAlertOptionRender={({ selectedRowKeys }) => (
                    <Space size={16}>
                        <a onClick={() => onDeleteClickListener(ref, selectedRowKeys)}> 批量删除</a>
                    </Space>
                )}
                pagination={{
                    showQuickJumper: true,
                }}
                search={{
                    defaultCollapsed: true
                }}
                dateFormatter="string"
                headerTitle="枚举值列表"
                 toolBarRender={(action, { selectedRows }) => [
                    <Button type="primary" href="#/mdmdict/dict/null">
                      新建
                    </Button>
                  ]}
            />
        </PageContainer>

    );
}

export default dictList;