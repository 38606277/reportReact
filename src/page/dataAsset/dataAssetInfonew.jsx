import React,{useState,useEffect,useRef} from 'react';
import { Form, Input, Table, Button, Modal, Card, Row, Col, Select, Pagination, message, Tabs, Divider, Tag } from 'antd';
import LocalStorge from '../../util/LogcalStorge.jsx';
import CubeService from '../../service/CubeService.jsx';
import QueryService from '../../service/QueryService.jsx';
import HttpService from '../../util/HttpService.jsx';
import { fromPairs } from 'lodash';
import echarts from 'echarts';
// // 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend'
import 'echarts/lib/chart/pie';
import Map from './Map.jsx'
const { TabPane } = Tabs;
const _cubeService = new CubeService();
const localStorge = new LocalStorge();
const _query = new QueryService();
const FormItem = Form.Item;
const Search = Input.Search;
const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 15 },
};
const classlist=[
  {
    value:'全部',
    text:'全部'
  }
  ,
  {
    value:'目录视图',
    text:'目录视图'
  },
  {
    value:'主机视图',
    text:'主机视图'
  },
  {
    value:'存储类型视图',
    text:'存储类型视图'
  }
]
let datalist=['元数据','数据血缘','数据权限','数据浏览','元数据1','地图']

let maringLeft={
  marginLeft:'100px'
}
const data = [
  {
    key: '1',
    name: '人员姓名',
    age: 32,
    address: 'string',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: '性别',
    age: 42,
    address: 'string',
    tags: ['loser'],
  },
  {
    key: '3',
    name: '年龄',
    age: 32,
    address: 'int',
    tags: ['cool', 'teacher'],
  },
];
const columns = [
  {
    title: '列名',
    dataIndex: 'column_name',
    key: 'column_name',
    render: text => <a>{text}</a>,
  },
  {
    title: '说明',
    dataIndex: 'column_title',
    key: 'column_title',
  },
  {
    title: '数据类型',
    dataIndex: 'column_type',
    key: 'column_type',
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <a>Invite {record.name}</a>
        <Divider type="vertical" />
        <a>Delete</a>
      </span>
    ),
  },
];
function setdescribe(record,listInput,isModalVisible, setIsModalVisible){
  
  console.log(record)
}


//组件
//元数据
function List (props){
  let {data,columns}=props
  return(
    <Table columns={columns} dataSource={data} />
  ) 
}
//元数据1
function List1(props){
  let {cm,data}=props
  return(
    <Table columns={cm} dataSource={data}/>
  )
}
//数据血缘
function BloodKinship(props){
  let [main , setMain] = useState('')
  let ms=useRef()
  var data = {
    "name": "flare",
    "children": [
        {
            "name": "data",
            "children": [
                {
                    "name": "converters",
                    "children": [
                        {"name": "Converters", "value": 721},
                        {"name": "DelimitedTextConverter", "value": 4294}
                    ]
                },
                {
                    "name": "DataUtil",
                    "value": 3322
                }
            ]
        },
        {
            "name": "display",
            "children": [
                {"name": "DirtySprite", "value": 8833},
                {"name": "LineSprite", "value": 1732},
                {"name": "RectSprite", "value": 3623}
            ]
        },
        {
            "name": "flex",
            "children": [
                {"name": "FlareVis", "value": 4116}
            ]
        },
        {
            "name": "query",
            "children": [
                {"name": "AggregateExpression", "value": 1616},
                {"name": "And", "value": 1027},
                {"name": "Arithmetic", "value": 3891},
                {"name": "Average", "value": 891},
                {"name": "BinaryExpression", "value": 2893},
                {"name": "Comparison", "value": 5103},
                {"name": "CompositeExpression", "value": 3677},
                {"name": "Count", "value": 781},
                {"name": "DateUtil", "value": 4141},
                {"name": "Distinct", "value": 933},
                {"name": "Expression", "value": 5130},
                {"name": "ExpressionIterator", "value": 3617},
                {"name": "Fn", "value": 3240},
                {"name": "If", "value": 2732},
                {"name": "IsA", "value": 2039},
                {"name": "Literal", "value": 1214},
                {"name": "Match", "value": 3748},
                {"name": "Maximum", "value": 843},
                {
                    "name": "methods",
                    "children": [
                        {"name": "add", "value": 593},
                        {"name": "and", "value": 330},
                        {"name": "average", "value": 287},
                        {"name": "count", "value": 277},
                        {"name": "distinct", "value": 292},
                        {"name": "div", "value": 595},
                        {"name": "eq", "value": 594},
                        {"name": "fn", "value": 460},
                        {"name": "gt", "value": 603},
                        {"name": "gte", "value": 625},
                        {"name": "iff", "value": 748},
                        {"name": "isa", "value": 461},
                        {"name": "lt", "value": 597},
                        {"name": "lte", "value": 619},
                        {"name": "max", "value": 283},
                        {"name": "min", "value": 283},
                        {"name": "mod", "value": 591},
                        {"name": "mul", "value": 603},
                        {"name": "neq", "value": 599},
                        {"name": "not", "value": 386},
                        {"name": "or", "value": 323},
                        {"name": "orderby", "value": 307},
                        {"name": "range", "value": 772},
                        {"name": "select", "value": 296},
                        {"name": "stddev", "value": 363},
                        {"name": "sub", "value": 600},
                        {"name": "sum", "value": 280},
                        {"name": "update", "value": 307},
                        {"name": "variance", "value": 335},
                        {"name": "where", "value": 299},
                        {"name": "xor", "value": 354},
                        {"name": "x_x", "value": 264}
                    ]
                },
                {"name": "Minimum", "value": 843},
                {"name": "Not", "value": 1554},
                {"name": "Or", "value": 970},
                {"name": "Query", "value": 13896},
                {"name": "Range", "value": 1594},
                {"name": "StringUtil", "value": 4130},
                {"name": "Sum", "value": 791},
                {"name": "Variable", "value": 1124},
                {"name": "Variance", "value": 1876},
                {"name": "Xor", "value": 1101}
            ]
        },
        {
            "name": "scale",
            "children": [
                {"name": "IScaleMap", "value": 2105},
                {"name": "LinearScale", "value": 1316},
                {"name": "LogScale", "value": 3151},
                {"name": "OrdinalScale", "value": 3770},
                {"name": "QuantileScale", "value": 2435},
                {"name": "QuantitativeScale", "value": 4839},
                {"name": "RootScale", "value": 1756},
                {"name": "Scale", "value": 4268},
                {"name": "ScaleType", "value": 1821},
                {"name": "TimeScale", "value": 5833}
            ]
        }
    ]
};

var option = {
    tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove'
    },
    series:[
        {
            type: 'tree',
            id: 0,
            name: 'tree1',
            data: [data],

            top: '10%',
            left: '8%',
            bottom: '22%',
            right: '20%',

            symbolSize: 7,

            edgeShape: 'polyline',
            edgeForkPosition: '63%',
            initialTreeDepth: 3,

            lineStyle: {
                width: 2
            },

            label: {
                backgroundColor: '#fff',
                position: 'left',
                verticalAlign: 'middle',
                align: 'right'
            },

            leaves: {
                label: {
                    position: 'right',
                    verticalAlign: 'middle',
                    align: 'left'
                }
            },

            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
        }
    ]
};
  useEffect(()=>{
      setMain(ms.current)
      if(main !== ""){
        var myChart = echarts.init(main);
        myChart.resize({ height: '1000px' })
        myChart.setOption(option);
    }
  } , [main])

  return (
        <div id="main" ref={ms}></div>

  )
}

//修改
function setdescribes(listInput,setIsModalVisible){
  if(listInput===''){
    return  message.error('修改内容不可为空，或者取消修改');
  }
  console.log(listInput)
  setIsModalVisible(false)
}
//组件
export default (props)=>{
  const {match}=props;
  let [listInput,setListinput] = useState('')//获取对话框input内容
  let [isModalVisible, setIsModalVisible] = useState(false);
  let cm=[
    {
      title: '列名',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: '数据类型',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '描述',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <a onClick={()=>setIsModalVisible(true)}>
         修改描述
        </a>
      ),
    },
  ];
  let [cube_name,setcube_name]=useState('');
  let [cube_desc,setcube_desc]=useState('');
  let [cube_class,setcube_class]=useState('');//资源类型
  let [Asset_location,setAsset_location]=useState('')//资产位置
  let [cube_classlist,setcube_classlist]=useState([...classlist]);
  let [objtext,settext]=useState('元数据');
  let [listdata,setlistdata]=useState(0);
  const [coldata,setColdata]=useState([]);
  const [tabdata,setTabdata]=useState({});
  let path=location.hash.substring(location.hash.lastIndexOf('/')+1);
  let dataobj={
    '元数据':<List data={coldata} columns={columns}></List>,
    '数据血缘':<BloodKinship></BloodKinship>,
    '数据权限':<div>数据权限</div>,
    '数据浏览':<div>数据浏览</div>,
    '元数据1':<List1 data={data} cm={cm}></List1>,
    '地图':<Map />
  };
  function callback(key){
    settext(datalist[key]) 
    setlistdata(key)
  };
  function Hsearch(){
    console.log({
      "产品名称":cube_name,
      "产品描述":cube_desc,
      "产品类型":cube_class,
      "资产位置":Asset_location
    })
  }
  useEffect(()=>{
    let mylist= async()=>{
       let param={
        host_id:props.match.params.host_id,
        dbType:props.match.params.dbType,
        table_name:props.match.params.table_name
      }

       await HttpService.post('/reportServer/dbTableColumn/getTableCloumnList', JSON.stringify(param))
       .then(res=>{
          console.log(res)
          setColdata(res.data.columnList);
          setTabdata(res.data.maintable);
       })
    }
    mylist()
  },[])  
  return  (
    <div>
      <Card title='数据资产'>
        <Form
          style={{...maringLeft}}
          name="horizontal_login" layout="inline">
          <Form.Item
                {...layout}
                label="表名称"
                name="table_name"
                initialValues={{ remember: true }}
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
              <Input value={tabdata.table_name} disabled/>
          </Form.Item>
          <Form.Item
                {...layout}
                label="描述"
                name="table_title"
                initialValues={{ remember: true }}
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
              <Input value={tabdata.table_title} onChange={(e)=>{setcube_desc(e.target.value)}}/>
          </Form.Item>
        </Form>
        <Form
           style={{...maringLeft}}
           name="horizontal_login" layout="inline"
        >
          {/* <Form.Item
                style={{marginTop:'10px'}}
                {...layout}
                label="资源类型"
                name="basic"
                initialValues={{ remember: true }}
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
               <Select defaultValue="请选择" style={{ width: 164,marginLeft:5 }} onChange={setcube_class}>
                {
                  cube_classlist.map((item,index)=>{
                    return <Option value={item.value} key={index}>{item.text}</Option>
                  })
                }
                </Select>
          </Form.Item> */}
          <Form.Item
                style={{marginLeft:'12px',marginTop:'10px'}}
                {...layout}
                label="资产位置"
                name="basic"
                initialValues={{ remember: true }}
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
               <Select defaultValue="请选择" style={{ width: 164,marginLeft:5 }} onChange={setAsset_location}>
                {
                  cube_classlist.map((item,index)=>{
                    return <Option value={item.value} key={index}>{item.text}</Option>
                  })
                }
                </Select>
          </Form.Item>
          {/* 搜索按钮 */}
          <Button type="primary" style={{float:'right',marginRight:'100px',marginTop:'10px'}} onClick={()=>Hsearch()}>确认修改</Button>
        </Form>
        <Tabs defaultActiveKey={listdata+""} onChange={callback}>
          {
            datalist.map((item,index)=>{
             return <TabPane tab={item} key={index}>
               {
                 dataobj[objtext]
               }
             </TabPane>
            })
          }
        </Tabs>
      </Card>
      <Modal title="修改描述" 
             visible={isModalVisible} 
             onOk={()=>{setdescribes(listInput,setIsModalVisible)}} 
             onCancel={()=>{setIsModalVisible(!isModalVisible)}}
             cancelText='取消'
             okText='确认'
             >
          <Input placeholder="请修改描述" value={listInput} onChange={e=>{setListinput(e.target.value)}}/>
      </Modal>
    </div>
  )
}
