import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, Table, Button, Modal, Card, Row, Col, Select, message, Tabs, Drawer, Spin } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import TableForm from './TableForm.jsx';
import HttpService from '../../util/HttpService.jsx';
import { PlusOutlined,MinusOutlined } from '@ant-design/icons';
const { Option } = Select;
const { TabPane } = Tabs;

export default (props) => {
  const {infvisi,dataObj}=props
  const [tableForm] = Form.useForm();
  const [mainForm] = Form.useForm();
  const tableRef = useRef();
  const [tableData, setTableData] = useState([]);
  const [loading,setLoading]=useState(false);
  let [Asset_location,setAsset_location]=useState('')//资产位置
  let [cube_classlist,setcube_classlist]=useState([]);
  const [height,setheight]=useState(0)
  const [width,setwith]=useState(0)
  const [mw,setmw]=useState(0)
  useEffect(() => {
    const bHeight=document.getElementsByClassName("navbar-side")[0].offsetHeight
    const bWidth=document.getElementsByClassName("navbar-side")[0].offsetWidth
    const bodyw= document.body.clientWidth
    const width=bodyw-bWidth
    setheight(bHeight)
    setwith(width)
    setmw(bWidth)
   loadCubeList()
   mylist()
  
  },[dataObj]);
  let mylist= async()=>{
    const {host_id,dbType,table_name}=dataObj
    let param={
     host_id,
     dbType,
     table_name
   }
   setLoading(true)
    await HttpService.post('/reportServer/dbTableColumn/getTableCloumnList', JSON.stringify(param))
    .then(res=>{
      setLoading(false)
       if (res.resultCode == "1000") {
        let mainFormV=res.data.maintable;
        let lineFormV=res.data.columnList;
        mainForm.setFieldsValue(mainFormV);
        //初始化数据
        if(lineFormV[0]){
          tableRef.current.initData(lineFormV);
        }
      } else {
          message.error(res.message);
      }
    })

 }
  const loadCubeList = async() => {
      let param = {
          FLEX_VALUE_SET_ID: 4
      };
     await HttpService.post('/reportServer/FlexValue/getFlexValuesTree', JSON.stringify(param)).then(res => {
          if (res.resultCode == "1000") {
            setcube_classlist(res.data);
          }
          else {
              message.error(res.message);
          }
        }, errMsg => {
          this.setState({
              list: [], loading: false
          });
        });
    }
  const selectChage = (e) =>{
    setDisplayType(e);
   
  }
  const callback = (key) => {
    console.log(key);
  }
  const back=()=>{
    const {setdescribeObj,setdescribe}=props.back
    setdescribeObj({})
    setdescribe(false)
  }
  return (
    <Drawer
    placement="right"
    closable={false}
    destroyOnClose
    visible={infvisi}
    onClose={back}
    bodyStyle={{
        padding:"0px"
    }}
    width={width/1}
    >
    <PageContainer
    style={{padding:"15px"}}
      header={
        {
          extra: [
            <Button key="submit" type='primary' onClick={() => {
              console.log('mainForm', mainForm)
              mainForm.submit()
            }}>提交</Button>,
            <Button key="back" onClick={()=>{
              back()
            }}>返回</Button>,
          ]
        }
      }
    >
       <Spin spinning={loading} delay={100}>
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
              console.log(postData);
              HttpService.post('reportServer/bdModelTableColumn/table/updateTableAndColumn', JSON.stringify(postData))
              .then(res => {
                  if (res.resultCode == "1000") {
                      //刷新
                      message.success('提交成功');
                      back()
                      // window.location.href="#/dataAsset/dataAssetList";
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

        <ProCard title="表信息" headerBordered>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item name="table_id" style={{display:'none'}}>
                <Input id='table_id' name='dict_id' value={mainForm.table_id} />
                </Form.Item>
              <Form.Item
                label="名称"
                name="table_name"
                rules={[{ required: true, message: '请输入名称' }]}
              >
                <Input  readOnly bordered={0} />
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item
                label="说明"
                name="table_desc"
                rules={[{ required: true, message: '请选择说明' }]}
              >
                <Input
                  style={{ width: '100%' }}
                  placeholder="请输入说明"
                />
              </Form.Item>
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <Form.Item
                label="目录"
                name="catalog_id"
                rules={[{ required: true, message: '请选择目录' }]}
              >
                <Select defaultValue="请选择" style={{ width: 164,marginLeft:5 }} onChange={setAsset_location}>
                {
                  cube_classlist.map((item,index)=>{
                    return <Option value={item.id} key={index}>{item.name}</Option>
                  })
                }
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </ProCard>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="元数据" key="1">
            <TableForm
              ref={tableRef}
              primaryKey='id' 
              value={tableData}
              onChange={(newTableData) => {
                //onChange实时回调最新的TableData 
                //手动获取方式 tableRef.current.getTableData()，可以节省onChange方法
                setTableData(newTableData);
              }} 
              tableForm={tableForm} />

          </TabPane>
          <TabPane tab="数据血缘" key="2">
            待实现
          </TabPane>
        </Tabs>
      </Form>
      </Spin>
    </PageContainer>
    </Drawer>
    );
};
