import React, { useEffect, useRef, useState } from 'react';
import { message, Form, Button, Row, Col, Select, Input, DatePicker } from 'antd';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import HttpService from '../../util/HttpService';

const formItemLayout2 = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const formItemLayout1 = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

export default (props) => {

  const [tableForm] = Form.useForm();
  const [mainForm] = Form.useForm();
  const [catalogId, setCatalogId] = useState();
  console.log(props.match.params)
  useEffect(() => {
    setCatalogId(props.match.params.catalog_id);
    if ("null" != props.match.params.standard_id && "" != props.match.params.standard_id && null!= props.match.params.standard_id) {
        
        let params = {
            "standard_id":props.match.params.standard_id
        }
        HttpService.post('reportServer/dataStandard/getDataStandardById', JSON.stringify(params))
        .then(res => {
            if (res.resultCode == "1000") {
                const datainfo = res.data;
                mainForm.setFieldsValue({
                  standard_id: datainfo.standard_id,
                  standard_code: datainfo.standard_code,
                  standard_name: datainfo.standard_name,
                  status: datainfo.status,
                  standard_type: datainfo.standard_type,
                  catalog_id: datainfo.catalog_id,
                  description:datainfo.description
                });
            } else {
                message.error(res.message);
            }
        })
    }else{
      mainForm.setFieldsValue({
        standard_id: "",
        standard_code: "",
        standard_name: "",
        status: "",
        standard_type: "",
        catalog_id: props.match.params.catalog_id,
        description:""
      });
    }
  }, []);
  
  return (
    <PageContainer
      header={
        {
          extra: [
            <Button key="submit" type='primary' onClick={() => {
              console.log('mainForm', mainForm)
              mainForm.submit()
            }}>提交</Button>,
            <Button key="back" onClick={()=>window.location = '#/dataStandard/dataStandardList/'+catalogId}>返回</Button>,
          ]
        }
      }
    >
      <Form
      {...formItemLayout2}
        form={mainForm}
        onFinish={async (values) => {
          //验证tableForm
          tableForm.validateFields()
            .then(() => {
              //验证成功
              let postData={
                ...values
              }
              console.log(postData)
              HttpService.post('reportServer/dataStandard/createDataStandard', JSON.stringify(postData))
                .then(res => {
                  if (res.resultCode == "1000") {
                    //刷新
                    message.success('提交成功');
                    window.location.href="#/dataStandard/dataStandardList/"+catalogId;
                  } else {
                    message.error(res.message);
                  }
                });
            }).catch(errorInfo => {
              //验证失败
              message.error('提交失败');
            });
        }} >

        <ProCard title="基础信息" headerBordered
          collapsible
          onCollapse={(collapse) => console.log(collapse)}>
          <Row gutter={24}>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item name="standard_id" style={{display:'none'}}>
                <Input id='standard_id' name='standard_id' value={mainForm.standard_id} />
              </Form.Item>
              <Form.Item
                label="标准编码"
                name="standard_code"
              >
                  <Input id='standard_code' name='standard_code' disabled />
              </Form.Item>
              <Form.Item name="catalog_id" style={{ display: 'none' }}>
                <Input id='catalog_id' name='catalog_id' value={mainForm.catalog_id} />

              </Form.Item>
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item
                label="标准名称"
                name="standard_name"
                rules={[{ required: true, message: '请选择标准名称' }]}
              >
                <Input id='standard_name' name='standard_name' value={mainForm.standard_name} />
              </Form.Item>
            </Col>
            
          </Row>
          <Row gutter={24} >
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item
                label="描述"
                name="description"
              >
                <Input
                id='description' name='description'
                  style={{ width: '100%'}}
                />
              </Form.Item>
            </Col>
            
          </Row>
        </ProCard>
      </Form >

    </PageContainer >);
};
