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
    Tree,
    Dropdown,
    Menu,
    Card
} from 'antd';
import { InsertRowLeftOutlined } from '@ant-design/icons';

export default ()=>{
    const [tabPosition,settabPosition]=useState('')
    const [mcol,setmcol]=useState([])
    const [list,setlist]=useState([])
    const box=useRef()
    let arr=[]
    for(let i=0;i<100;i+=1){
        arr.push("表"+i)
    }
    useEffect(()=>{
        
        if(box){
            const bHeight=document.getElementsByClassName("navbar-side")[0].offsetHeight
            const sHeight=box.current.offsetTop
            const mHeight=bHeight-sHeight-70
            box.current.style.height=mHeight+'px'
            box.current.style.maxWidth=box.current.offsetWidth+"px"
            const listnum=Math.floor(mHeight/40)//一个col放几个list
            const colnum=Math.ceil(arr.length/listnum)//col的个数
            const colarr=[]
            const marr=[]
            for(let u=0;u<colnum;u+=1){
                marr.push(arr.splice(0,13))
                colarr.push(u)
            }
            setmcol(colarr)
            setlist(marr)
        
           console.log(bHeight,sHeight,listnum,colnum,colarr.length,marr)
        }
    },[box])
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
                <Col sm={4}>
                    占位    
                </Col>
                <Col sm={20}>
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
                        <Row ref={box} style={{
                            borderTop:"1px solid #f0f0f0"
                        }}>
                            {
                                mcol.map((item,index)=>{
                                    return (
                                        <Col style={{
                                            marginTop:"-10px",
                                            marginRight:"15px"
                                        }}>
                                            {
                                               list[index].map((items,indexs)=>{
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
                                                                <Button icon={<InsertRowLeftOutlined style={{color:"#096dd9"}}/>} style={{display:"block",margin:"10px 0",width:"100px",border: 'none',textAlign:"left"}}>{items}</Button>
                                                    </Dropdown>
                                                   )
                                               })
                                            }
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Card>
    )
}