import React,{useState,useEffect,useRef} from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'antd/lib/pagination';
import { BarChartOutlined, LineChartOutlined, PieChartOutlined, ProfileOutlined ,SearchOutlined ,PlusOutlined,CloseOutlined, CheckOutlined,DownOutlined,EditOutlined,DisconnectOutlined  } from '@ant-design/icons';
// import { Form } from '@ant-design/compatible';

// import CodeMirror from 'react-codemirror';
// import 'codemirror/lib/codemirror.css';
// import 'codemirror/mode/sql/sql';
// import 'codemirror/theme/ambiance.css';
// import 'codemirror/addon/hint/show-hint.css';  
// import 'codemirror/addon/hint/show-hint.js';  
// import 'codemirror/addon/hint/sql-hint.js';  
// import 'codemirror/theme/ambiance.css'; 
// import '@ant-design/compatible/assets/index.css';
import {
    Table,
    Tabs ,
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
    Empty,
    Steps 
} from 'antd';
const { TabPane } = Tabs;
import Addhm from './addAlgorithm.jsx'
import HttpService from '../../util/HttpService.jsx';
import TagSelect from '../../components/TagSelect';
import style from './Model.less'
const data=[
    {
        name:"模型名称",
        type:"类型1",
        pmml:"文件1",
        list:"数据集1",
        type:1
    },
    {
        name:"模型名称2",
        type:"类型2",
        pmml:"文件2",
        list:"数据集2",
        type:2
    },
    {
        name:"模型名称3",
        type:"类型3",
        pmml:"文件3",
        list:"数据集3",
        type:1
    },
    {
        name:"模型名称4",
        type:"类型4",
        pmml:"文件4",
        list:"数据集4",
        type:3
    },
    {
        name:"模型名称5",
        type:"类型5",
        pmml:"文件5",
        list:"数据集5",
        type:4
    }
]
const ModleClass=[
    {
        type:1,
        name:"类型1"
    },
    {
        type:2,
        name:"类型2"
    },
    {
        type:3,
        name:"类型3"
    },
    {
        type:4,
        name:"类型4"
    },
]
export default (props)=>{
    const [n,setN]=useState(-1)
    const [modle,setmodle]=useState(['cat1'])
    return (    
        <div>
            <Row style={{marginBottom:"15px"}} align="middle">
                <Col>
                 <span className={style.addAlgorithmName}>分类 :</span>
                </Col>
                <Col>
                    <TagSelect value={modle} onChange={setmodle}>
                        <TagSelect.Option value="cat1">类目一</TagSelect.Option>
                        <TagSelect.Option value="cat2">类目二</TagSelect.Option>
                        <TagSelect.Option value="cat3">类目三</TagSelect.Option>
                        <TagSelect.Option value="cat4">类目四</TagSelect.Option>
                        <TagSelect.Option value="cat5">类目五</TagSelect.Option>
                        <TagSelect.Option value="cat6">类目六</TagSelect.Option>
                    </TagSelect>
                </Col>
            </Row>
            <Card>
            </Card>
        </div>           
)
}