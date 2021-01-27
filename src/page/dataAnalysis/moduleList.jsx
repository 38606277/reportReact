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
import Addhm from './addAlgorithm.jsx'
import HttpService from '../../util/HttpService.jsx';
const { Step } = Steps;
const data=[
    {
        name:"模型名称",
        type:"类型1",
        pmml:"文件1",
        list:"数据集1"
    },
    {
        name:"模型名称2",
        type:"类型2",
        pmml:"文件2",
        list:"数据集2"
    },
    {
        name:"模型名称3",
        type:"类型3",
        pmml:"文件3",
        list:"数据集3"
    },
    {
        name:"模型名称4",
        type:"类型4",
        pmml:"文件4",
        list:"数据集4"
    },
    {
        name:"模型名称5",
        type:"类型5",
        pmml:"文件5",
        list:"数据集5"
    }
]
export default (props)=>{
    const [Group,setGroup]=useState('a')
    const [isModalVisible,setisModalVisible]=useState(false)//模型弹出
    const [moduleName,setModuleName]=useState("")
    useEffect(()=>{
    },[])
    const columns1=[
        {
            title: '模型名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '模型类型',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: '模型文件',
            dataIndex: 'pmml',
            key: 'pmml',
        },
        {
            title: '数据集成',
            dataIndex: 'list',
            key: 'list',
        },
        {
            title: '操作',
            dataIndex: 'x',
            key: 'x',
            render:(_,res)=>{
                return (
                    <a onClick={
                        ()=>{
                            let inner=Group==="a"?"模型预测":"模型训练"
                            setModuleName(inner)
                            setisModalVisible(true)
                        }
                    }>{Group==="a"?"预测":"详情"}</a>
                )
            }
        },
    ]
    const handleOk=(e)=>{//ok点击
        console.log(e)
        setisModalVisible(false)
    }
    const handleCancel=()=>{//取消
        setisModalVisible(false)
    }
    const addtrain=()=>{//新建训练
        setModuleName("新建训练")
        setisModalVisible(true)
    }
    return (    
        <Card title="模型列表">
            <Steps>
                <Step icon={<span></span>} title={
                    <span>模型训练</span>
                } />
                <Step icon={<span></span>} title={<span>模型校验</span>} />
                <Step icon={<span></span>} title={<span>模型预测</span>} />
            </Steps>
            <Table 
                 dataSource={data} columns={columns1}
                title={
                    ()=>{
                        return <Row justify="space-between">
                            <Radio.Group buttonStyle="solid" defaultValue={Group} onChange={e=>setGroup(e.target.value)}>
                                <Radio.Button value="a">模型</Radio.Button>
                                <Radio.Button value="b" 
                                >模型训练</Radio.Button>
                            </Radio.Group>
                            {Group==="a"?null: <Button  onClick={()=>addtrain()}>新建训练</Button>}
                        </Row>
                    }
                }
            >
            </Table>
            <Addhm isModalVisible={isModalVisible} handleOk={e=>handleOk(e)} title={moduleName} handleCancel={handleCancel}></Addhm>
         </Card>           
)
}