import React,{useState,useEffect,useRef} from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'antd/lib/pagination';
import { BarChartOutlined, LineChartOutlined, PieChartOutlined, ProfileOutlined ,SearchOutlined ,PlusOutlined,CloseOutlined, CheckOutlined,DownOutlined,EditOutlined,DisconnectOutlined  } from '@ant-design/icons';
// import { Form } from '@ant-design/compatible';

// import CodeMirror from 'react-codemirror';
// import 'codemirror/lib/codemirror.css';
// import 'codemirror/mode/sql/sql';
// import 'codemirror/theme/ambiance.css';
// import 'codemirror/addon/hint/show-hint.css';  
// import 'codemirror/addon/hint/show-hint.js';  
// import 'codemirror/addon/hint/sql-hint.js';  
// import 'codemirror/theme/ambiance.css'; 
// import '@ant-design/compatible/assets/index.css';
import {
    Table,
    Form,
    Divider,
    Button,
    Checkbox,
    Card,
    Tree,
    Input,
    Spin,
    Row,
    Col,
    Select,
    Tooltip,
    InputNumber,
    Radio,
    Modal,
    Popconfirm,
    message,
    Popover,
    List,
    Menu,
    Switch,
    notification,
    Dropdown,
    Tag,
    Statistic,
    Empty,
    Steps 
} from 'antd';
const {Option}=Select
import HttpService from '../../util/HttpService.jsx';
const tailLayout = {
    wrapperCol: { offset: 1, span: 9 },
  };
export default (props)=>{
    const {isModalVisible,handleOk,handleCancel,title,ok}=props
    const [source,setsource]=useState([])//数据源
    const [Source,getSource]=useState(null)//获取数据源名称
    const [listTabl,setListTabl]=useState([])//数据表
    const [ListTabl,getListTable]=useState(null)//获取数据表
    const [moduleName,setmoduleName]=useState([])//算法名称
    useEffect(()=>{
         HttpService.post('/reportServer/DBConnection/ListAll',JSON.stringify({})).then(res=>{
            console.log(res)
            const arr=res.map(item=>{
                return {
                    value:item.url,
                    text:item.name
                }
            })
            setmoduleName(arr)
            setsource(arr)
            getSource(arr[0].text)
            getlistTabl(arr[0].text)
            
        })
    },[])
    const ok1=e=>{
        handleOk(1221)
    }
    const handle=()=>{
        handleCancel()
    }
    const getlistTabl=(name,s)=>{
         HttpService.post("reportServer/selectsql/getTableList", JSON.stringify({fromdb:name}))
        .then(res => {
        console.log(res)
            if (res.resultCode == '1000') {
                const arr=res.data.tables.map(item=>{
                    return{
                        value:item
                    }
                })
                setListTabl(arr)
                getListTable(arr[0].value)
            }
            else
                setListTabl([])
        })
    }
    return (    
        <Modal destroyOnClose title={title} width="800px" visible={isModalVisible} onOk={ok1} onCancel={handle} confirmLoading={ok?true:false}>
            <Form.Item
                style={{boxSizing:"border-box",padding:"0 50px"}}
                label="模型名称"
                name="模型名称"
            >
                <Input />
            </Form.Item>
            <Divider  orientation="left" plain>输入数据</Divider>
            <Row justify="space-between" style={{boxSizing:"border-box",padding:"0 50px"}}>
                <Form.Item
                    label="算法名称"
                    name="算法名称"
                    placeholder="请选择算法名称"
                >
                   <Select
                    style={{ width: 180 }}
                   >
                        {
                            moduleName.map((item,index)=>{
                               return <Option value={item.id}>{item.value}</Option>
                            })
                        }
                   </Select>
                </Form.Item>
                {/* <Form.Item
                    label="模型类别"
                    name="模型类别"
                    placeholder="请选择模型类别"
                    {...tailLayout}
                >
                   <Select
                    style={{ width: 180 }}
                   >
                        {
                            moduleName.map((item,index)=>{
                               return <Option value={item.id}>{item.value}</Option>
                            })
                        }
                   </Select>
                </Form.Item> */}
            </Row> 
            <Row justify="space-between" style={{boxSizing:"border-box",padding:"0 50px"}}>
                <Form.Item
                    label=" 数据源"
                    name="数据源"
                    placeholder="请选择数据源"
                    {...tailLayout}
                >
                   <Select
                      placeholder={Source}
                      value={Source}
                      style={{ width: 180 }}
                      onChange={(e)=>{
                        getSource(e)
                        getlistTabl(e)
                    }}
                   >
                        {
                            source.map((item,index)=>{
                               return <Option value={item.text}>{item.text}</Option>
                            })
                        }
                   </Select>
                </Form.Item>
                <Form.Item
                    label="数据表"
                    name="数据表"
                    placeholder="请选择数据表"
                    {...tailLayout}
                    
                >
                   <Select
                    placeholder={ListTabl}
                    value={ListTabl}
                    style={{ width: 180 }}
                    onChange={(e)=>{
                        getListTable(e)
                  }}
                   
                   >
                        {
                            listTabl.map((item,index)=>{
                               return <Option value={item.value}>{item.value}</Option>
                            })
                        }
                   </Select>
                </Form.Item>
            </Row>
            <Divider  orientation="left" plain>输出模型</Divider>
            <Row justify="space-between" style={{boxSizing:"border-box",padding:"0 50px"}}>
                <Form.Item
                    label="模型路径"
                    name="模型路径"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="模型类别"
                    name="模型类别"
                >
                    <Input />
                </Form.Item>
            </Row>
        </Modal>
     
    )
}