import React,{useState,useEffect,useRef} from 'react'
import {
    Form,
    Divider,
    Button,
    Checkbox,
    Radio,
    Space,
    Input,
    Row,
    Col,
    Select,
    Tooltip,
    List,
    Empty,
    Drawer,
    Spin ,
    Dropdown,
    Menu,
    Card
} from 'antd';
import { InsertRowLeftOutlined } from '@ant-design/icons';
import HttpService from '../../util/HttpService.jsx';
export default (props)=>{
    const [tabPosition,settabPosition]=useState('')
    const [mcol,setmcol]=useState([])
    const [list,setlist]=useState([])
    const [spinning,setspinning]=useState(true)
    const box=useRef()
    const Bo=useRef()
    useEffect(()=>{
        const bHeight=document.getElementsByClassName("navbar-side")[0].offsetHeight
        const sHeight=box.current.offsetTop
        const mHeight=bHeight-sHeight-70
        box.current.style.height=mHeight-80+'px'
        const obj =props.match.params
            HttpService.post('/reportServer/dbTableColumn/getTableList',JSON.stringify(obj)).then(res=>{
                if(res.resultCode==='1000'){
                    const arr=[...res.data]
                    Bo.current.style.mixWidth=box.current.offsetWidth+"px"
                    const listnum=Math.floor(mHeight/40)//一个col放几个list
                    const colnum=Math.ceil(arr.length/listnum)//col的个数
                    box.current.style.width=colnum*(200+15)+'px'
                    const colarr=[]
                    const marr=[]
                    for(let u=0;u<colnum;u+=1){
                        marr.push([...arr.splice(0,13)])
                        colarr.push(u)
                    }
                    setmcol(colarr)
                    setlist(marr)
                }
            })
    },[])
    useEffect(()=>{
        if(list.length>0){
            setspinning(false)
        }
    },[list])
    const changeTabPosition=(e)=>{
        settabPosition(e)
    }
    return (
        <Card title="系统数据表"
            bodyStyle={
                {
                    padding:"0px"
                }
            }
        >
            <Row>
                <Col sm={24}>
                    <Card
                          bodyStyle={
                            {
                                maxWidth:"100%",
                                padding:"0px"
                            }
                        }
                    >
                        <Row
                            style={{
                                borderBottom:"1px solid #f0f0f0"
                            }}
                        >
                            <Form
                                name="customized_form_controls"
                                layout="inline"
                                style={{
                                    marginLeft:'6px'
                                }}
                            >
                                <Form.Item name="FName" label="表名">
                                    <Input />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        搜索
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Row>
                        <Radio.Group 
                            style={{
                                marginLeft:'4px'
                            }}
                            buttonStyle="solid" value={tabPosition} onChange={(e)=>changeTabPosition(e.target.value)}
                        >
                            <Radio.Button value="top">新建</Radio.Button>
                            <Radio.Button value="bottom">导入</Radio.Button>
                            <Radio.Button value="left">设计</Radio.Button>
                            <Radio.Button value="right">导出</Radio.Button>
                        </Radio.Group>
                        <div ref={Bo}
                            style={{
                                overflowX:"auto",
                                borderTop:"1px solid #f0f0f0"
                            }}
                        >
                     <Spin spinning={spinning}>
                        <Row ref={box}>
                            {
                                mcol.length>0?mcol.map((item,index)=>{
                                    return (
                                        <Col style={{
                                            marginTop:"-10px",
                                            marginRight:"15px"
                                        }}>
                                            {
                                               list.length>0?list[index].map((items,indexs)=>{
                                                   return (
                                                     <Dropdown
                                                                trigger="contextMenu"
                                                            overlay={()=>{
                                                                return (
                                                                    <Menu>
                                                                        <Menu.Item>
                                                                        <a target="_blank" rel="noopener noreferrer">
                                                                            具体方法
                                                                        </a>
                                                                        </Menu.Item>
                                                                        <Menu.Item>
                                                                        <a target="_blank" rel="noopener noreferrer">
                                                                            具体方法
                                                                        </a>
                                                                        </Menu.Item>
                                                                        <Menu.Item>
                                                                        <a target="_blank" rel="noopener noreferrer">
                                                                            具体方法
                                                                        </a>
                                                                        </Menu.Item>
                                                                        <Menu.Item>
                                                                        <a target="_blank" rel="noopener noreferrer">
                                                                            具体方法
                                                                        </a>
                                                                        </Menu.Item>
                                                                        <Menu.Item>
                                                                        <a target="_blank" rel="noopener noreferrer">
                                                                            具体方法
                                                                        </a>
                                                                        </Menu.Item>
                                                                    </Menu>
                                                                )
                                                            }} placement="bottomLeft">
                                                                <Button icon={<InsertRowLeftOutlined style={{color:"#096dd9"}}/>} style={{display:"block",margin:"10px 0",width:"200px",border: 'none',textAlign:"left"}}>{items.table_name}</Button>
                                                    </Dropdown>
                                                   )
                                               }):null
                                            }
                                        </Col>
                                    )
                                }):null
                            } 
                        </Row>
                        </Spin>
                        </div>
                    
                    </Card>
                </Col>
            </Row>
        </Card>
    )
}