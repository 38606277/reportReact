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
import SplitPane from 'react-split-pane'
import Addhm from './addAlgorithm.jsx'
import HttpService from '../../util/HttpService.jsx';
const { Step } = Steps;
const list =[
    {
        name:"算法1",
        type:"类别1",
        id:"1"
    },
    {
        name:"算法2",
        type:"类别2",
        id:"3"
    },
    {
        name:"算法3",
        type:"类别3",
        id:"3"
    }
]

export default (props)=>{
    const [startIndex,setStartIndex]=useState(1);//当前第几页
    const [perPage,setPerPage]=useState(10);//一页显示第几条
    const [total,setTotal]=useState(1);//一共多少条数据
    const [isModalVisible,setisModalVisible]=useState(false)//新建表单控制
    const columns=[
        {
            title: '算法名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '算法类别',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title:"操作",
            dataIndex:"x",
            key:"x",
            render:(_,res)=>{
               return <a onClick={()=>{
                setisModalVisible(true)
               }}>训练模型</a>
            }
        }
    ]

    const setpagindex=(page, pageSize)=>{
        console.log(page,pageSize)
        // getList(page,pageSize,"")
        setStartIndex(page)
        setPerPage(pageSize)
    }
    const onShowSizeChange =(current, pageSize)=>{
        setStartIndex(1)
        setPerPage(pageSize)
    }
    const addAlgorithm=()=>{//新建模板
        setisModalVisible(true)
    }
    const handleOk=(e)=>{//ok点击
        console.log(e)
        setisModalVisible(false)
    }
    const handleCancel=()=>{//取消
        setisModalVisible(false)
    }
    return (    
        <Card title="算法">
            {/* <Steps>
                <Step icon={<span></span>} title="模型训练" />
                <Step icon={<span></span>} title="模型校验" />
                <Step icon={<span></span>} title="模型预测" />
            </Steps> */}
            <Table
                
                dataSource={[...list]} columns={columns}    
                title={()=>{
                    return (<Row justify="space-between">
                        <Form
                           layout="inline" 
                            >
                            <Form.Item
                                        label="算法名称"
                                        name="算法名称"
                                    >
                                        <Input />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary">搜索</Button>
                            </Form.Item>
                        </Form>
                        <Button type="primary">新建算法</Button>
                    </Row>)
                }}
                pagination={false}
                footer={()=>{
                    return (<div style={{display:"flow-root"}}>
                        <Pagination style={{float:'right'}} defaultCurrent={startIndex} total={total} onChange={setpagindex} onShowSizeChange={onShowSizeChange}/>
                    </div>)
                }}/>
                <Addhm isModalVisible={isModalVisible} handleOk={e=>handleOk(e)} title={"训练模型"} handleCancel={handleCancel}></Addhm>
                <SplitPane split="vertical" minSize={50}  primary="second">
                    <h1>23131232</h1>
                    <h1>2121</h1>
                </SplitPane>
         </Card>           
)
}