import React, { PureComponent } from 'react';
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
import ReactEcharts from 'echarts-for-react';
import { getBarChart,getLineChart,getPieChart } from "./chart";

import {
  BarChartOutlined,
  GlobalOutlined,
  LineChartOutlined,
  PieChartOutlined,
  ProfileOutlined,
} from '@ant-design/icons';

import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';

import { Card, Button, Tooltip, Table, Input, Select, FormItem, Layout, Row, Col } from 'antd';

import HttpService from '../../util/HttpService.jsx';
const { Column, ColumnGroup } = Table;
import "./DashboardCreator.scss";
import {  ChartCard,  MiniArea,  MiniBar,  MiniProgress,  Field,  Bar,  Pie, TimelineChart,} from '../../components/Charts';
import Trend from '../../components/Trend/index.jsx';
import numeral from 'numeral';
import Yuan from '../../util/Yuan';
import styles from './Analysis.less';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const { Header, Content} = Layout;

export default class DragLayout extends PureComponent {
  static defaultProps = {
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    rowHeight: 100,
  };

  constructor(props) {
    super(props);

    this.state = {
      layouts: this.getFromLS("layouts") || {},
      widgets:[]
    }
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
  generateDOM = () => {
    return _.map(this.state.widgets, (l, i) => {
      let option;
      if (l.type === 'bar') {
        option = getBarChart();
      }else if (l.type === 'line') {
        option = getLineChart();
      }else if (l.type === 'pie') {
        option = getPieChart();
      }
      let component = (
        <ReactEcharts
          option={option}
          notMerge={true}
          lazyUpdate={true}
          style={{width: '100%',height:'100%'}}
        />
      )
      return (
        <div key={l.i} data-grid={l}>
          <span className='remove' onClick={this.onRemoveItem.bind(this, i)}>x</span>
          {component}
        </div>
      );
    });
  };

  addChart(type) {
    const addItem = {
      x: (this.state.widgets.length * 3) % (this.state.cols || 12),
      y: Infinity, // puts it at the bottom
      w: 3,
      h: 2,
      i: new Date().getTime().toString(),
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

  render() {
   return (
     <div>

     <Card title="创建仪表板" bodyStyle={{ padding: "0px" }}>

         <Card bodyStyle={{ padding: "5px" }}>
             <Button style={{ marginRight: "10px" }} type="primary">新增行</Button>
             <Button style={{ marginRight: "10px" }} type="primary">保存</Button>
            
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
             <Tooltip placement="top" title="地图">
                 <Button icon={<GlobalOutlined />} />
             </Tooltip>
             <Select setValue={this.form} style={{ minWidth: '300px' }}>
                  <Option kye="1" value="1">一行一列</Option>
                  <Option key="2" value="2">一行二列</Option>
             </Select>
         </Card>
         <Card>
         <div style={{ background: '#fff', padding: 20, minHeight: 800 }}>
           <ResponsiveReactGridLayout
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

     </Card>
 </div >
   );}
}
