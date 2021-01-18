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
var base = +new Date(2014, 9, 3);
var oneDay = 24 * 3600 * 1000;
var date = [];

var data = [Math.random() * 150];
var now = new Date(base);

function addData(shift) {
    now = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/');
    date.push(now);
    data.push((Math.random() - 0.4) * 10 + data[data.length - 1]);

    if (shift) {
        date.shift();
        data.shift();
    }

    now = new Date(+new Date(now) + oneDay);
}

for (var i = 1; i < 100; i++) {
    addData();
}

const option = {
    title: {
        text: '数据监控',
        left: 'center'
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: date
    },
    yAxis: {
        boundaryGap: [0, '50%'],
        type: 'value'
    },
    series: [
        {
            name:'成交',
            type:'line',
            smooth:true,
            symbol: 'none',
            stack: 'a',
            areaStyle: {
                normal: {}
            },
            data: data
        }
    ]
};
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
            tiem.current =setInterval(()=>{
                addData(true);
                myChart.setOption({
                    xAxis: {
                        data: date
                    },
                    series: [{
                        name:'成交',
                        data: data
                    }]
                });
            },1000)
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
        
    }
    const setlist=()=>{
        clearInterval(tiem.current)
    }
    return (
        <div id="main" ref={ms}></div>
  )
}