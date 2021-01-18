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
function onChange(e) {
    console.log(`radio checked:${e.target.value}`);
  }
function handleChange(e){

}



export default (props)=>{
    const {title}=props
    const [xAxis,setxAxis]=useState(["12: 00", "13: 00", "14: 00", "15: 00", "16: 00", "17: 00", "18: 00", "19: 00", "20: 00", "21: 00", "22: 00", "23: 00"])
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
                data: [...xAxis]
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
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: '联盟广告',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                data: [220, 182, 191, 234, 290, 330, 310]
            },
    
        ]
    };
    const ms=useRef()
    const [main , setMain] = useState('')
    useEffect(()=>{
        const Dates=new Date()
        let Hour =Dates.getHours()
        let arr=[Hour]
        for(let i=0;i<11;i+=1){
            let o=Hour-=1
            arr.push(o>0?o:Math.abs(o))
        }
        const newarr=arr.map(item=>{
            return item>9?item+": 00":"0"+item+": 00"
        })
        setxAxis(newarr)
    },[])
    useEffect(()=>{
        setMain(ms.current)
        if(main !== ""){
            var myChart = echarts.init(main);
            myChart.resize({ height: '256px',width:'840px' })
            myChart.setOption(option);
        }
    },[main,xAxis])
    const getData=(e)=>{
        const Dates=new Date()
        if(e==="近12小时"){
            let Hour =Dates.getHours()
            let arr=[Hour]
            for(let i=0;i<11;i+=1){
                let o=Hour-=1
                arr.push(o>0?o:Math.abs(o))
            }
            const newarr=arr.map(item=>{
                    if(item===24){
                        return "00:00"
                    }
                return item>9?item+": 00":"0"+item+": 00"
            })
            setxAxis(newarr)
        }
        if(e==="近1天"){
            let Hour =Dates.getHours()
            let arr=[Hour]
            for(let i=0;i<11;i+=1){
                let o=Hour+=1
                arr.push(o>24?o-24:o)
            }
            const newarr=arr.map(item=>{
                    if(item===24){
                        return "00:00"
                    }
                return item>9?item+": 00":"0"+item+": 00"
            })
            setxAxis(newarr)
        }
    }
    return (<Card title={title+"总览"}>
        <div>
            <Radio.Group onChange={onChange} defaultValue="a" buttonStyle="solid">
                <Radio.Button value="a">开发API</Radio.Button>
                <Divider type="vertical" />
                <Radio.Button value="b">调用API</Radio.Button>
            </Radio.Group>
            <Divider />
            <Row>
                <Col sm={18}>
                    <Row>
                        <Col sm={16}>
                        <Radio.Group onChange={onChange} defaultValue="a" buttonStyle="solid" size="small">
                            <Radio.Button value="a">调用趋势</Radio.Button>
                            <Radio.Button value="b">发展趋势</Radio.Button>
                        </Radio.Group>
                        </Col>
                        <Col sm={8}>
                            <Row>
                                <Select defaultValue="近12小时" style={{ width: 120 ,float:"left",marginRight:"10px"}} size="small" onChange={getData}>
                                    <Option value="近12小时">近12小时</Option>
                                    <Option value="近1天">近1天</Option>
                                    <Option value="近7天">近7天</Option>
                                    <Option value="近30天">近30天</Option>
                                </Select>
                                <Select defaultValue="调用总次数" style={{ width: 120,float:"left" }} size="small" onChange={handleChange}>
                                    <Option value="调用总次数">调用总次数</Option>
                                    <Option value="成功次数/失败次数">成功次数/失败次数</Option>
                                    <Option value="合法次数/非法次数">合法次数/非法次数</Option>
                                </Select>
                            </Row>
                        </Col>
                    </Row>
                    <div id="main" ref={ms}></div>
                </Col>
                <Col sm={6}>
                    信息
                </Col>
            </Row>
        </div>
    </Card>)
}