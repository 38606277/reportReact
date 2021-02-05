import React, { PureComponent } from 'react';
import { WidthProvider, Responsive } from "react-grid-layout";
import _, { stubFalse, takeRightWhile } from "lodash";
import ReactEcharts from 'echarts-for-react';
import { getBarChart,getLineChart,getPieChart } from "./chart";

import {
  BarChartOutlined,
  GlobalOutlined,
  LineChartOutlined,
  PieChartOutlined,
  ProfileOutlined,
} from '@ant-design/icons';

// import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';

import { Card, Button, Tooltip, Table, Input, Select, FormItem, Layout, Row, Col,Drawer,Form} from 'antd';

import HttpService from '../../util/HttpService.jsx';
import "./DashboardCreator.scss";

import Map from './Map.jsx'
const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default class DragLayout extends PureComponent {
  static defaultProps = {
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    rowHeight: 100,
  };

  constructor(props) {
    super(props);

    this.state = {
      layouts: this.getFromLS("layouts") || {},
      widgets:[],
      getBarChart:getBarChart(),
      visible:false,
      Class:[],//报表类别
      ClassName:"",//获取报表类别名称,
      Name:"",//报表名称
      Fname:[],//报表数组
      x:"",//获取x轴名称
      xList:[],//x轴数据
      y:"",//获取y轴名称
      yList:[],//y周数据
      obj:{}
    }
  }
  componentDidMount(){
    const box=this.refs.Layout
    const layout=this.refs.layout
    const h=document.getElementsByClassName('navbar-side')[0].offsetHeight-box.getBoundingClientRect().y
    console.log(box.getBoundingClientRect().y)
    box.style.height=h+"px"
    box.style.overflowY="scroll"
    HttpService.post("/reportServer/query/getAllQueryClass",JSON.stringify({})).then(res=>{
      if(res.resultCode==="1000"){
          this.setState({Class:res.data})
      }
  })
  }
  getFromLS(key) {
    let ls = {};
    if (global.localStorage) {
      try {
        ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
      } catch (e) {
        /*Ignore*/
      }
    }
    return ls[key];
  }

  saveToLS(key, value) {
    if (global.localStorage) {
      global.localStorage.setItem(
        "rgl-8",
        JSON.stringify({
          [key]: value
        })
      );
    }
  }
  setlist(l){
    this.setState({visible:true,obj:l})
  }
  borders(e){
    console.log(e.target.innerHTML)
  }
  generateDOM = () => {
    return _.map(this.state.widgets, (l, i) => {
      let component =( l.list?
        <ReactEcharts
          option={l.list}
          notMerge={true}
          lazyUpdate={true}
          style={{width: '100%',height:'100%'}}
        />:<Map/>
      )
      return (
        <div key={l.i} data-grid={l} id={l.i} onClick={(e)=>this.borders(e)} onDoubleClick={(e)=>this.setlist(l)}>
          <span className='remove' onClick={this.onRemoveItem.bind(this, i)}>x</span>
          {component}
        </div>
      );
    });
  };

  addChart(type) {
    let option;
    if (type === 'bar') {
      option = getBarChart();
    }else if (type === 'line') {
      option = getLineChart();
    }else if (type === 'pie') {
      option = getPieChart();
    }else if (type==="map"){
      option=null
    }
    const addItem = {
      x: (this.state.widgets.length * 3) % (this.state.cols || 12),
      y: Infinity, // puts it at the bottom
      w: 3,
      h: 2,
      i: new Date().getTime().toString(),
      list:{...option},
      echarts:{...option}
    };
    this.setState(
      {
        widgets: this.state.widgets.concat({
          ...addItem,
          type,
        }),
      },
    );
  };

  onRemoveItem(i) {
    console.log(this.state.widgets)
    this.setState({
      widgets: this.state.widgets.filter((item,index) => index !=i)
    });

  }

  onLayoutChange(layout, layouts) {
    this.saveToLS("layouts", layouts);
    this.setState({ layouts });
  }
  getOffsect(id){
    const box=this.refs.Layout.getBoundingClientRect()
    let  dom =document.getElementById(id)
    const obj=dom.getBoundingClientRect()
    obj.x=obj.x-box.x
    obj.y=obj.y-box.y
    const position={}
    for(let key in obj){
      position[key]=obj[key]
    }
    return   position
  }
  preservation(){
    const {widgets}=this.state
    const arr=widgets.map(item=>{
      return {
        ...item,
        position:this.getOffsect(item.i)
      }
    })
    console.log(arr)
  }
  onClose(){
    this.setState({visible:false,obj:{},Fname:[],xList:[]})
  }
  formClass(e){
    this.setState({ClassName:e})
    HttpService.post("/reportServer/query/getQueryByClassID/"+e,JSON.stringify({})).then(res=>{
      if(res.resultCode==="1000"){
          this.setState({Fname:res.data})
      }
  })
  }
  formname(e){
    this.setState({Name:e})
    HttpService.post("reportServer/query/getQueryParam/"+e,JSON.stringify({})).then(res=>{
      if(res.resultCode==="1000"){
        const arr=res.data.out.map(item=>{
          return {
            value:item.out_name
          }
        })
        this.setState({xList:arr})
          // console.log(res)
      }
  })
  }
  setx(e){
    this.setState({x:e})
    HttpService.post("reportServer/query/execQuery/"+this.state.ClassName+"/"+this.state.Name,JSON.stringify([
      {
          "in":[]
      },
      {startIndex: 1, perPage: 10, searchResult: ""}
  ])).then(res=>{
    const arr=res.data.list.map((item=>{
         for(let key in item){
          if(key===e){
            return item[key]
          }
        }
    }))
    const myarr =JSON.parse(JSON.stringify(this.state.widgets))

    let i=0
    myarr.forEach((item,index)=>{
      if(item.i===this.state.obj.i){
        i=index
      }
    })
    const mydata =this.state.widgets[i]
    // mydata.echarts.xAxis.data=[...arr]
    mydata.list.xAxis.data=[...arr]
    // console.log(i)
    myarr.splice(i,1,{...mydata})
    // console.log(myarr)
    const self=this
    this.setState({widgets:[],obj:{},visible:false,Fname:[],xList:[]}, ()=> {
      self.setState({ widgets:myarr });//重新赋值
  })
  })

  }
  render() {
    const {ClassName,Class,visible,Fname,Name,xList,x}=this.state
   return (
     <div>
     <Card title="创建仪表板" bodyStyle={{ padding: "0px" }}>
         <Card bodyStyle={{ padding: "5px" }}>
             <Button style={{ marginRight: "10px" }} type="primary">新增行</Button>
             <Button style={{ marginRight: "10px" }} type="primary" onClick={()=>{
               this.preservation()
             }}>保存</Button>
            
              <Tooltip placement="top" title="指标卡片">
                 <Button icon={<ProfileOutlined />}   onClick={this.addChart.bind(this,'line')} />
             </Tooltip>
             <Tooltip placement="top" title="柱状图">
                 <Button icon={<BarChartOutlined />} onClick={this.addChart.bind(this,'bar')}/>
             </Tooltip>
             <Tooltip placement="top" title="拆线图">
                 <Button icon={<LineChartOutlined />}  onClick={this.addChart.bind(this,'line')} />
             </Tooltip>
             <Tooltip placement="top" title="饼图">
                 <Button icon={<PieChartOutlined />} onClick={this.addChart.bind(this,'pie')} />
             </Tooltip>
             <Tooltip placement="top" title="地图"  onClick={this.addChart.bind(this,'map')} >
                 <Button icon={<GlobalOutlined />} />
             </Tooltip>
             <Select setValue={this.form} style={{ minWidth: '300px' }}>
                  <Option kye="1" value="1">一行一列</Option>
                  <Option key="2" value="2">一行二列</Option>
             </Select>
         </Card>
         <Card>
         <div ref='Layout' style={{ background: '#fff',width:"100%"}}>
           <ResponsiveReactGridLayout
            ref="layout"
             className="layout"
             {...this.props}
             layouts={this.state.layouts}
             onLayoutChange={(layout, layouts) =>
               this.onLayoutChange(layout, layouts)
             }
           >
             {this.generateDOM()}
           </ResponsiveReactGridLayout>
         </div>
         </Card>
         <Drawer
          title="查询数据"
          placement="right"
          closable={false}
          onClose={()=>this.onClose()}
          visible={visible}
          width={420}
        >
            {/* <Row>
              <Button onClick={()=>{
                    const myarr =JSON.parse(JSON.stringify(this.state.widgets))

                    let i=0
                    console.log(this.state.obj)
                    for(let o=0;o<myarr.length;o+=1){
                      let item=myarr[o]
                      if(item.i===this.state.obj.i){
                        console.log(i)
                        i=0
                      }
                    }
                    console.log(i)
              }}>找下标</Button>
            </Row> */}
            <Form.Item
                label="报表类别"
                name="报表类别"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Select
                    placeholder="请选择报表类别"
                    size="middle"
                    showArrow
                    style={{width:"140px"}}
                    allowClear
                    value={ClassName}
                    onChange={(e)=>{
                        this.formClass(e)
                    }}
            >
                {
                    Class.map((item,index)=>{
                        return(
                            <Option key={index} value={item.class_id}>{item.class_name}</Option >
                        )
                    })
                }
            </Select>
            </Form.Item>
            <Form.Item
                label="报表名称"
                name="报表名称"
                rules={[{ required: true, message: 'Please input your password!' }]}
                preserve={false}
            >
                <Select
                    style={{width:"140px"}}
                    placeholder="请选择报表类别"
                    size="middle"
                    showArrow
                    allowClear
                    value={Name}
                    onChange={(e)=>{
                        this.formname(e)
                    }}
            >
                {
                    Fname[0]?Fname.map((item,index)=>{
                        return (
                            <Option key={index} value={item.qry_id}>{item.qry_name}</Option >
                        )
                    }):null
                }
            </Select>
            </Form.Item>
            <Form.Item
                label="请选择X轴数据"
                name="请选择X轴数据"
                rules={[{ required: true, message: 'Please input your password!' }]}
                preserve={false}
            >
                <Select
                    style={{width:"140px"}}
                    placeholder="请选择报表类别"
                    size="middle"
                    showArrow
                    allowClear
                    value={x}
                    onChange={(e)=>{
                        this.setx(e)
                    }}
            >
                {
                    xList[0]?xList.map((item,index)=>{
                        return (
                            <Option key={index} value={item.value}>{item.value}</Option >
                        )
                    }):null
                }
            </Select>
            </Form.Item>
        </Drawer>
     </Card>
 </div >
   );}
}
