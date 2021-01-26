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
import DATA from './index.json'
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
const en = window.luckysheet

export default (props)=>{
    const {setVisible2}=props
    useEffect(()=>{
        // ant-menu ant-menu-light
            en.create({
                showinfobar:false,
                // enableAddBackTop:false,
                lang: 'zh',
                plugins:['chart'],
                data:[
                    {
                        "name": "name",
                        "index": "0",
                        "order":  0,
                        "status": 1,
                    },
                ]
              });
  
    },[])
    useEffect(()=>{
    },[])
    const preservation=(e)=>{//保存
        console.log()
        if(e.target.innerHTML==='保存'&&e.target.id==="Hou_Mou"){
            console.log('保存成功')
            // HttpService.post('/reportServer/electronTable/createElectronTable',JSON.stringify({id:"",name:"模型名称3",obj:en.getAllSheets()})).then(res=>{
            //     if(res.resultCode==="1000"){
            //         setVisible2(false)
            //         console.log(res)
            //     }
                
            // })
        }
    }
    return (    
        <Card title="新建模板" style={{height:"100%",overflowY:"scroll"}} bodyStyle={{height:"90%"}}>
             <div onClick={()=>setVisible2(false)}>返回</div>
                <div style={{position:"relative",height:"100%"}}>
                   
                    <div
                    onClick={e=>{
                        preservation(e)
                    }}
                    id="luckysheet"
                    style={luckyCss}
                    ></div>
                </div>
                
         </Card>
      
                
)
}