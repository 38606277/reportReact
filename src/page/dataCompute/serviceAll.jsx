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
    Tabs,
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
const { TabPane } = Tabs;
// import 
import HttpService from '../../util/HttpService.jsx';
import echarts from 'echarts';
// // 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend'
import 'echarts/lib/chart/pie';
import one from './setXList.js'
import style from './serviceAll.less'

const sele=["近12小时","近1天","近7天","近30天"]
const sele2=["今日","本周","本月","本年"]
const select3=["成功率","失败率","合法率","失败率"]
const select4=["时长平均总值","成功时长平均总值","失败时长平均总值"]
const select5=["调用总次数","成功次数","失败次数","合法次数","非法次数"]
export default (props)=>{
    const {title}=props
    const [xAxis,setxAxis]=useState(["12: 00", "13: 00", "14: 00", "15: 00", "16: 00", "17: 00", "18: 00", "19: 00", "20: 00", "21: 00", "22: 00", "23: 00"])
    const [select,setSelect]=useState([...sele])
    const [series,setseries]=useState([])
    const ms=useRef()
    const [main , setMain] = useState('')
    const [types,setTypes]=useState(true)
    const [text,settext]=useState("近12小时")
    const [Data1,setData1]=useState("近12小时")//调用比例
    const [method1,setmethod1]=useState("成功率")//合法率
    const [Data2,setData2]=useState("近12小时")//调用时间
    const [method2,setmethod2]=useState("时长平均总值")//平局值
    const [Data3,setData3]=useState("近12小时")//调用次数
    const [method3,setmethod3]=useState("调用总次数")//调用总次数
    const [Rstatistic,setRstatistic]=useState(true)
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
        setRstatistic(!Rstatistic)
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
           const arr =[{name: '调用总次数',type: 'line',stack: '总量',areaStyle: {},data: [120, 132, 101, 134, 90, 230, 210, 230, 210, 210, 230, 21]}]
            setseries([...arr])
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
            myChart.resize({ height: '256px',width:'764px' })
            myChart.setOption(option);
        }
    },[main,xAxis,series])
    
    const getData=(e)=>{
        one(e,setxAxis)
        settext(e)
        
    }

 
    return (<Card title={"数据服务总览"}>
          <Tabs defaultActiveKey="1" onChange={onChange}>
            <TabPane tab="开发API" key="a">
            </TabPane>
            <TabPane tab="调用API" key="b">
            </TabPane>
        </Tabs>
            {/* <Radio.Group onChange={onChange} defaultValue="a" buttonStyle="solid">
                <Radio.Button value="a">开发API</Radio.Button>
                <Divider type="vertical" />
                <Radio.Button value="b">调用API</Radio.Button>
            </Radio.Group> */}
            {/* <Divider /> */}
            <Row>
                <Col sm={16}>
                    <Card>
                        <Row style={{marginBottom:"20px"}}>
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
                        <Row><div id="main" ref={ms}></div></Row>
                    </Card>
                    <Row justify="space-between" style={{padding:"20px 0"}}>
                        <Col sm={11}>
                            <Card>
                                <Row justify="space-between" align="middle"  style={{marginBottom:"10px"}}>
                                    <Col style={{fontWeight:"600",fontSize:"18px"}}>调用比率top5</Col>
                                    <Col>
                                        <Row>
                                            <Select value={Data1} style={{ width: 100 ,float:"left",marginRight:"10px"}} size="small" onChange={(e)=>setData1(e)}>
                                                {
                                                    select.map((item,index)=>{
                                                        return (<Option value={item}>{item}</Option>)
                                                    })
                                                }
                                            </Select>
                                            <Select value={method1} style={{ width: 100 ,float:"left"}} size="small" onChange={(e)=>setmethod1(e)}>
                                                {
                                                    select3.map((item,index)=>{
                                                        return (<Option value={item}>{item}</Option>)
                                                    })
                                                }
                                            </Select>
                                        </Row>
                                    </Col>
                                </Row>
                                < Empty description="暂无数据" style={{padding:"55px"}}/>
                            </Card>
                        </Col>
                        <Col sm={11}>
                            <Card>
                                <Row justify="space-between" align="middle"  style={{marginBottom:"10px"}}>
                                    <Col style={{fontWeight:"600",fontSize:"18px"}}>调用时间top5</Col>
                                    <Col>
                                        <Row>
                                            <Select value={Data2} style={{ width: 100 ,float:"left",marginRight:"10px"}} size="small" onChange={(e)=>setData2(e)}>
                                                {
                                                    select.map((item,index)=>{
                                                        return (<Option value={item}>{item}</Option>)
                                                    })
                                                }
                                            </Select>
                                            <Select value={method2} style={{ width: 100 ,float:"left"}} size="small" onChange={(e)=>setmethod2(e)}>
                                                {
                                                    select4.map((item,index)=>{
                                                        return (<Option value={item}>{item}</Option>)
                                                    })
                                                }
                                            </Select>
                                        </Row>
                                    </Col>
                                </Row>
                                < Empty description="暂无数据" style={{padding:"55px"}}/>
                            </Card>
                        </Col>
                        <Col sm={11} style={{marginTop:"20px"}}>
                            <Card>
                                <Row justify="space-between" align="middle"  style={{marginBottom:"10px"}}>
                                    <Col style={{fontWeight:"600",fontSize:"18px"}}>调用次数top5</Col>
                                    <Col>
                                        <Row>
                                            <Select value={Data3} style={{ width: 100 ,float:"left",marginRight:"10px"}} size="small" onChange={(e)=>setData3(e)}>
                                                {
                                                    select.map((item,index)=>{
                                                        return (<Option value={item}>{item}</Option>)
                                                    })
                                                }
                                            </Select>
                                            <Select value={method3} style={{ width: 100 ,float:"left"}} size="small" onChange={(e)=>setmethod3(e)}>
                                                {
                                                    select5.map((item,index)=>{
                                                        return (<Option value={item}>{item}</Option>)
                                                    })
                                                }
                                            </Select>
                                        </Row>
                                    </Col>
                                </Row>
                                < Empty description="暂无数据" style={{padding:"55px"}}/>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <div sm={7}  className={style.right}>
                    {
                        Rstatistic?
                        <Row gutter={16} className={style.rightTitle} justify="space-between">
                            <div className={style.rightTitleList}>
                                <div className={style.rightTitleListTitle}>11.23</div>
                                <div className={style.rightTitleListText}>已发布</div>
                            </div>
                            <div className={style.border}></div>
                            <div  className={style.rightTitleList}>
                                <div className={style.rightTitleListTitle}>11.23</div>
                                <div className={style.rightTitleListText}>已发布</div>
                            </div>
                            <div className={style.border}></div>
                            <div  className={style.rightTitleList}>
                                <div className={style.rightTitleListTitle}>11.23</div>
                                <div className={style.rightTitleListText}>已发布</div>
                            </div>
                    </Row>:
                        <div className={style.rightTitle} style={{width:"326px",marginLeft:"-8px"}}>
                            <div>
                                <div className={style.rightTitleListTitle2}>11.23</div>
                                <div className={style.rightTitleListText2}>已申请</div>
                            </div> 
                        </div>
                    }
                   
                    <Card className={style.rightBottom}>
                        <Row gutter={16} justify="space-between" >
                            <Col style={{color:"#252b3a",fontSize:"14px"}}>1.12~1.19 总调用</Col>
                            <Col className={style.rightBottomnumber}>0</Col>
                        </Row>
                        <Row>
                         <Divider dashed style={{marginTop:"-1px"}}></Divider>
                        </Row>
                        <Row justify="space-between">
                            <Col>
                                <Statistic
                                    title="成功"
                                    value={0}
                                    valueStyle={{ color: '#50d4ab',fontSize:"18px"}}
                                />
                            </Col>
                            <Col>
                                <Statistic
                                    title="失败"
                                    value={0}
                                    valueStyle={{ color: '#ff6464' ,fontSize:"18px"}}
                                />
                            </Col>
                        </Row>
                        <Row justify="space-between">
                            <Col>
                                <Statistic
                                    title="合法"
                                    value={0}
                                    valueStyle={{ color: '#50d4ab' ,fontSize:"18px"}}
                                />
                            </Col>
                            <Col>
                                <Statistic
                                    title="非法"
                                    value={0}
                                    valueStyle={{ color: '#ff6464' ,fontSize:"18px"}}
                                />
                            </Col>
                        </Row>
                    </Card>
                </div>
            </Row>
    </Card>)
}