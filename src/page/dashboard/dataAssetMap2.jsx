import React,{useState,useEffect} from 'react'
import { Link }     from 'react-router-dom';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Row, Col, Card, Tabs, Table, Radio, DatePicker, Tooltip, Menu, Dropdown } from 'antd';
import {  ChartCard,  MiniArea,  MiniBar,  MiniProgress,  Field,  Bar,  Pie, TimelineChart,} from '../../components/Charts';
import Trend from '../../components/Trend/index.jsx';
import NumberInfo from '../../components/NumberInfo';
import numeral from 'numeral';
import GridContent from '../../components/PageHeaderWrapper/GridContent';
import Yuan from '../../util/Yuan';
import HttpService from '../../util/HttpService.jsx';
import { getTimeDistance } from '../../util/utils';
import styles from './Analysis.less';
const topColResponsiveProps = {
    xs: 24,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 6,
    style: { marginBottom: 24 },
  };
  //列表数据
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
  //列表数据
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
const visitData= [{"x":"2018-11-19","y":7},{"x":"2018-11-20","y":5},{"x":"2018-11-21","y":4},{"x":"2018-11-22","y":2},
{"x":"2018-11-23","y":4},{"x":"2018-11-24","y":7},{"x":"2018-11-25","y":5},{"x":"2018-11-26","y":6},
{"x":"2018-11-27","y":5},{"x":"2018-11-28","y":9},{"x":"2018-11-29","y":6},{"x":"2018-11-30","y":3},
{"x":"2018-12-01","y":1},{"x":"2018-12-02","y":5},{"x":"2018-12-03","y":3},{"x":"2018-12-04","y":6},
{"x":"2018-12-05","y":5}];
const salesTypeData=[{"x":"HBase","y":4544},{"x":"Hive","y":3321},{"x":"mysql","y":3113},{"x":"mogoodb","y":2341}]; 
const salesTypeDataOnline=[{"x":"人力资源","y":9},{"x":"主数据","y":321},{"x":"三重一大","y":311},{"x":"外部统计数据","y":41},
{"x":"上市公司财务数据","y":121},{"x":"其他","y":111}];
const salesTypeDataOffline=[{"x":"服务器2","y":1},{"x":"服务器1","y":188},{"x":"服务器3","y":344},{"x":"服务器4","y":255},{"x":"其他","y":65}];
export default ()=>{
    //数据总量参数
    let [dataAll,setdataAll]=useState(0) //总量
    let [WdataBFB,setWdataBFB]=useState(12)//周百分百
    let [DdataBFB,setDataBFB]=useState(13)//日百分百
    let [daynew,setdaynew]=useState(302)//日新增
    //数据源数量
    let [data_source,setdata_source]=useState([...visitData])//下方波线图数据
    let [D_source,setD_source]=useState(10)//总量
    let [dayNewS,setdayNewS]=useState(0)//日访问量
    //访问量
    let [visit,setvisit]=useState(9019)//访问量
    let [VBFB,setVBFB]=useState(18)
    let [V_list,setV_list]=useState([...visitData])//访问量数据
    //储存空间
    let [StorageBFB,setStorageBFB]=useState(60)//储存空间百分百
    let [use,setuse]=useState(9098)//已使用
    let [Nuse,setNuser]=useState(212121)//未用
    useEffect(()=>{
        let H_dataAll= async()=>{//数据总量请求
            await HttpService.post('/reportServer/DBConnection2/statisticsAllRecordsNumber',JSON.stringify({})).then(res=>{
                setdataAll(res)
            })
        }
        H_dataAll()
    },[])

    //列表数据
    let [salesType,setsalesType]=useState('all')
    let [salesPieData,setsalesPieData]=useState([...salesTypeData])

    //列表函数
   let handleChangeSalesType = e => {
     let obj={
        'all':[...visitData],
        'catalog':[...salesTypeData],
        'source':[...salesTypeDataOnline],
        'dbtype':[...salesTypeDataOffline],
        'online':[{'x':'2',y:12}]
     }
     console.log(obj[e.target.value])
     setsalesPieData(obj[e.target.value])
      console.log(e.target.value)
       setsalesType(e.target.value)
      };

    return (
    <GridContent>
        <Row  gutter={24}>
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
                
                total={<Link style={{color:'rgba(0, 0, 0, 0.65)'}} to='/dataAsset/dataAssetList'>{numeral(dataAll).format('0,0')}</Link>}
                footer={
                    <Field
                    label={"日新增"}
                    value={`￥${numeral(daynew).format('0,0')}`}
                    />
                }
                contentHeight={46}
                >
                <Trend flag="up" style={{ marginRight: 16 }}>
                {"周同比" }
                  <span className={styles.trendText}>{WdataBFB}%</span>
                </Trend>
                <Trend flag="down">
                  {"日同比"}
                  <span className={styles.trendText}>{DdataBFB}%</span>
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
            total={<Link style={{color:'rgba(0, 0, 0, 0.65)'}} to='/dbs/dbsList'>{D_source}</Link>}
            footer={
              <Field
                label={ "日访问量"}
                value={numeral({dayNewS}).format('0,0')}
              />
            }
            contentHeight={46}
          >
            <MiniArea color="#975FE4" data={data_source} />
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
            total={numeral(visit).format('0,0')}
            footer={
              <Field
                label={"本周增加"}
                value={`${VBFB}%`}
              />
            }
            contentHeight={46}
          >
            <MiniBar data={V_list} />
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
            total={`${StorageBFB}%`}
            footer={
              <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                <Trend flag="up" style={{ marginRight: 16 }}>
                  {"已使用"}
                  <span className={styles.trendText}>{use}G</span>
                </Trend>
                <Trend>
                  {"总空间"}
                  <span className={styles.trendText}>{Nuse}G</span>
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
                {/* {iconGroup} */}
                <div className={styles.salesTypeRadio}>
                  <Radio.Group value={salesType } onChange={handleChangeSalesType}>
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
                      数据源
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
    </GridContent>
    )
}