import React,{useState,useEffect,useRef} from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'antd/lib/pagination';
import { BarChartOutlined, LineChartOutlined, PieChartOutlined, ProfileOutlined ,SearchOutlined ,PlusOutlined,CloseOutlined, CheckOutlined,DownOutlined,EditOutlined,DisconnectOutlined  } from '@ant-design/icons';
// import { Form } from '@ant-design/compatible';

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
export default (props)=>{
    const luckysheets=useRef()
    const [main,setMain]=useState("")
    const [Class,setClass]=useState([])//报表类别
    const [ClassName,setClassName]=useState(null)//报表类别change
    const [Name,setName]=useState(null)//报名change
    const [Fname,setFname]=useState([])//报表名称
    const [Condition,setCondition]=useState([])//查询条件
    const [output,setOutput]=useState([])//输出参数
    const [myid,setMyid]=useState("")
    const [mainForm] = Form.useForm()//Form
    const [InputList,setInputList]=useState({})
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
        const wdom=document.getElementsByClassName("luckysheet")
        wdom[0].style.width="100%"
        console.log(wdom[0])
    },[])
    useEffect(()=>{
        (()=>{
            HttpService.post("/reportServer/query/getAllQueryClass",JSON.stringify({})).then(res=>{
                if(res.resultCode==="1000"){
                    setClass(res.data)
                }
            })
        })()
    },[])
    const formClass=e=>{
        setClassName(e)
        HttpService.post("reportServer/query/getQueryByClassID/"+e+"",JSON.stringify({})).then(res=>{
            if(res.resultCode==="1000"){
                setFname(res.data)
                setName(null)
                setCondition([])
                setOutput([])
                setInputList({})
            }
        })
    
    }
    const formname=e=>{
        setName(e)
        HttpService.post("reportServer/query/getQueryParam/"+e,JSON.stringify({})).then(res=>{
            if(res.resultCode==="1000"){
                setCondition(res.data.in)
                setOutput(res.data.out)
                setInputList({}) 
            }
        })
        setOutput([])
    }
    const query=()=>{
        const en = window.luckysheet
        mainForm.submit()
        console.log(InputList)
        
        HttpService.post("reportServer/query/execQuery/"+ClassName+"/"+Name,JSON.stringify([
            {
                "in":InputList
            },
            {startIndex: 1, perPage: 10, searchResult: ""}
        ])).then(res=>{
            
            if(res.resultCode==="1000"){
                console.log(res.data.list)
                if(!res.data.list){
                    return 
                }
                const arr=res.data.list
                const TitleArr=[]
                let l=-1
                for (let key in arr[0]){
                    l+=1
                    TitleArr.push({
                        r:0,
                        c:l,
                        v:{
                            v:key,
                            m:key+"",
                            bg: "#fce5cd",
                        }
                    })
                }
                const Myarr=[]

               for(let i=0;i<arr.length;i+=1){
                   let U=[]
                   let s=-1
                   for (let y in arr[i]){
                       s+=1
                        U.push({
                            r:i+1,
                            c:s,
                            v:arr[i][y]
                        })
                   }
                   Myarr.push(...U)
               }
                setOutput(res.data.out)
                     en.create({
                            showinfobar:false,
                            lang: 'zh',
                            data:[
                            {
                                "celldata":[
                                    ...TitleArr,
                                    ...Myarr
                                ]
                            }
                            ]
                        })
                    en.setHorizontalFrozen(false)
            }
        })
   
    }
    return (
        <Card>
            <Row style={{overflow:"hidden"}}>
                <Col sm={16} style={{position:"relative"}}>
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
                                            <Option key={index} value={item.class_id}>{item.class_name}</Option >
                                        )
                                    })
                                }
                            </Select>
                            </Form.Item>
                            <Form.Item
                                label="报表名称"
                                name="报表名称"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                                preserve={false}
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
                                            <Option key={index} value={item.qry_id}>{item.qry_name}</Option >
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
                    <Form 
                        form={mainForm}
                        onFieldsChange={(a,e)=>{
                            let obj={}
                            for (let key in e) {
                                obj[e[key].name[0]] = e[key].value;
                            }
                            setInputList(obj)
                        }}
                        {...layout}
                        style={{
                            marginLeft:"10px"
                        }}
                    >
                        {
                            Condition[0]?Condition.map((item,index)=>{
                                return (
                                    <Form.Item
                                        label={item.in_name}
                                        name={item.in_name}
                                    >
                                        <Input  />
                                    </Form.Item>
                                )
                            }):<Empty />
                        }
                    </Form>
                   {/* <Table style={{width:"400px",marginLeft:"20px"}} pagination={false} bordered size="small" dataSource={Condition} columns={conditionName}></Table> */}
                   <Divider plain orientation="left" style={{color:"burlywood"}}>输出参数</Divider>
                   <List
                    dataSource={output}
                    bordered
                    style={{
                        marginLeft:"10px"
                    }}
                    renderItem={item => (
                        <List.Item>
                        <span style={{float:"right"}}>{item.out_name}:</span> 
                        </List.Item>
                    )}
                    />
                   {/* <Table style={{width:"400px",marginLeft:"20px"}} pagination={false} bordered size="small" dataSource={output} columns={conditionName}></Table> */}
                </Col>
            </Row>
         </Card>
      
                
)
}