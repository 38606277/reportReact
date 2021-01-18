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
    Dropdown
} from 'antd';
// import 
import HttpService from '../../util/HttpService.jsx';
import echarts from 'echarts';
// // 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend'
import 'echarts/lib/chart/pie';
const option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#fff'
            }
        }
    },
    legend: {
        data: ['合法次数', '非法次数']
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: ["12: 00", "13: 00", "14: 00", "15: 00", "16: 00", "17: 00", "18: 00", "19: 00", "20: 00", "21: 00", "22: 00", "23: 00"]
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210,123,132,22,23,3]
        },
        // {
        //     name: '联盟广告',
        //     type: 'line',
        //     stack: '总量',
        //     areaStyle: {},
        //     data: [220, 182, 191, 234, 290, 330, 310]
        // },

    ]
};
export default (props)=>{
    const {title}=props
    const [xAxis,setxAxis]=useState()
    const [data,setData]=useState()
    const [options,setoptions]=useState({...option})
    const ms=useRef()
    const [main , setMain] = useState('')
    useEffect(()=>{
        setMain(ms.current)
        if(main !== ""){
            var myChart = echarts.init(main);
            myChart.resize({ height: '256px',width:'840px' })
            myChart.setOption(options);
        }
    },[main])
    const setlist=()=>{
        let myopent={...options}
        let Xarr =myopent.xAxis[0].data
        Xarr.shift()
        myopent.xAxis[0].data=Xarr
        console.log(myopent.xAxis[0].data)
        // setxAxis(xAxis)
        // console.log(options.xAxis[0].data)
    }
    return (<Card title={'echarts'}>
        <div onClick={()=>{
            setlist()
        }}>
            更新
        </div>
        <div id="main" ref={ms}></div>
    </Card>)
}