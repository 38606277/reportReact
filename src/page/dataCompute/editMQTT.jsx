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
const options1=[{value:"执行器1"},{value:"执行器2"}]
const options2=[{value:"第一个"},{value:"随机"},{value:"轮询"},{value:"一次性HASH"},{value:"不常使用"},{value:"最近使用"}]
const options3=[{value:"单机串行"},{value:"丢弃后续调度"},{value:"丢弃后续调度"}]
const options4=[{value:"DataX任务"},{value:"Shell任务"},{value:"Python任务"},{value:"PowerShell任务"}]
const options5=[{value:"项目1"},{value:"项目2"}]
const options6=[{value:"子任务1"},{value:"子任务2"}]
const options7=[{value:"无"},{value:"主键自增"},{value:"时间自增"},{value:"HIVE分期"},]
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
                            label="执行器"
                            name="执行器"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Select
                                style={{ width: '200px' }}
                                size="middle"
                                showArrow
                                allowClear
                                placeholder="请选择执行器"
                                options={options1}
                        />
                        </Form.Item>
                        <Form.Item
                            label="路由策略"
                            name="路由策略"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Select
                                style={{ width: '200px' }}
                                size="middle"
                                showArrow
                                allowClear
                                placeholder="请选择路由策略"
                                options={options2}
                        />
                        </Form.Item>
                        <Form.Item
                            label="阻塞处理"
                            name="阻塞处理"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Select
                                style={{ width: '200px' }}
                                size="middle"
                                showArrow
                                allowClear
                                placeholder="请选择阻塞处理"
                                options={options3}
                        />
                        </Form.Item>
                        <Form.Item
                            label="任务类型"
                            name="任务类型"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Select
                                style={{ width: '200px' }}
                                size="middle"
                                showArrow
                                allowClear
                                placeholder="请选择任务类型"
                                options={options4}
                                onChange={setTaskType}
                        />
                        </Form.Item>
                        <Form.Item
                            label="所属项目"
                            name="所属项目"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Select
                                style={{ width: '200px' }}
                                size="middle"
                                showArrow
                                allowClear
                                placeholder="请选择所属项目"
                                options={options5}
                        />
                        </Form.Item>
                        <Form.Item
                            label="子任务"
                            name="子任务"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Select
                                style={{ width: '200px' }}
                                size="middle"
                                showArrow
                                allowClear
                                placeholder="请选择子任务"
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
                            label="Cron"
                            name="Cron"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input
                                size="middle"
                                style={{ width: '228px' }}
                                    placeholder="请输入Cron表达式"
                            /> <Button type="primary" icon={<DisconnectOutlined />} size={"middle"}>
                            </Button>
                        </Form.Item>
                        <Form.Item
                            label="报警邮件"
                            name="报警邮件"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input
                                size="middle"
                                    placeholder="请输入报警邮件用，隔开"
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
                            label="超时时间(分钟)"
                            name="超时时间(分钟)"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <InputNumber
                                style={{ width: '260px' }}
                                size="middle"
                                    placeholder="超时时间(分钟)"
                            />
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