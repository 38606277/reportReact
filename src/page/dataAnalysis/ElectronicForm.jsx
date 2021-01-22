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
    Empty 
} from 'antd';
// import 
import HttpService from '../../util/HttpService.jsx';
import { createNonNullChain } from 'typescript';
const luckyCss = {
    margin: '0px',
    padding: '0px',
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: '0px',
    top: '0px'
}
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const selectList=[
    {
        id:"1",
        text:"报表类别1",
    },
    {
        id:"2",
        text:"报表类别2",
    },
    {
        id:"3",
        text:"报表类别3",
    }
]
const children=[
    {
        id:"1",
        text:"报名1",
        childrenid:"1"
    },
    {
        id:"1",
        text:"报名2",
        childrenid:"6"
    },
    {
        id:"2",
        text:"报名2-1",
        childrenid:"5"
    },
    {
        id:"2",
        text:"报名2-2",
        childrenid:"2"
    },
    {
        id:"3",
        text:"报名3-1",
        childrenid:"3"
    },
    {
        id:"3",
        text:"报名3-2",
        childrenid:"4"
    }
]
const condition=[
    {
        id:"1",
        name:"name",
        text:"apple"
    },
    {
        id:"1",
        name:"name1",
        text:"apple1"
    },
    {
        id:"1",
        name:"name2",
        text:"apple2"
    },
    {
        id:"2",
        name:"age",
        text:"12"
    },
    {
        id:"3",
        name:"uu1",
        text:"uu1"
    },
    {
        id:"4",
        name:"uu2",
        text:"uu2"
    },
    {
        id:"3",
        name:"uu3",
        text:"uu3"
    },
    {
        id:"3",
        name:"uu4",
        text:"uu4"
    }
    ,
    {
        id:"6",
        name:"uu31",
        text:"uu31"
    },
    {
        id:"5",
        name:"uu45",
        text:"uu45"
    }
]
const out=[
    {
        id:"1",
        name:"name出",
        text:"apple出"
    },
    {
        id:"1",
        name:"name1出",
        text:"apple1出"
    },
    {
        id:"2",
        name:"name2出",
        text:"apple2出"
    },
    {
        id:"2",
        name:"age出",
        text:"12出"
    },
    {
        id:"3",
        name:"uu1出",
        text:"uu1出"
    },
    {
        id:"4",
        name:"uu2出",
        text:"uu2出"
    },
    {
        id:"3",
        name:"uu3出",
        text:"uu3出"
    },
    {
        id:"3",
        name:"uu4出",
        text:"uu4出"
    }
    ,
    {
        id:"6",
        name:"uu3出1",
        text:"uu31"
    },
    {
        id:"5",
        name:"uu45出",
        text:"uu45出"
    }
]
export default (props)=>{
    const luckysheets=useRef()
    const [main,setMain]=useState("")
    const [Class,setClass]=useState([...selectList])//报表类别
    const [ClassName,setClassName]=useState(null)//报表类别change
    const [Name,setName]=useState(null)//报名change
    const [Fname,setFname]=useState([])//报表名称
    const [Condition,setCondition]=useState([])//查询条件
    const [output,setOutput]=useState([])//输出参数
    const [myid,setMyid]=useState("")
    useEffect(()=>{
        const en = window.luckysheet
            en.create({
                showinfobar:false,
                lang: 'zh',
                data:[
                    {
                        "ct": { //单元格值格式
                            "fa": "General",  //格式名称为自动格式
                            "t": "n" //格式类型为数字类型
                        },
                        "v": 233, //内容的原始值为 233
                        "m": 233, //内容的显示值为 233
                        "bg": "#f6b26b", //背景为 "#f6b26b"
                        "ff": 1, // 字体为 "Arial"
                        "fc": "#990000", //字体颜色为 "#990000"
                        "bl": 1, //字体加粗
                        "it": 1, //字体斜体
                        "fs": 9, //字体大小为 9px
                        "cl": 1, //启用删除线
                        "ht": 0, //水平居中
                        "vt": 0, //垂直居中
                        "tr": 2, //文字旋转 -45°
                        "tb": 2, //文本自动换行
                        "ps": { //批注
                            "left": 92, //批注框左边距
                            "top": 10, //批注框上边距
                            "width": 91, //批注框宽度
                            "height": 48, //批注框高度
                            "value": "I am a comment", //批准内容
                            "isshow": true //批注框为显示状态
                        },
                        "f": "=SUM(233)" //单元格是一个求和公式
                    }
                ]
              });
    },[])
    useEffect(()=>{
        (()=>{
            HttpService.post("/query/getAllQueryClass","").then(res=>{
                console.log(res)
            })
        })()
    },[])
    const formClass=e=>{
        setClassName(e)
        const id=selectList.filter(item=>{
            return item.text===e
        })[0].id
        const newClassName=children.filter(item=>{
            return item.id===id
        })
        setFname(newClassName)
        setName(null)
        setCondition([])
        setOutput([])
    }
    const formname=e=>{
        setName(e)
        const id=children.filter(item=>{
            return item.text===e
        })[0].childrenid
        const newcondition=condition.filter(item=>{
            return item.id===id
        })
        setMyid(id)
        setOutput([])
        setCondition(newcondition)
    }
    const conditionName=[
        {
            title:"参数名称",
            dataIndex:"name",
            key:"name"
        },
        {
            title:"参数值",
            dataIndex:"text",
            key:"text"
        }
    ]
    const query=()=>{
        const en = window.luckysheet
        const newcondition2=out.filter(item=>{
            return item.id===myid
        })
        en.create({
            showinfobar:false,
            lang: 'zh',
            data:[
              {
                  "celldata":[
                    {r:0, c:1, v: "值1"},
                    {r:10, c:11, v:"值2"},
                    {r:10, c:11, v:{f:"=sum", v:"100"}}
                ]
              }
            ]
        })
        // newcondition2[0]?en.getCellValue(1, 1, {type:"m"}):null
        setOutput(newcondition2)
    }
    return (
        <Card title="电子表格">
            <Row style={{overflow:"hidden"}}>
                <Col sm={16} style={{position:"relative",height:"700px"}}>
                    <div
                    id="luckysheet"
                    style={luckyCss}
                    ></div>
                </Col>
                <Col sm={8}>
                    <Row style={{position:"relative",height:"32px"}}>
                      <Button style={{position:"absolute",right:"0px"}} onClick={()=>{
                          query()
                      }}>执行查询</Button>
                    </Row>
                    <Row>
                        <Form
                            style={{marginLeft:"20px"}}
                            {...layout}
                            name="basic"
                            >
                            <Form.Item
                                label="报表类别"
                                name="报表类别"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Select
                                    placeholder="请选择报表类别"
                                    size="middle"
                                    showArrow
                                    style={{width:"140px"}}
                                    allowClear
                                    value={ClassName}
                                    onChange={(e)=>{
                                        formClass(e)
                                    }}
                            >
                                {
                                    Class.map((item,index)=>{
                                        return(
                                            <Option key={index} value={item.text}>{item.text}</Option >
                                        )
                                    })
                                }
                            </Select>
                            </Form.Item>
                            <Form.Item
                                label="报表名称"
                                name="报表名称"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Select
                                    style={{width:"140px"}}
                                    placeholder="请选择报表类别"
                                    size="middle"
                                    showArrow
                                    allowClear
                                    value={Name}
                                    onChange={(e)=>{
                                        formname(e)
                                    }}
                            >
                                {
                                    Fname[0]?Fname.map((item,index)=>{
                                        return (
                                            <Option key={index} value={item.text}>{item.text}</Option >
                                        )
                                    }):null
                                }
                            </Select>
                                
                            </Form.Item>
                            <Row>
                               <Col sm={12}>
                                    <Checkbox>包含表头</Checkbox>
                               </Col>
                               <Col sm={12}>
                                    <Checkbox>横向扩展</Checkbox>
                               </Col>
                            </Row>
                        </Form>
                    </Row>
                    <Divider plain orientation="left" style={{color:"burlywood"}}>查询条件</Divider>
                    {/* <Button onClick={()=>{
                          const en = window.luckysheet
                        console.log(en.getAllSheets())
                    }}>获取数据</Button> */}
                   <Table style={{width:"400px",marginLeft:"20px"}} pagination={false} bordered size="small" dataSource={Condition} columns={conditionName}></Table>
                   <Divider plain orientation="left" style={{color:"burlywood"}}>输出参数</Divider>
                   <Table style={{width:"400px",marginLeft:"20px"}} pagination={false} bordered size="small" dataSource={output} columns={conditionName}></Table>
                </Col>
            </Row>
        </Card>
      
                
)
}