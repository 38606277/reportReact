import React, { Component } from 'react';
import { Row, Col, Card,Tooltip,Icon } from 'antd';
import ChartCard from '../../components/Charts/ChartCard/index.jsx';
import Field from '../../components/Charts/ChartCard/index.jsx';

// import {
//   ChartCard,
//   MiniArea,
//   MiniBar,
//   MiniProgress,
//   Field,
//   Bar,
//   Pie,
//   TimelineChart,
// } from '../../components/Charts';
import Trend from '../../components/Trend/index.jsx';


class Analysis extends Component {
  constructor(props) {
    super(props);

  }
  state = {
  };
  componentDidMount() {
  };
  render() {
    return (
      <div style={{margin:'20 20 20 20'}}>
        <Row gutter={20} style={{marginBottom:'24px'}}>
          <Col span={6}>
            <Card style={{width:'235px',lineHeight:'182px'}}>aa</Card>
          </Col>
          <Col span={6}>
          <ChartCard
              bordered={false}
              title={
                "总销售额111"
              }
              action={
                <Tooltip
                  title="指标"
                >
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={() => '$126560'}
              footer={
                <Field
                label='日销售额'
                value={`￥12423.00`}
              />
                
              }
              contentHeight={46}
            >
              <Trend flag="up" style={{ marginRight: 16 }}>
                <span>日同比</span>
                <span >11%</span>
              </Trend>
              <Trend flag="down">
                <span>周同比</span>
                <span >11%</span>
              </Trend>
            </ChartCard>
            </Col>
          <Col span={6}><Card >aa</Card></Col>
          <Col span={6}><Card >aa</Card></Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <Card >aa</Card>
          </Col>
          <Col span={12}><Card >aa</Card></Col>
        </Row>
        <Row gutter={20}>
          <Col span={24}>
            <Card >aa</Card>
          </Col>
        </Row>
      </div>
    );
  };
}


export default Analysis;
