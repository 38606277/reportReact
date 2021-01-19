import React,{useState,useEffect,useRef} from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'antd/lib/pagination';
import { BarChartOutlined, LineChartOutlined, PieChartOutlined, ProfileOutlined ,SearchOutlined ,PlusOutlined,CloseOutlined, CheckOutlined,DownOutlined,EditOutlined,DisconnectOutlined  } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';

import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/sql/sql';
import 'codemirror/theme/ambiance.css';
import 'codemirror/addon/hint/show-hint.css';  
import 'codemirror/addon/hint/show-hint.js';  
import 'codemirror/addon/hint/sql-hint.js';  
import 'codemirror/theme/ambiance.css'; 
import '@ant-design/compatible/assets/index.css';
import {
    Table,
    Divider,
    Button,
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
    Tag,
    Popconfirm,
    message,
    Popover,
    List,
    Menu,
    Switch,
    notification,
    Dropdown
} from 'antd';
// import 
import HttpService from '../../util/HttpService.jsx';
 
// const dbService = new DbService();
var source = { app: ["name", "score", "birthDate"], version: ["name", "score", "birthDate"], dbos: ["name", "population", "size"] };
const options = {

    lineNumbers: true,                //显示行号  
    mode: { name: "text/x-mysql" },          //定义mode  
    extraKeys: { "Ctrl-Enter": "autocomplete" },//自动提示配置  
    theme: "default",
    hintOptions: {
        tables: source
    }
};
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
const options1=[{value:"服务器1"},{value:"服务器2"}]
const options2=[{value:"主题1"},{value:"主题2"}]
const options3=[{value:"数据库1"},{value:"数据库2"},{value:"数据库3"}]
const options4=[{value:"表1"},{value:"表2"},{value:"表3"},{value:"表4"}]
const options5=[{value:"请选择表sql1"},{value:"请选择表sql2"}]
const options6=[{value:"启动"},{value:"停止"}]
export default (props)=>{
    const {visible,handleOk,handleCancel,text}=props
    const editorsql=useRef()
    const [TaskType,setTaskType]=useState("")//任务类型
    const ChangeCode=(code)=>{
        console.log(code)
    }
    useEffect(()=>{

    },[])
    const mhandleOk=()=>{
        handleOk(false)
    }
    const mhandleCancel=()=>{
        handleCancel(false)
    }
    return (
        <Modal
            title={text}
            visible={visible}
            onOk={()=>mhandleOk()}
            onCancel={()=>mhandleCancel()}
            width="1000px"
        >
            <Row>
                <Col sm={10}>
                    <Form
                        {...layout}
                    >
                        <Form.Item
                            label="目标服务器"
                            name="目标服务器"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Select
                                style={{ width: '200px' }}
                                size="middle"
                                showArrow
                                allowClear
                                placeholder="请选择目标服务器"
                                options={options1}
                        />
                        </Form.Item>
                        <Form.Item
                            label="主题选择"
                            name="主题选择"
                            rules={[{ required: true, message: '请选择主题' }]}
                        >
                            <Select
                                style={{ width: '200px' }}
                                size="middle"
                                showArrow
                                allowClear
                                placeholder="请选择主题"
                                options={options2}
                        />
                        </Form.Item>
                        <Form.Item
                            label="数据库选择"
                            label="数据库选择"
                            rules={[{ required: true, message: '请选择数据库' }]}
                        >
                            <Select
                                style={{ width: '200px' }}
                                size="middle"
                                showArrow
                                allowClear
                                placeholder="请选择目标数据库"
                                options={options3}
                        />
                        </Form.Item>
                        <Form.Item
                            label="表选择"
                            name="表选择"
                            rules={[{ required: true, message: '请选择表' }]}
                        >
                            <Select
                                style={{ width: '200px' }}
                                size="middle"
                                showArrow
                                allowClear
                                placeholder="请选择表"
                                options={options4}
                        />
                        </Form.Item>
                        <Form.Item
                            label="表sql"
                            name="表sql"
                            rules={[{ required: true, message: '请选择表sql!' }]}
                        >
                            <Select
                                style={{ width: '200px' }}
                                size="middle"
                                showArrow
                                allowClear
                                placeholder="请选择表sql"
                                options={options5}
                        />
                        </Form.Item>
                        <Form.Item
                            label="状态"
                            name="状态"
                            rules={[{ required: true, message: '请选择状态!' }]}
                        >
                            <Select
                                style={{ width: '200px' }}
                                size="middle"
                                showArrow
                                allowClear
                                placeholder="请选择状态"
                                options={options6}
                        />
                        </Form.Item>
                        {
                            TaskType==="DataX任务"?
                            <Form.Item
                            label="辅助参数"
                            name="辅助参数"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Select
                                    style={{ width: '200px' }}
                                    size="middle"
                                    showArrow
                                    allowClear
                                    placeholder="请选择辅助参数"
                                    options={options7}
                            />
                            </Form.Item>:null
                            }
                    </Form>
                </Col>
                <Col sm={10} style={{marginLeft:"100px"}}>
                    <Form 
                           {...layout}
                    >
                        <Form.Item
                            label="任务名称"
                            name="任务名称"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input
                                size="middle"
                                    placeholder="请输入任务名称"
                            />
                            </Form.Item>
                        <Form.Item
                            label="mqtt服务器用户名"
                            name="mqtt服务器用户名"
                            rules={[{ required: true, message: '请输入mqtt服务器登录用户名' }]}
                            >
                                <Input
                                size="middle"
                                    placeholder="mqtt服务器登录用户名"
                            />
                        </Form.Item>
                        <Form.Item
                            label="mqtt服务密码"
                            name="mqtt服务密码"
                            rules={[{ required: true, message: '请输入mqtt服务密码!' }]}
                            >
                                <Input.Password 
                                size="middle"
                                    placeholder="请输入mqtt服务密码"
                            />
                        </Form.Item>
                        <Form.Item
                            label="失败重试次数"
                            name="失败重试次数"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <InputNumber
                                size="middle"
                                style={{ width: '260px' }}
                                    placeholder="请输入失败重试次数"
                            />
                        </Form.Item>
                        <Form.Item
                            label="间隔时间"
                            name="间隔时间"
                            rules={[{ required: true, message: '请输入间隔时间' }]}
                            >
                                <InputNumber
                                style={{ width: '228px' }}
                                size="middle"
                                    placeholder="间隔时间"
                            />
                            秒
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            {
               TaskType==="DataX任务"?
                <Form.Item
                label="JVM启动参数"
                name="JVM启动参数"
                rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input
                        placeholder="JVM启动参数"
                />
                </Form.Item>:null
                }
            <Row>
                 {
                     TaskType?
                     <CodeMirror ref={editorsql} value='' style={{ height: '600px', width: '100%', border: "2px solid red",background:"red"}} options={options} onChange={code =>ChangeCode(code)}/>:null
                 }
            </Row>
      </Modal>
    )
}