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
    useEffect(()=>{
        // ant-menu ant-menu-light
            en.create({
                showinfobar:false,
                // enableAddBackTop:false,
                lang: 'zh',
              });
  
    },[])
    useEffect(()=>{
    },[])
    const preservation=()=>{
        document.write(JSON.stringify(en.getAllSheets()))
       console.log(en.getAllSheets())
    }
    return (    
        <Card title="新建模板" extra={<Button onClick={()=>preservation()}>保存</Button>} style={{height:"100%",overflowY:"scroll"}} bodyStyle={{height:"90%"}}>
                <div style={{position:"relative",height:"100%"}}>
                    <div
                    id="luckysheet"
                    style={luckyCss}
                    ></div>
                </div>
                
         </Card>
      
                
)
}