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
    Tabs ,
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
const { TabPane } = Tabs;
import Addhm from './addAlgorithm.jsx'
import gehttp from './gehttp.jsx'
import Model from './Model.jsx'
const { Step } = Steps;
const data=[
    {
        name:"模型名称",
        type:"类型1",
        pmml:"文件1",
        list:"数据集1",
        type:1
    },
    {
        name:"模型名称2",
        type:"类型2",
        pmml:"文件2",
        list:"数据集2",
        type:2
    },
    {
        name:"模型名称3",
        type:"类型3",
        pmml:"文件3",
        list:"数据集3",
        type:1
    },
    {
        name:"模型名称4",
        type:"类型4",
        pmml:"文件4",
        list:"数据集4",
        type:3
    },
    {
        name:"模型名称5",
        type:"类型5",
        pmml:"文件5",
        list:"数据集5",
        type:4
    }
]
export default (props)=>{
    const [Group,setGroup]=useState('a')
    const [startIndex,setStartIndex]=useState(1);//当前第几页
    const [perPage,setPerPage]=useState(10);//一页显示第几条
    const [total,setTotal]=useState(1);//一共多少条数据
    const [isModalVisible,setisModalVisible]=useState(false)//模型弹出
    const [moduleName,setModuleName]=useState("")
    const [ok,setOk]=useState(null)
    const [training,settraining]=useState([])//模板类型list
    const [data,setdata]=useState(null)
    const [model_name,setmodel_name]=useState("")//模型名称
    useEffect(()=>{
        getList(1,10,"","")
    },[])
    const columns1=[
        {
            title: '模型名称',
            dataIndex: 'model_name',
            key: 'model_name',
        },
        {
            title: '模型类型',
            dataIndex: 'x',
            key: 'x',
        },
        {
            title: '模型文件',
            dataIndex: 'datasource_id',
            key: 'datasource_id',
        },
        {
            title: '数据集成',
            dataIndex: 'dataset_id',
            key: 'dataset_id',
        },
        {
            title: '状态',
            dataIndex: 'statues',
            key: 'statues',
            render:(_,res)=>{
                return (
                    <a style={{color:_!==1?"red":"green"}}>{_!==1?"未完成":"完成"}</a>
                )
            }
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
                            setOk(true)
                            setdata(res)
                        }
                    }>{Group==="c"?"预测":"详情"}</a>
                )
            }
        },
    ]
    const handleOk=(e)=>{//ok点击
        gehttp('/reportServer/aimodel/createAiModel',e).then(res=>{
            if(res.resultCode==="1000"){
                message.success(res.message)
                getList(1,10,"","")
            }else{
               return message.warning(res.message)
            }
        })
        setisModalVisible(false)
        setOk(null)
        setdata(null)
    }
    const handleCancel=()=>{//取消
        setisModalVisible(false)
        setOk(null)
        setdata(null)
    }
    const addtrain=()=>{//新建训练
        setModuleName("新建训练")
        setisModalVisible(true)
    }
    const ModuleSe=(title)=>{
        if(title==="模型校验"){
            return
        }
        setModuleName(title)
        setisModalVisible(true)
    }
    const callback=(key)=>{
        setGroup(key)
        console.log(key)
    }
    const getList =(startIndex,perPage,model_name,algorithm_id)=>{
        gehttp('/reportServer/aimodel/getAiModelList',{startIndex,perPage,model_name,algorithm_id}).then(res=>{
            if(res.resultCode==="1000"){
                setTotal(res.data.total)
                settraining(res.data.list)
            }
            console.log(res)
        })
    }
    const setpagindex=(page, pageSize)=>{
        getList(page,pageSize,"","")
        setStartIndex(page)
        setPerPage(pageSize)
    }
    const onShowSizeChange =(current, pageSize)=>{
        setStartIndex(1)
        setPerPage(pageSize)
    }
    const searchTrain=()=>{
        getList(startIndex,perPage,model_name,"")
    }
    return (    
        <Card title="模型列表">
            <Steps current={5} progressDot={()=>{return <div style={{width:"8px",height:"8px",borderRadius:"50%",background:"#1890ff"}}></div>}}>
                <Step title="模型训练" onClick={()=>ModuleSe('模型训练')}/>
                <Step title="模型校验" onClick={()=>ModuleSe('模型校验')}/>
                <Step title="模型预测" onClick={()=>ModuleSe('模型预测')}/>
            </Steps>
            <Tabs defaultActiveKey="a" onChange={callback} forceRender style={{marginTop:"10px"}}>
                <TabPane tab="模型" key="a">
                    <Model />
                </TabPane>
                <TabPane tab="模型训练" key="b" style={{position:"relative"}}>
                <Row align="middle" style={{marginBottom:"8px",boxSizing:"border-box",paddingLeft:"10px"}} justify="space-between">
                    <Row align="middle">
                        <Form.Item
                                style={{marginBottom:"0px"}}
                                label="模型名称"
                                name="模型名称"
                            >
                                <Input style={{height:"26px"}} value={model_name} onChange={e=>{setmodel_name(e.target.value)}}/>
                            </Form.Item>
                            <Button size="small" type="primary" style={{fontSize:"13px"}} onClick={()=>searchTrain()}>搜索</Button>
                        </Row>
                        <Button type="primary"   onClick={()=>addtrain()}>新建训练</Button>
                    </Row>
                   
                    <Table 
                        dataSource={training} columns={columns1}
                        pagination={false}
                        footer={
                            ()=>{
                                return (
                                    <div style={{display:"flow-root"}}>
                                         <Pagination style={{float:"right"}}  current={startIndex} total={total} onChange={setpagindex} onShowSizeChange={onShowSizeChange}/>
                                    </div>
                                )
                            }
                        }
                       
                    >
                    </Table>
                </TabPane>
                <TabPane tab="预测" key="c">
                    <Table 
                        dataSource={data} columns={columns1}
                    >
                    </Table>
                </TabPane>
            </Tabs>
            {/* <Table 
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
            </Table> */}
            <Addhm isModalVisible={isModalVisible} data={data} handleOk={e=>handleOk(e)} title={moduleName} ok={ok} handleCancel={handleCancel}></Addhm>
         </Card>           
)
}