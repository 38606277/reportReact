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
    animation:false,
    title: {
        text: '数据监控',
        left: 'center'
    },
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
        left: 'left',
        data: ['数据1', '数据2']
    },
    xAxis: {
        type: 'category',
        splitLine: {show: false},
        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    yAxis:  [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '数据1',
            type: 'line',
            data:[89, 233, 239, 173, 241, 139, 194, 185, 35]
        },
        {
            name: '数据2',
            type: 'line',
            data: [100, 100,100,100, 100,100, 100, 100,100]
        }
    ]
};
// const option = {

//     tooltip: {
//         trigger: 'item',
//         formatter: '{a} <br/>{b} : {c}'
//     },
//     legend: {
//         data: ['合法次数', '非法次数']
//     },
//     toolbox: {
//         feature: {
//             saveAsImage: {}
//         }
//     },
//     grid: {
//         left: '3%',
//         right: '4%',
//         bottom: '3%',
//         containLabel: true
//     },
//     xAxis: [
//         {
//             type: 'category',
//             boundaryGap: false,
//             data: ["12: 00", "13: 00", "14: 00", "15: 00", "16: 00", "17: 00", "18: 00", "19: 00", "20: 00", "21: 00", "22: 00", "23: 00"]
//         }
//     ],
//     yAxis: [
//         {
//             type: 'log',
//             name: 'y',
//             minorTick: {
//                 show: true
//             },
//             minorSplitLine: {
//                 show: true
//             }
//         }
//     ],
//     series: [
//         {
//             name: '合法次数',
//             type: 'line',
//             stack: '总量',
//             areaStyle: {},
//             data: [120, 132, 101, 134, 90, 230, 210,123,132,22,23,3]
//         },
//         {
//             name: '非法次数',
//             type: 'line',
//             stack: '总量',
//             areaStyle: {},
//             data: [100, 100, 100, 100, 100, 100, 100]
//         },

//     ]
// };
export default (props)=>{
    const {title}=props
    const tiem=useRef()
    const [options,setoptions]=useState({...option})
    const ms=useRef()
    const [main , setMain] = useState('')
    const [isopen,setIsopen]=useState('')
    const [S,setS]=useState(false)
    useEffect(()=>{
        setMain(ms.current)
        if(main !== ""){
            var myChart = echarts.init(main);
            setIsopen(myChart)
            myChart.resize({ height: '256px',width:'840px' })
            myChart.setOption(options);
            setS(true)
        }
    },[main,options])
    useEffect(()=>{
        if(S){
            set()
        }else{
            setlist()
        }
        
    },[S])
    const set=()=>{
        tiem.current =setInterval(()=>{
            let myopent={...options}
            let Xarr =myopent.xAxis.data
            let Darr=myopent.series[0].data
            Darr.shift()
            Xarr.shift()
            Xarr.push(Math.floor(Math.random()*11))
            Darr.push(Math.floor(Math.random()*250))
            myopent.xAxis.data=Xarr
            console.log(Darr)
            myopent.series[0].data=Darr
            myopent.series[1].data=[100, 100, 100, 100, 100, 100, 100, 100, 100]
            // console.log(myopent.xAxis.data)
            setoptions({...myopent})
            // isopen.setOption(myopent)
        },1000)
    }
    const setlist=()=>{
        clearInterval(tiem.current)
    }
    return (<Card title={title}>
        <div onClick={()=>{
            setlist()
        }}>
            停止
        </div>
        <div id="main" ref={ms}></div>
    </Card>)
}