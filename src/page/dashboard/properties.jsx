import React,{useState} from "react"
import { Form, Icon as LegacyIcon } from '@ant-design/compatible';
// import '@ant-design/compatible/assets/index.css';
import {Drawer,Row,Button,Table,Input} from 'antd'
import {
    PlusOutlined
  } from '@ant-design/icons';
const FormItem = Form.Item;
const d= [
    {
      key:"x轴",
      value:"x"
    },
    {
      key:'数据',
      value:"data"
    },
    {
        key:"选择颜色",
        value:"color_1"
    }
  ]
let properties=(props)=>{
    const {visible,onClose}=props
    const t=[
        {
          title: 'key',
          dataIndex: 'key',
          key: 'key',
          render:(_,res)=>{
              console.log(res)
            if(_==="数据"){
                return <div>
                    <span>{_}</span> <PlusOutlined />
                    
                </div>
            }else{
                return  <div>{_}</div>
            }
          }
        },
        {
          title: 'value',
          dataIndex: 'value',
          key: 'value',
          render:_=>{
            const { getFieldDecorator } = props.form;
            return (
              <FormItem style={{margin:0}}>
                {
                  getFieldDecorator(_)(
                    <Input name={_} />
                  )
                }
              </FormItem>
            )
          }
        }
    ];
    const [columns,setcolumns]=useState([...t])
    const [data,setdata]=useState([...d])
    return <Drawer
        title="查询数据"
        placement="right"
        closable={false}
        onClose={()=>onClose()}
        visible={visible}
        width={420}
    >
        <Row style={{display:"flow-root"}}>
            <Button onClick={()=>{
                const data=props.form.getFieldsValue()
                console.log(data)
            }}>植入数据</Button>
        </Row>
        <Table dataSource={data} columns={columns} bordered pagination={false}>
        </Table>
    </Drawer>
}


export default Form.create({})(properties)


