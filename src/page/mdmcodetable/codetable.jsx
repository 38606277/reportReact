import React, { useEffect, useRef, useState } from 'react';
import { message, Form, Button, Row, Col, Select, Input } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import TableForm from './TableForm';
import TreeTableForm from './TreeTableForm';
import HttpService from '../../util/HttpService.jsx';
import { PlusOutlined,MinusOutlined } from '@ant-design/icons';
const { Option } = Select;

export default (props) => {

  const [tableForm] = Form.useForm();
  const [mainForm] = Form.useForm();
  const tableRef = useRef();
  const [tableData, setTableData] = useState([]);
  const [displayType, setDisplayType] = useState('list');
  const [isSelect,setIsSelect] = useState(false);

  useEffect(() => {
    if("null"!=props.match.params.dict_id && ""!=props.match.params.dict_id){
      HttpService.post('reportServer/codetable/getCodetableByID', JSON.stringify({ dict_id: props.match.params.dict_id }))
      .then(res => {
          if (res.resultCode == "1000") {
            setIsSelect(true);
            let mainFormV=res.data.mainForm;
            let lineFormV=res.data.lineForm;
            mainForm.setFieldsValue({
              dict_id:mainFormV.dict_id,
              dict_code:mainFormV.dict_code,
              dict_name:mainFormV.dict_name,
              dict_type:mainFormV.dict_type
            });
            setDisplayType(mainFormV.dict_type);
            //初始化数据
            tableRef.current.initData(lineFormV);
          } else {
              message.error(res.message);
          }
      });
    }else{
      mainForm.setFieldsValue({
        dict_id:"",
        dict_code:"",
        dict_name:"",
        dict_type:"list"
      });
    }
  },[]);

  const selectChage = (e) =>{
    setDisplayType(e);
    if(mainForm.getFieldValue('dict_id')=="" || mainForm.getFieldValue('dict_id')=="null"){
      tableRef.current.initData([]);
    }
  }
  return (
    <PageContainer
      header={
        {
          extra: [
            <Button key="submit" type='primary' onClick={() => {
              console.log('mainForm', mainForm)
              mainForm.submit()
            }}>提交</Button>,
            <Button key="back" onClick={()=>window.location = '#/mdmcodetable/codetableList'}>返回</Button>,
          ]
        }
      }
    >
      <Form
        form={mainForm}
        onFinish={async (values) => {
          //验证tableForm
          tableForm.validateFields()
            .then(() => {
              //验证成功
              let postData={
                ...values,
                lineForm:tableData,
                lineDelete:tableRef.current.getDeleteData()
              }
              HttpService.post('reportServer/codetable/saveCodetable', JSON.stringify(postData))
              .then(res => {
                  if (res.resultCode == "1000") {
                      //刷新
                      message.success('提交成功');
                      window.location.href="#/mdmcodetable/codetableList";
                  } else {
                      message.error(res.message);
                  }
              });
            })
            .catch(errorInfo => {
              //验证失败
              message.error('提交失败');
            });
        }} >

        <ProCard title="基础信息" headerBordered
          collapsible
          onCollapse={(collapse) => console.log(collapse)}>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item name="dict_id" style={{display:'none'}}>
                <Input id='dict_id' name='dict_id' value={mainForm.dict_id} />
                </Form.Item>
              <Form.Item
                label="编码"
                name="dict_code"
                rules={[{ required: true, message: '请输入编码' }]}
              >
                <Input placeholder="请输入编码" />
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item
                label="名称"
                name="dict_name"
                rules={[{ required: true, message: '请选择名称' }]}
              >
                <Input
                  style={{ width: '100%' }}
                  placeholder="请输入名称"
                />
              </Form.Item>
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <Form.Item
                label="类型"
                name="dict_type"
                rules={[{ required: true, message: '请选择类型' }]}
              >
                <Select
                 placeholder="请选择类型" 
                 onChange={e => selectChage(e)}
                 disabled={isSelect}
                 >
                  <Option value="list">列表</Option>
                  <Option value="tree">树</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </ProCard>

        <ProCard
          title="行信息"
          style={{ marginTop: '30px' }}
          headerBordered
          collapsible
          onCollapse={(collapse) => console.log(collapse)}
          extra={
            [
              <Button type='primary' onClick={() => {
                //新增一行
                tableRef.current.addItem({
                  value_id: `NEW_${(Math.random() * 1000000).toFixed(0)}`,
                  value_code: '',
                  value_name: '',
                  value_pid: '',
                  dict_id:mainForm.getFieldValue('dict_id'),
                  editable: true,
                  isNew: true,
                });
              }} icon={<PlusOutlined />}>
              </Button>,
              <Button style={{ margin: '12px' }} onClick={() => {
                //删除选中项
                tableRef.current.removeRows();
              }} icon={<MinusOutlined />}></Button>
            ]
          }
        >
          

          {displayType=='list'?
            <TableForm
              ref={tableRef}
              primaryKey='value_id' 
              value={tableData}
              onChange={(newTableData) => {
                //onChange实时回调最新的TableData 
                //手动获取方式 tableRef.current.getTableData()，可以节省onChange方法
                setTableData(newTableData);
              }} 
              tableForm={tableForm} />
            :<TreeTableForm
              ref={tableRef} 
              primaryKey='value_id' 
              value={tableData}
              onChange={(newTableData) => {
                //onChange实时回调最新的TableData 
                //手动获取方式 tableRef.current.getTableData()，可以节省onChange方法
                setTableData(newTableData);
              }} 
              tableForm={tableForm} /> 
          }

        </ProCard>
      </Form>
    </PageContainer>);
};
