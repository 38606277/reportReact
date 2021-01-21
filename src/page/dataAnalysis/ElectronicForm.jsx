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
// import {testaaa,exportExcel} from './export.js'
export default (props)=>{
    const luckysheets=useRef()
    const [main,setMain]=useState("")
    useEffect(()=>{
        setMain(luckysheets.current)
        if(main !== ""){
            var options = {
                container: 'luckysheet' //luckysheet为容器id
            }
            // luckysheet.create(options)
        }
    },[main])
 
    return (<Card title={"电子表格"}>
        <Row>
            <Col>
                <div ref={luckysheets} id="luckysheet">

                </div>
            </Col>
            <Col></Col>
        </Row>
    </Card>)
}