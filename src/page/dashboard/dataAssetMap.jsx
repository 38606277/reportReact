import React        from 'react';
import { Link }     from 'react-router-dom';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Row, Col, Card, Tabs, Table, Radio, DatePicker, Tooltip, Menu, Dropdown } from 'antd';
import {  ChartCard,  MiniArea,  MiniBar,  MiniProgress,  Field,  Bar,  Pie, TimelineChart,} from '../../components/Charts';
import Trend from '../../components/Trend/index.jsx';
import NumberInfo from '../../components/NumberInfo';

import Map2 from './dataAssetMap2.jsx'
import numeral from 'numeral';
import GridContent from '../../components/PageHeaderWrapper/GridContent';
import Yuan from '../../util/Yuan';
import { getTimeDistance } from '../../util/utils';
import styles from './Analysis.less';


const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const rankingListData = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `工专路 ${i} 号店`,
    total: 323234,
  });
}
export default class dataAssetMap extends React.Component{
    constructor(props) {
        super(props);
        this.rankingListData = [];
        for (let i = 0; i < 7; i += 1) {
          this.rankingListData.push({
            title: '1',
            total: 323234,
          });
        }
      }
    
      state = {
        salesType: 'all',
        currentTabKey: '',
        rangePickerValue: getTimeDistance('year'),
        loading: true,
      };
    
      componentDidMount() {
       
      }
    
    //   componentWillUnmount() {
    //     const { dispatch } = this.props;
    //     dispatch({
    //       type: 'chart/clear',
    //     });
    //     cancelAnimationFrame(this.reqRef);
    //     clearTimeout(this.timeoutId);
    //   }
    
    handleChangeSalesType = e => {
      this.setState({
        salesType: e.target.value,
      });
    };
  
    handleTabChange = key => {
      this.setState({
        currentTabKey: key,
      });
    };
  
    handleRangePickerChange = rangePickerValue => {
     
    };
  
    selectDate = type => {
     
    };
  
    isActive(type) {
      const { rangePickerValue } = this.state;
      const value = getTimeDistance(type);
      if (!rangePickerValue[0] || !rangePickerValue[1]) {
       

        a
        return '';
      }
      if (
        rangePickerValue[0].isSame(value[0], 'day') &&
        rangePickerValue[1].isSame(value[1], 'day')
      ) {
        return styles.currentDate;
      }
      return '';
    }

    render() {
           
     
            const { rangePickerValue, salesType, loading: stateLoading, currentTabKey } = this.state;
    const { chart, loading: propsLoading } = this.props;

const visitData= [{"x":"2018-11-19","y":7},{"x":"2018-11-20","y":5},{"x":"2018-11-21","y":4},{"x":"2018-11-22","y":2},
{"x":"2018-11-23","y":4},{"x":"2018-11-24","y":7},{"x":"2018-11-25","y":5},{"x":"2018-11-26","y":6},
{"x":"2018-11-27","y":5},{"x":"2018-11-28","y":9},{"x":"2018-11-29","y":6},{"x":"2018-11-30","y":3},
{"x":"2018-12-01","y":1},{"x":"2018-12-02","y":5},{"x":"2018-12-03","y":3},{"x":"2018-12-04","y":6},
{"x":"2018-12-05","y":5}];
const visitData2=[{"x":"2018-11-19","y":1},{"x":"2018-11-20","y":6},
{"x":"2018-11-21","y":4},{"x":"2018-11-22","y":8},{"x":"2018-11-23","y":3},{"x":"2018-11-24","y":7},
{"x":"2018-11-25","y":2}];
const salesData=[{"x":"1月","y":589},{"x":"2月","y":412},{"x":"3月","y":573},
{"x":"4月","y":997},{"x":"5月","y":596},{"x":"6月","y":542},{"x":"7月","y":209},{"x":"8月","y":480},
{"x":"9月","y":1140},{"x":"10月","y":507},{"x":"11月","y":873},{"x":"12月","y":710}];
const searchData=[{"index":1,"keyword":"人员基本信息","count":418,"range":59,"status":1},
{"index":2,"keyword":"上市公司财务报表","count":180,"range":27,"status":1},
{"index":3,"keyword":"公司收入","count":458,"range":6,"status":0},
{"index":4,"keyword":"资产基本信息","count":832,"range":68,"status":0},
{"index":5,"keyword":"项目基本信息","count":469,"range":76,"status":1},
{"index":6,"keyword":"搜索关键词-5","count":121,"range":17,"status":0},
{"index":7,"keyword":"搜索关键词-6","count":374,"range":63,"status":0},
{"index":8,"keyword":"搜索关键词-7","count":838,"range":15,"status":1},
{"index":9,"keyword":"搜索关键词-8","count":400,"range":77,"status":1},
{"index":10,"keyword":"搜索关键词-9","count":953,"range":5,"status":0},
{"index":11,"keyword":"搜索关键词-10","count":498,"range":99,"status":0},
{"index":12,"keyword":"搜索关键词-11","count":621,"range":83,"status":1},{"index":13,"keyword":"搜索关键词-12","count":62,"range":70,"status":1},
{"index":14,"keyword":"搜索关键词-13","count":245,"range":42,"status":1},{"index":15,"keyword":"搜索关键词-14","count":316,"range":97,"status":0},
{"index":16,"keyword":"搜索关键词-15","count":204,"range":41,"status":0},{"index":17,"keyword":"搜索关键词-16","count":528,"range":43,"status":0},
{"index":18,"keyword":"搜索关键词-17","count":307,"range":64,"status":1},{"index":19,"keyword":"搜索关键词-18","count":904,"range":29,"status":1},
{"index":20,"keyword":"搜索关键词-19","count":539,"range":23,"status":0},{"index":21,"keyword":"搜索关键词-20","count":943,"range":79,"status":1},
{"index":22,"keyword":"搜索关键词-21","count":894,"range":80,"status":1},{"index":23,"keyword":"搜索关键词-22","count":666,"range":44,"status":0},
{"index":24,"keyword":"搜索关键词-23","count":273,"range":2,"status":0},{"index":25,"keyword":"搜索关键词-24","count":455,"range":61,"status":1},
{"index":26,"keyword":"搜索关键词-25","count":303,"range":33,"status":1},{"index":27,"keyword":"搜索关键词-26","count":261,"range":24,"status":0},
{"index":28,"keyword":"搜索关键词-27","count":207,"range":57,"status":1},{"index":29,"keyword":"搜索关键词-28","count":406,"range":45,"status":1},
{"index":30,"keyword":"搜索关键词-29","count":746,"range":85,"status":0},{"index":31,"keyword":"搜索关键词-30","count":290,"range":86,"status":0},
{"index":32,"keyword":"搜索关键词-31","count":168,"range":97,"status":0},{"index":33,"keyword":"搜索关键词-32","count":802,"range":21,"status":1},
{"index":34,"keyword":"搜索关键词-33","count":195,"range":14,"status":0},{"index":35,"keyword":"搜索关键词-34","count":122,"range":66,"status":1},
{"index":36,"keyword":"搜索关键词-35","count":556,"range":27,"status":0},{"index":37,"keyword":"搜索关键词-36","count":314,"range":96,"status":0},
{"index":38,"keyword":"搜索关键词-37","count":387,"range":48,"status":1},{"index":39,"keyword":"搜索关键词-38","count":525,"range":93,"status":0},
{"index":40,"keyword":"搜索关键词-39","count":722,"range":66,"status":1},{"index":41,"keyword":"搜索关键词-40","count":851,"range":67,"status":1},
{"index":42,"keyword":"搜索关键词-41","count":495,"range":95,"status":1},{"index":43,"keyword":"搜索关键词-42","count":167,"range":3,"status":0},
{"index":44,"keyword":"搜索关键词-43","count":797,"range":97,"status":1},{"index":45,"keyword":"搜索关键词-44","count":410,"range":79,"status":1},
{"index":46,"keyword":"搜索关键词-45","count":367,"range":12,"status":0},{"index":47,"keyword":"搜索关键词-46","count":247,"range":14,"status":0},
{"index":48,"keyword":"搜索关键词-47","count":838,"range":52,"status":0},{"index":49,"keyword":"搜索关键词-48","count":597,"range":24,"status":0},
{"index":50,"keyword":"搜索关键词-49","count":582,"range":36,"status":1}];
const offlineData=[{"name":"Stores 0","cvr":0.2},{"name":"Stores 1","cvr":0.7},{"name":"Stores 2","cvr":0.2},{"name":"Stores 3","cvr":0.1},
{"name":"Stores 4","cvr":0.3},{"name":"Stores 5","cvr":0.2},{"name":"Stores 6","cvr":0.5},{"name":"Stores 7","cvr":0.8},
{"name":"Stores 8","cvr":0.5},{"name":"Stores 9","cvr":0.5}];
const offlineChartData=[{"x":1542593740927,"y1":25,"y2":87},{"x":1542595540927,"y1":19,"y2":18},{"x":1542597340927,"y1":100,"y2":36},
{"x":1542599140927,"y1":79,"y2":39},{"x":1542600940927,"y1":57,"y2":105},{"x":1542602740927,"y1":48,"y2":40},{"x":1542604540927,"y1":60,"y2":39},
{"x":1542606340927,"y1":34,"y2":18},{"x":1542608140927,"y1":45,"y2":52},{"x":1542609940927,"y1":46,"y2":39},{"x":1542611740927,"y1":38,"y2":14},
{"x":1542613540927,"y1":82,"y2":105},{"x":1542615340927,"y1":97,"y2":23},{"x":1542617140927,"y1":13,"y2":52},{"x":1542618940927,"y1":100,"y2":93},
{"x":1542620740927,"y1":92,"y2":45},{"x":1542622540927,"y1":37,"y2":93},{"x":1542624340927,"y1":74,"y2":17},{"x":1542626140927,"y1":40,"y2":19},
{"x":1542627940927,"y1":17,"y2":107}];
const salesTypeData=[{"x":"HBase","y":4544},{"x":"Hive","y":3321},{"x":"mysql","y":3113},{"x":"mogoodb","y":2341}]; 
const salesTypeDataOnline=[{"x":"人力资源","y":244},{"x":"主数据","y":321},{"x":"三重一大","y":311},{"x":"外部统计数据","y":41},
{"x":"上市公司财务数据","y":121},{"x":"其他","y":111}];
const salesTypeDataOffline=[{"x":"服务器2","y":99},{"x":"服务器1","y":188},{"x":"服务器3","y":344},{"x":"服务器4","y":255},{"x":"其他","y":65}];
const radarData=[{"name":"个人","label":"引用","value":10},{"name":"个人","label":"口碑","value":8},{"name":"个人","label":"产量","value":4},
{"name":"个人","label":"贡献","value":5},{"name":"个人","label":"热度","value":7},{"name":"团队","label":"引用","value":3},
{"name":"团队","label":"口碑","value":9},{"name":"团队","label":"产量","value":6},{"name":"团队","label":"贡献","value":3},
{"name":"团队","label":"热度","value":1},{"name":"部门","label":"引用","value":4},{"name":"部门","label":"口碑","value":1},
{"name":"部门","label":"产量","value":6},{"name":"部门","label":"贡献","value":5},{"name":"部门","label":"热度","value":7}];
    
    const loading = propsLoading || stateLoading;
    const salesExtra = (
      <div className={styles.salesExtraWrap}>
        <div className={styles.salesExtra}>
          <a className={this.isActive('today')} onClick={() => this.selectDate('today')}>
           {"All Day"}
          </a>
          <a className={this.isActive('week')} onClick={() => this.selectDate('week')}>
          {"All Week" }
          </a>
          <a className={this.isActive('month')} onClick={() => this.selectDate('month')}>
             {"All Month"}
          </a>
          <a className={this.isActive('year')} onClick={() => this.selectDate('year')}>
             {"All Year"}
          </a>
        </div>
        <RangePicker
          value={rangePickerValue}
          onChange={this.handleRangePickerChange}
          style={{ width: 256 }}
        />
      </div>
    );
            const topColResponsiveProps = {
              xs: 24,
              sm: 12,
              md: 12,
              lg: 12,
              xl: 6,
              style: { marginBottom: 24 },
            };
            const columns = [
              {
                title: "排名",
                dataIndex: 'index',
                key: 'index',
              },
              {
                title: "数据表名称",
                dataIndex: 'keyword',
                key: 'keyword',
                render: text => <a href="/">{text}</a>,
              },
              {
                title: "用户",
                dataIndex: 'count',
                key: 'count',
                sorter: (a, b) => a.count - b.count,
                className: styles.alignRight,
              },
              {
                title:"周排名",
                dataIndex: 'range',
                key: 'range',
                sorter: (a, b) => a.range - b.range,
                render: (text, record) => (
                  <Trend flag={record.status === 1 ? 'down' : 'up'}>
                    <span style={{ marginRight: 4 }}>{text}%</span>
                  </Trend>
                ),
                align: 'right',
              },
            ];
            const iconGroup = (
              <span className={styles.iconGroup}>
                {/* <Dropdown overlay={menu} placement="bottomRight">
                  <Icon type="ellipsis" />
                </Dropdown> */}
              </span>
            );
            let salesPieData;
            if (salesType === 'all') {
              salesPieData = salesTypeData;
            } else {
              salesPieData = salesType === 'online' ? salesTypeDataOnline : salesTypeDataOffline;
            }
            const activeKey = currentTabKey || (offlineData[0] && offlineData[0].name);
            const CustomTab = ({ data, currentTabKey: currentKey }) => (
              <Row gutter={8} style={{ width: 138, margin: '8px 0' }}>
                <Col span={12}>
                  <NumberInfo
                    title={data.name}
                    subTitle={"访问量增加"}
                    gap={2}
                    total={`${data.cvr * 100}%`}
                    theme={currentKey !== data.name && 'light'}
                  />
                </Col>
                <Col span={12} style={{ paddingTop: 36 }}>
                  <Pie
                    animate={false}
                    color={currentKey !== data.name && '#BDE4FF'}
                    inner={0.55}
                    tooltip={false}
                    margin={[0, 0, 0, 0]}
                    percent={data.cvr * 100}
                    height={64}
                  />
                </Col>
              </Row>
            );
    return (
      <GridContent>
      {/* 第三部分 */}
      <Row gutter={24}>
          <Col {...topColResponsiveProps}>
              <ChartCard
              bordered={false}
              title="数据总量"
              action={
                  <Tooltip
                  title="数据总量"> 
                      <InfoCircleOutlined />
                  </Tooltip>
              }
              
              total={<Link style={{color:'rgba(0, 0, 0, 0.65)'}} to='/dataAsset/dataAssetList'>28,846</Link>}
              footer={
                  <Field
                  label={"日新增"}
                  value={`￥${numeral(323).format('0,0')}`}
                  />
              }
              contentHeight={46}
              >
              <Trend flag="up" style={{ marginRight: 16 }}>
              {"周同比" }
                  <span className={styles.trendText}>12%</span>
              </Trend>
              <Trend flag="down">
                  {"日同比"}
                  <span className={styles.trendText}>11%</span>
              </Trend>
              </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
          <ChartCard
            bordered={false}
            title={"数据源数量"}
            action={
              <Tooltip
                title={ "introduce" }
              >
                <InfoCircleOutlined />
              </Tooltip>
            }
            total={<Link style={{color:'rgba(0, 0, 0, 0.65)'}} to='/dbs/dbsList'>18</Link>}
            footer={
              <Field
                label={ "日访问量"}
                value={numeral(1234).format('0,0')}
              />
            }
            contentHeight={46}
          >
            <MiniArea color="#975FE4" data={visitData} />
          </ChartCard>
        </Col>
        <Col {...topColResponsiveProps}>
          <ChartCard
            bordered={false}
          
            title={"访问量"}
            action={
              <Tooltip
                title={"Introduce"}
              >
                <InfoCircleOutlined />
              </Tooltip>
            }
            total={numeral(6560).format('0,0')}
            footer={
              <Field
                label={"本周增加"}
                value="60%"
              />
            }
            contentHeight={46}
          >
            <MiniBar data={visitData} />
          </ChartCard>
        </Col>
        <Col {...topColResponsiveProps}>
          <ChartCard
           
            bordered={false}
            title={"存储空间"}
            action={
              <Tooltip
                title={"introduce"}
              >
                <InfoCircleOutlined />
              </Tooltip>
            }
            total="78%"
            footer={
              <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                <Trend flag="up" style={{ marginRight: 16 }}>
                  {"已使用"}
                  <span className={styles.trendText}>830G</span>
                </Trend>
                <Trend>
                  {"总空间"}
                  <span className={styles.trendText}>1000G</span>
                </Trend>
              </div>
            }
            contentHeight={46}
          >
            <MiniProgress percent={78} strokeWidth={8} target={80} color="#13C2C2" />
          </ChartCard>
        </Col>
      </Row>
      
    
      {/* 第三部分 */}
      <Row gutter={24}>
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <Card
           
            bordered={false}
            title={"数据表访问排行"}
            // extra={iconGroup}
            style={{ marginTop: 24 }}
          >
           <Table
              rowKey={record => record.index}
              size="small"
              columns={columns}
              dataSource={searchData}
              pagination={{
                style: { marginBottom: 0 },
                pageSize: 5,
              }}
            />
          </Card>
        </Col>
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <Card
            className={styles.salesCard}
            bordered={false}
            title={"数据分布情况" }
            bodyStyle={{ padding: 24 }}
            extra={
              <div className={styles.salesCardExtra}>
                {iconGroup}
                <div className={styles.salesTypeRadio}>
                  <Radio.Group value={salesType} onChange={this.handleChangeSalesType}>
                    <Radio.Button value="catalog">
                      {"数据目录" }
                    </Radio.Button>
                    <Radio.Button value="source">
                      {"数据来源"}
                    </Radio.Button>
                    <Radio.Button value="dbtype">
                      {"存储类型" }
                    </Radio.Button>
                    <Radio.Button value="online">
                      {"数据源"}
                    </Radio.Button>
                  </Radio.Group>
                </div>
              </div>
            }
            style={{ marginTop: 24, minHeight: 509 }}
          >
           
            <Pie
              hasLegend
              subTitle={"表"}
              total={15238}
              data={salesPieData}
              height={248}
              lineWidth={4}
            />
          </Card>
        </Col>
      </Row>
   <Card
        className={styles.offlineCard}
        bordered={false}
        bodyStyle={{ padding: '0 0 32px 0' }}
        style={{ marginTop: 32 }}
      >
        <Tabs activeKey={activeKey} onChange={this.handleTabChange}>
          {offlineData.map(shop => (
            <TabPane tab={<CustomTab data={shop} currentTabKey={activeKey} />} key={shop.name}>
              <div style={{ padding: '0 24px' }}>
                <TimelineChart
                  height={400}
                  data={offlineChartData}
                  titleMap={{
                    y1: 'traffic',
                    y2: 'payments',
                  }}
                />
              </div>
            </TabPane>
          ))}
        </Tabs>
      </Card>
      <Map2 />
      </GridContent>
    );
          }
        }



