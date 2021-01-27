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
const luckyCss = {
    margin: '0px',
    padding: '0px',
    position: 'fixed',
    width: '60%',
    height: '600px'
}
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
export default (props)=>{
    const {onClose}=props
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
                showtoolbarConfig:{
                    hou:false
                },
                showinfobar:false,
                lang: 'zh',
                plugins:['chart'],
                // showstatisticBar: false,
                // functionButton:"<button id='' class='btn btn-primary'  style='padding:3px 6px;font-size: 12px;margin-right: 10px;'>保存</button>",
                data:[
                    {
                        "name": "name",
                        "color": "",
                        "index": 0,
                        "status": 0,
                        "order": 0,
                        "celldata": [],
                        "config": {}
                    },
                ]
              });
  
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
                                "name": "name",
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
        
        <div style={{
            width:"100%",
            height:"100%",
            boxSizing:"border-box",
            padding:"20px"
        }}>
            <div style={{width:"100%",position:"relative",height:"42px",boxSizing:"border-box",borderBottom:"1px solid #ccc",marginBottom:"20px"}}>
                <div style={{textAlign:"center",fontWeight:600,fontSize:"18px"}}>表格查询</div>
                <Button  type="primary" size="small" style={{position:"absolute",left:"10px",top:"0"}} onClick={()=>{
                    onClose(false)
                }}>返回</Button>
            </div>
            <Row style={{overflowY:"scroll",height:"672px",boxSizing:"border-box",padding:"20px",boxSizing  :"border-box"}}>
                <Col sm={16}>
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
         </div>
      
                
)
}