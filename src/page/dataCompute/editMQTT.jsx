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

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
const options1=[{value:"服务器1"},{value:"服务器2"}]
const options2=[{value:"主题1"},{value:"主题2"}]
const options5=[{value:"请选择表sql1"},{value:"请选择表sql2"}]
const options6=[{value:"启动"},{value:"停止"}]
export default (props)=>{
    const {visible,handleOk,handleCancel,text}=props
    const [host,sethost]=useState("")//目标服务器
    const [topic_id,settopic_id]=useState("")//主题
    const [sql_script,setsql_script]=useState("")//texttarea
    const [clientinid,setclientinid]=useState("")//任务名称
    const [username,setusername]=useState("")//maqtt账号
    const [password,setpassword]=useState("")//mqtt密码
    const [keepalibe,setkeepalibe]=useState(1)
    const [options3,setoptions3]=useState([])//数据库list
    const [targetDB,settargetDB]=useState("")//库的内容
    const [options4,setoptions4]=useState([])//表的list
    const [targetTable,settargetTable]=useState("")//表的内容
    const [state,setstate]=useState("")
    const editorsql=useRef()
    const [TaskType,setTaskType]=useState("")//任务类型
    useEffect(()=>{
        (async ()=>{
            await HttpService.post('/reportServer/DBConnection/ListAll', JSON.stringify({})).then(res => {
                console.log(res)
                const Clist=[]
                // setdata(set)
                res.forEach(item=>{
                    let index=Clist.findIndex(items=>{return items.text===item.dbtype})
                    if(index===-1){
                        Clist.push({
                            text:item.dbtype,
                            value:item.dbtype,
                        })
                    }
                })
                setoptions3(Clist)
            }, errMsg => {
                // this.setState({
                //     list: [], loading: false
                // });
            }); 
        })()
    },[])
    const mhandleOk=()=>{
        const obj={
            id:null,
            host,
            topic_id,
            targetDB,
            targetTable,
            sql_script,
            state:state==="启动"?'1':'0',
            clientinid,
            username,
            password,
            keepalibe
        }
        const arr=[host,
            topic_id,
            targetDB,
            targetTable,
            sql_script,
            state,
            clientinid,
            username,
            password,
            keepalibe
        ]
        const Tips=[
            "目标服务器不可为空",
            "主题不可为空",
            "未选择数据库",
            "未选择表",
            "texttarea可不为空",
            "未选择状态",
            "服务名称",
            "mqtt服务器登录用户名不可为空",
            "mqtt服务器密码不可为空",
            "请填写执行间隔"
        ]
        if(Tips[arr.indexOf('')]){
            message.warning(Tips[arr.indexOf('')])
            return 
            }

        HttpService.post('/reportServer/mqttTask/createMqttTask', JSON.stringify({obj})).then(res => {
            message.warning(res.message+res.resultCode)
            console.log(res)
        })
       
        // handleOk(false)
    }
    const mhandleCancel=()=>{
        handleCancel(false)
    }
    const changeclass =(e)=>{//数据库change事件
        HttpService.post('/reportServer/DBConnection/ListAll', JSON.stringify({})).then(res => {
            const Tlist=res.filter(item=>{
                if(item.dbtype===e){
                    return {
                        value:item.name,
                    }
                }
            })
            setoptions4(Tlist.map(item=>{return { value:item.name,}}))
        })
        settargetDB(e)
        settargetTable("")
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
                            rules={[{ required: true, message: '请输入目标服务器!' }]}
                        >
                               <Input
                               value={host}
                                size="middle"
                                style={{width:"220px"}}
                                placeholder="请输入目标服务器"
                                onChange={e=>sethost(e.target.value)}
                            />
                            {/* <Select
                                style={{ width: '200px' }}
                                size="middle"
                                showArrow
                                allowClear
                                placeholder="请选择目标服务器"
                                options={options1}
                        /> */}
                        </Form.Item>
                        <Form.Item
                            label="主题"
                            name="主题"
                            rules={[{ required: true, message: '请填写主题' }]}
                        >
                               <Input
                                size="middle"
                                value={topic_id}
                                style={{width:"220px"}}
                                placeholder="请填写主题"
                                onChange={e=>settopic_id(e.target.value)}
                            />
                            {/* <Select
                                style={{ width: '200px' }}
                                size="middle"
                                showArrow
                                allowClear
                                placeholder="请选择主题"
                                options={options2}
                        /> */}
                        </Form.Item>
                        <Form.Item
                            label="数据库选择"
                            label="数据库选择"
                            rules={[{ required: true, message: '请选择数据库' }]}
                        >
                            <Select
                                style={{ width: '220px' }}
                                size="middle"
                                showArrow
                                allowClear
                                value={targetDB}
                                options={options3}
                                onChange={(e)=>{
                                    changeclass(e)
                                }}
                        />
                        </Form.Item>
                        <Form.Item
                            label="表选择"
                            name="表选择"
                            rules={[{ required: true, message: '请选择表' }]}
                        >
                            <Select
                                style={{ width: '220px' }}
                                size="middle"
                                showArrow
                                allowClear
                                placeholder="请选择表"
                                options={options4}
                                value={targetTable}
                                onChange={settargetTable}
                        />
                        </Form.Item>
                        <Form.Item
                            label="textarea"
                            name="textarea"
                            rules={[{ required: true, message: '请填写textarea!' }]}
                        >
                            <Input
                                size="middle"
                                value={sql_script}
                                onChange={e=>setsql_script(e.target.value)}
                                style={{width:"220px"}}
                                    placeholder="请填写textarea"
                            />
                            {/* <Select
                                style={{ width: '200px' }}
                                size="middle"
                                showArrow
                                allowClear
                                placeholder="请选择表sql"
                                options={options5}
                        /> */}
                        </Form.Item>
                        <Form.Item
                            label="状态"
                            name="状态"
                            rules={[{ required: true, message: '请选择状态!' }]}
                        >
                            <Select
                                style={{ width: '220px' }}
                                size="middle"
                                showArrow
                                allowClear
                                value={state}
                                placeholder="请选择状态"
                                options={options6}
                                onChange={setstate}
                        />
                        </Form.Item>
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
                                value={clientinid}
                                size="middle"
                                onChange={e=>{setclientinid(e.target.value)}}
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
                                value={username}
                                onChange={e=>setusername(e.target.value)}
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
                                value={password}
                                onChange={e=>setpassword(e.target.value)}
                                placeholder="请输入mqtt服务密码"
                            />
                        </Form.Item>
                        {/* <Form.Item
                            label="失败重试次数"
                            name="失败重试次数"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <InputNumber
                                size="middle"
                                style={{ width: '260px' }}
                                    placeholder="请输入失败重试次数"
                            />
                        </Form.Item> */}
                        <Form.Item
                            label="间隔时间"
                            name="间隔时间"
                            rules={[{ required: true, message: '请输入间隔时间' }]}
                            >
                                <InputNumber
                                value={keepalibe}
                                onChange={e=>{setkeepalibe(e.target.value)}}
                                style={{ width: '228px' }}
                                size="middle"
                                placeholder="间隔时间"
                            />
                            秒
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
      </Modal>
    )
}