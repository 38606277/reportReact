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
import echarts from 'echarts';
// // 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend'
import 'echarts/lib/chart/pie';
const option1  =  {//完成率
    tooltip: {
        formatter: '{a} <br/>{b} : {c}%'
    },
    // toolbox: {
    //     feature: {
    //         restore: {},
    //         saveAsImage: {}
    //     }
    // },
    series: [
        {
            name: '业务指标',
            type: 'gauge',
            detail: {formatter: '{value}%'},
            data: [{value: 30.7, name: '完成率'}]
        }
    ]
};
const option2 ={
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎', '百度', '谷歌', '必应', '其他']
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
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '直接访问',
            type: 'bar',
            data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
            name: '邮件营销',
            type: 'bar',
            stack: '广告',
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: '联盟广告',
            type: 'bar',
            stack: '广告',
            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: '视频广告',
            type: 'bar',
            stack: '广告',
            data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
            name: '搜索引擎',
            type: 'bar',
            data: [862, 1018, 964, 1026, 1679, 1600, 1570],
            markLine: {
                lineStyle: {
                    type: 'dashed'
                },
                data: [
                    [{type: 'min'}, {type: 'max'}]
                ]
            }
        },
        {
            name: '百度',
            type: 'bar',
            barWidth: 5,
            stack: '搜索引擎',
            data: [620, 732, 701, 734, 1090, 1130, 1120]
        },
        {
            name: '谷歌',
            type: 'bar',
            stack: '搜索引擎',
            data: [120, 132, 101, 134, 290, 230, 220]
        },
        {
            name: '必应',
            type: 'bar',
            stack: '搜索引擎',
            data: [60, 72, 71, 74, 190, 130, 110]
        },
        {
            name: '其他',
            type: 'bar',
            stack: '搜索引擎',
            data: [62, 82, 91, 84, 109, 110, 120]
        }
    ]
};
const option3 = {
    title: {
        text: '某站点用户访问来源',
        subtext: '纯属虚构',
        left: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1548, name: '搜索引擎'}
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

const dataSource1 = [
    {
      key: '1',
      name: '场景1',
      age: 30,
      address: '2020-19-20',
    },
    {
      key: '2',
      name: '场景2',
      age: 42,
      address: '2020-19-20',
    },
    {
        key: '3',
        name: '场景3',
        age: 100,
        address: '2020-19-20',
      },
  ];
  const columns1 = [
    {
      title: '场景',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '统计结果',
      dataIndex: 'age',
      key: 'age',
      render:(_)=>{
          return <Tag color={getColor(_)}>
              {_}
          </Tag>
      }
    },
    {
      title: '截止数据',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  const columns2 = [
    {
      title: '场景',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '统计结果',
      dataIndex: 'age',
      key: 'age',
      render:(_)=>{
          return <Tag color={_<50?"red":"green"}>
              {_<50?"失败":"成功"}
          </Tag>
      }
    },
    {
      title: '截止数据',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  const columns3 = [
    {
      title: '项目',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '统计',
      dataIndex: 'data',
      key: 'data',
      render:(_)=>{
          return <Tag color={_[0]<200?"red":"green"}>
              {_[0]}
          </Tag>
      }
    },
    {
      title: '截止数据',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  const getColor=(num)=>{
        if(num>=0&&num<=30){
            return "#ccc"
        }
        if(num>=31&&num<=60){
            return "#cd201f"
        }
        if(num>=61){
            return "#87d068"
        }
  }
export default (props)=>{
    const ms1=useRef()//完成率
    const [main1,setMain]=useState("")//完成率
    const ms2=useRef()//分类
    const [main2,setMain2]=useState("")//分类
    const ms3=useRef()//数据访问监控
    const [main3,setMain3]=useState("")//数据访问监控
    useEffect(()=>{//完成率
        setMain(ms1.current)
        if(main1 !== ""){
            initializationEcharts("600px","400px",main1,option1)
        }
    },[main1])
    useEffect(()=>{//所有分类
        setMain2(ms2.current)
        if(main2 !== ""){
            initializationEcharts("600px","400px",main2,option2)
        }
    },[main2])
    useEffect(()=>{//所有分类
        setMain3(ms3.current)
        if(main3 !== ""){
            initializationEcharts("1000px","400px",main3,option3)
        }
    },[main3])
    const initializationEcharts=(w,h,dom,list)=>{
        let myChart = echarts.init(dom);
        myChart.resize({ height: h,width:w })
        myChart.setOption(list)
    }
    return (
        <Card title="表报">
            <Row justify="space-between"  >
                <Card bodyStyle={{padding:'0px'}} title="完成率">
                    <div ref={ms1}
                    ></div>
                </Card>
                <Card bodyStyle={{padding:'0px'}} title="本周所以分类访问次数">
                    <div ref={ms2}
                    ></div>
                </Card>
            </Row>
            <Row justify="space-between"  style={{marginTop:"20px"}}>
                <Card title="数据统计" style={{width:"600px"}}>
                   <Table columns={columns1} dataSource={dataSource1} pagination={false} size="small" >
                   </Table>
                </Card>
                <Card title="分类扩展问题" style={{width:"600px"}}>
                    <Table columns={columns2} dataSource={dataSource1} pagination={false} size="small">
                    </Table>
                </Card>
            </Row>
            <Card title="组报表" style={{marginTop:"20px"}}>
                   <Table columns={columns3} dataSource={option2.series} pagination={false} size="small">
                   </Table>
            </Card>
            <div ref={ms3}>

            </div>
        </Card>            
    )
}