import React, { useEffect, useRef, useState } from 'react';
import { message, Form, Button, Row, Col, Select, Input } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import TableForm from './TableForm';
import HttpService from '../../../util/HttpService';

const { Option } = Select;

export default (props) => {
  const {addList}=props
  const [tableForm] = Form.useForm();
  const [mainForm] = Form.useForm();
  const tableRef = useRef();
  const [tableData, setTableData] = useState([]);
  const [query, setQuery] = useState('redux');
  const [displayType, setDisplayType] = useState('list');
  const [isSelect,setIsSelect] = useState(false);
  
  useEffect(() => {
    // if("null"!=props.match.params.dict_id && ""!=props.match.params.dict_id){
    //   HttpService.post('reportServer/mdmDict/getDictByID', JSON.stringify({ dict_id: props.match.params.dict_id }))
    //   .then(res => {
    //       if (res.resultCode == "1000") {
    //         setIsSelect(true);
    //         let mainFormV=res.data.mainForm;
    //         let lineFormV=res.data.lineForm;
    //         mainForm.setFieldsValue({
    //           dict_id:mainFormV.dict_id,
    //           dict_code:mainFormV.dict_code,
    //           dict_name:mainFormV.dict_name,
    //           dict_type:mainFormV.dict_type
    //         });
    //         setDisplayType(mainFormV.dict_type);
    //         //初始化数据
    //         tableRef.current.initData(lineFormV);
    //       } else {
    //           message.error(res.message);
    //       }
    //   });
    // }else{
      console.log(tableData)
      setmainForm(mainForm)
      mainForm.setFieldsValue({
        dict_id:"",
        dict_code:"",
        dict_name:"",
        dict_type:"list"
      });
    // }
  },[]);

  
  return (
    <PageContainer
      header={
        {
          extra: [
            <Button key="submit" type='primary' onClick={() => {
              console.log('mainForm', mainForm)
              mainForm.submit()
            }}>保存</Button>,
            // <Button key="back" onClick={()=>.push('/mdm/dict/dictList')}>返回</Button>,
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
              setList(postData)
              console.log(postData)
            })
           
        }} >

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
              }}> 新建
              </Button>,
              <Button type='danger' style={{ margin: '12px' }} onClick={() => {
                //删除选中项
                tableRef.current.removeRows();
              }}> 删除</Button>
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
