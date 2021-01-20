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
    Statistic 
} from 'antd';
// import 
import HttpService from '../../util/HttpService.jsx';
import echarts from 'echarts';
// // 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend'
import 'echarts/lib/chart/pie';
import one from './setXList.js'


const sele=["近12小时","近1天","近7天","近30天"]
const sele2=["今日","本周","本月","本年"]
export default (props)=>{
    const {title}=props
    const [xAxis,setxAxis]=useState(["12: 00", "13: 00", "14: 00", "15: 00", "16: 00", "17: 00", "18: 00", "19: 00", "20: 00", "21: 00", "22: 00", "23: 00"])
    const [select,setSelect]=useState([...sele])
    const [series,setseries]=useState([])
    const ms=useRef()
    const [main , setMain] = useState('')
    const [types,setTypes]=useState(true)
    const [text,settext]=useState("近12小时")
    const option = {
        title:{
            text: '数据监控',
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
        series: [...series]
    };
    function onChange(e) {
        if(e.target.value==="a"){
            setTypes(true)
            settext("近12小时")
            one("近12小时",setxAxis)
        }else{
            setTypes(false)
            settext("今日")
            one("今日",setxAxis)
            setseries([{
                name: '调用总次数',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                data: [120, 132, 101, 134, 90, 230, 210, 230, 210, 210, 230, 210]}])
        }
      }
    function handleChange(e){
        if(e==="调用总次数"){
            console.log(series)
            setseries([{
                name: '调用总次数',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                data: [120, 132, 101, 134, 90, 230, 210, 230, 210, 210, 230, 21]}])
        }
        if(e==="成功次数/失败次数"){
            setseries([{
                name: '成功次数',
                type: 'line',
                stack: '个数',
                areaStyle: {},
                data: [120, 132, 101, 134, 90, 230, 210, 230, 210, 210, 230, 210]
            },
            {
                name: '失败次数',
                type: 'line',
                stack: '个数',
                areaStyle: {},
                data: [12, 1, 10, 1, 9, 20, 2, 2, 2, 21, 30, 0]
            },
            ])
        }
        if(e==="合法次数/非法次数"){
            setseries([{
                name: '合法次数',
                type: 'line',
                stack: '个数',
                areaStyle: {},
                data: [120, 13, 1, 1, 90, 230, 210, 230, 210, 0, 23, 210]
            },
            {
                name: '非法次数',
                type: 'line',
                stack: '个数',
                areaStyle: {},
                data: [12, 1, 10, 1, 9, 20, 2, 2, 2, 221, 3, 0]
            },
            ])
        }
    }
    useEffect(()=>{
        one("近12小时",setxAxis)
        setseries([{
            name: '调用总次数',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210, 230, 210, 210, 230, 210]}])
    },[])
    useEffect(()=>{
        setMain(ms.current)
        if(main !== ""){
            var myChart = echarts.init(main);
            myChart.resize({ height: '256px',width:'840px' })
            myChart.setOption(option);
        }
    },[main,xAxis,series])
    
    const getData=(e)=>{
        one(e,setxAxis)
        settext(e)
        
    }

 
    return (<Card title={"数据服务总览"}>
        <div>
            <Radio.Group onChange={onChange} defaultValue="a" buttonStyle="solid">
                <Radio.Button value="a">开发API</Radio.Button>
                <Divider type="vertical" />
                <Radio.Button value="b">调用API</Radio.Button>
            </Radio.Group>
            <Divider />
            <Row>
                <Col sm={16}>
                    <Row>
                        <Col sm={16}>
                        <Radio.Group onChange={onChange} defaultValue="a" buttonStyle="solid" size="small">
                            <Radio.Button value="a" onClick={()=>setSelect(sele)}>调用趋势</Radio.Button>
                            <Radio.Button value="b" onClick={()=>setSelect(sele2)}>发展趋势</Radio.Button>
                        </Radio.Group>
                        </Col>
                        <Col sm={8}>
                            <Row>
                                <Select value={text} style={{ width: 120 ,float:"left",marginRight:"10px",marginLeft:types?"0px":"120px"}} size="small" onChange={(e)=>getData(e)}>
                                    {
                                        select.map((item,index)=>{
                                            return (<Option value={item}>{item}</Option>)
                                        })
                                    }
                                </Select>
                                {
                                    types? <Select defaultValue="调用总次数" style={{ width: 120,float:"left" }} size="small" onChange={handleChange}>
                                                <Option value="调用总次数">调用总次数</Option>
                                                <Option value="成功次数/失败次数">成功次数/失败次数</Option>
                                                <Option value="合法次数/非法次数">合法次数/非法次数</Option>
                                            </Select>:null
                                }
                               
                            </Row>
                        </Col>
                    </Row>
                    <div id="main" ref={ms}></div>
                </Col>
                <Col sm={7} style={{marginLeft:"10px"}}>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card>
                            <Statistic
                                value={11.28}
                                precision={2}
                                valueStyle={{ color: '#3f8600' }}
                            />
                            <h3 style={{fontWeight:"600",textAlign:"center",fontSize:"18px"}}>已发布</h3>
                            </Card>
                        </Col>
                        <Col span={8}>
                    
                        <Card>
                            <Statistic
                                value={11.28}
                                precision={2}
                                valueStyle={{ color: '#3f8600' }}
                            />
                              <h3 style={{fontWeight:"600",textAlign:"center",fontSize:"18px"}}>开发中</h3>
                            </Card>
                        
                        </Col>
                        <Col span={8}>
                            <Card>
                                <Statistic
                                    value={11.28}
                                    precision={2}
                                    valueStyle={{ color: '#3f8600' }}
                                />
                                 <h3 style={{fontWeight:"600",textAlign:"center",fontSize:"18px"}}>申请者</h3>
                                </Card>
                        </Col>
                    </Row>
                    <Card>
                        <Row gutter={16} justify="space-between">
                            <Col>1.12~1.19 总调用</Col>
                            <Col>0</Col>
                        </Row>
                        <Row>
                         <Divider dashed></Divider>
                        </Row>
                        <Row justify="space-between">
                            <Col>
                                <Statistic
                                    title="成功"
                                    value={11.28}
                                    precision={2}
                                    valueStyle={{ color: '#3f8600' }}
                                />
                            </Col>
                            <Col>
                                <Statistic
                                    title="失败"
                                    value={11.28}
                                    precision={2}
                                    valueStyle={{ color: 'red' }}
                                />
                            </Col>
                        </Row>
                        <Row justify="space-between">
                            <Col>
                                <Statistic
                                    title="合法"
                                    value={11.28}
                                    precision={2}
                                    valueStyle={{ color: '#3f8600' }}
                                />
                            </Col>
                            <Col>
                                <Statistic
                                    title="非法"
                                    value={11.28}
                                    precision={2}
                                    valueStyle={{ color: 'red' }}
                                />
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>
    </Card>)
}