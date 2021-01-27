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
const moduleName=[
    {
        id:"1",
        value:"模型1"
    },
    {
        id:"2",
        value:"模型2"
    }
]
const tailLayout = {
    wrapperCol: { offset: 1, span: 9 },
  };
export default (props)=>{
    const {isModalVisible,handleOk,handleCancel,title}=props
    const ok=e=>{
        handleOk(1221)
    }
    const handle=()=>{
        handleCancel()
    }
    return (    
        <Modal title={title} width="800px" visible={isModalVisible} onOk={ok} onCancel={handle}>
            <Form.Item
                style={{boxSizing:"border-box",padding:"0 50px"}}
                label="算法名称"
                name="算法名称"
            >
                <Input />
            </Form.Item>
            <Divider  orientation="left" plain>输入数据</Divider>
            <Row justify="space-between" style={{boxSizing:"border-box",padding:"0 50px"}}>
                <Form.Item
                    label="模型名称"
                    name="模型名称"
                    placeholder="请选择模型名称"
                >
                   <Select
                    style={{ width: 160 }}
                   >
                        {
                            moduleName.map((item,index)=>{
                               return <Option value={item.id}>{item.value}</Option>
                            })
                        }
                   </Select>
                </Form.Item>
                <Form.Item
                    label="模型类别"
                    name="模型类别"
                    placeholder="请选择模型类别"
                    {...tailLayout}
                >
                   <Select
                    style={{ width: 160 }}
                   >
                        {
                            moduleName.map((item,index)=>{
                               return <Option value={item.id}>{item.value}</Option>
                            })
                        }
                   </Select>
                </Form.Item>
            </Row> 
            <Row justify="space-between" style={{boxSizing:"border-box",padding:"0 50px"}}>
                <Form.Item
                    label=" 数据源"
                    name="数据源"
                    placeholder="请选择数据源"
                    {...tailLayout}
                >
                   <Select
                    style={{ width: 160 }}
                   >
                        {
                            moduleName.map((item,index)=>{
                               return <Option value={item.id}>{item.value}</Option>
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
                    style={{ width: 160 }}
                   >
                        {
                            moduleName.map((item,index)=>{
                               return <Option value={item.id}>{item.value}</Option>
                            })
                        }
                   </Select>
                </Form.Item>
            </Row>
            <Divider  orientation="left" plain>输出模型</Divider>
            <Row justify="space-between" style={{boxSizing:"border-box",padding:"0 50px"}}>
                <Form.Item
                    label="模型名称"
                    name="模型名称"
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