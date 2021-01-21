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
    Dropdown,
    Statistic,
    Empty 
} from 'antd';
// import 
import HttpService from '../../util/HttpService.jsx';
import LuckyExcel from 'luckyexcel'
import {testaaa,exportExcel} from './export.js'
import style from './ElectronicForm.less'
const luckyCss = {
    margin: '0px',
    padding: '0px',
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: '0px',
    top: '0px'
}
export default (props)=>{
    const luckysheets=useRef()
    const [main,setMain]=useState("")
    useEffect(()=>{
        const en = window.luckysheet
        console.log(en )
        setMain(1)
        if(main !== ""){
          
            en.create({
                container: "luckysheet",
                title:"电子表格"
              });
        }
    },[main])
    
    return (
        <Card title="维表">
            <Row style={{overflow:"hidden"}}>
                <Col sm={16} style={{position:"relative",height:"700px"}}>
                    <div className={style.Mask}></div>
                    <div
                    id="luckysheet"
                    style={luckyCss}
                    ></div>
                </Col>
                <Col sm={8}>
                    <Button onClick={()=>{
                    }}>获取数据</Button>
                </Col>
            </Row>
        </Card>
      
                
)
}