// import React from 'react';
// import { Form } from '@ant-design/compatible';
// import '@ant-design/compatible/assets/index.css';
// import {
//   Input,
//   Table,
//   Button,
//   Modal,
//   Card,
//   Row,
//   Col,
//   Select,
//   Pagination,
//   message,
//   Tabs,
//   Divider,
//   Tag,
// } from 'antd';
// import LocalStorge from '../../util/LogcalStorge.jsx';
// import CubeService from '../../service/CubeService.jsx';
// import QueryService from '../../service/QueryService.jsx';
// const _cubeService = new CubeService();
// const localStorge = new LocalStorge();
// const _query = new QueryService();
// const FormItem = Form.Item;
// const Search = Input.Search;


// const { Option } = Select;


// const { TabPane } = Tabs;


// const columns = [
//   {
//     title: '列名',
//     dataIndex: 'name',
//     key: 'name',
//     render: text => <a>{text}</a>,
//   },
//   {
//     title: '说明',
//     dataIndex: 'age',
//     key: 'age',
//   },
//   {
//     title: '数据类型',
//     dataIndex: 'address',
//     key: 'address',
//   },
//   {
//     title: '索引',
//     key: 'tags',
//     dataIndex: 'tags',
//     render: tags => (
//       <span>
//         {tags.map(tag => {
//           let color = tag.length > 5 ? 'geekblue' : 'green';
//           if (tag === 'loser') {
//             color = 'volcano';
//           }
//           return (
//             <Tag color={color} key={tag}>
//               {tag.toUpperCase()}
//             </Tag>
//           );
//         })}
//       </span>
//     ),
//   },
//   {
//     title: '操作',
//     key: 'action',
//     render: (text, record) => (
//       <span>
//         <a>Invite {record.name}</a>
//         <Divider type="vertical" />
//         <a>Delete</a>
//       </span>
//     ),
//   },
// ];

// const data = [
//   {
//     key: '1',
//     name: '人员姓名',
//     age: 32,
//     address: 'string',
//     tags: ['nice', 'developer'],
//   },
//   {
//     key: '2',
//     name: '性别',
//     age: 42,
//     address: 'string',
//     tags: ['loser'],
//   },
//   {
//     key: '3',
//     name: '年龄',
//     age: 32,
//     address: 'int',
//     tags: ['cool', 'teacher'],
//   },
// ];

// class dataAssetInfo extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       confirmDirty: false,
//       cube_id: this.props.match.params.cube_id,
//       qry_id: '',
//       cube_name: '',
//       cube_desc: '',
//       visible: false,
//       dictionaryList: [],
//       qry_name: '',
//       cube_sql: '',
//     };
//     this.handleSubmit = this.handleSubmit.bind(this);

//   }

//   //初始化加载调用方法
//   componentDidMount() {
//     if (null != this.state.cube_id && '' != this.state.cube_id && 'null' != this.state.cube_id) {
//       _cubeService.getCubeInfo(this.state.cube_id).then(response => {
//         this.setState(response.data);
//         this.props.form.setFieldsValue({
//           cube_name: response.data.cube_name,
//           cube_desc: response.data.cube_desc,
//           qry_id: response.data.qry_id,
//           class_name: response.data.class_name,
//           cube_sql: response.data.cube_sql,
//         });
//       }, errMsg => {
//         this.setState({
//         });
//         localStorge.errorTips(errMsg);
//       });
//     }

//   }


//   //编辑字段对应值
//   onValueChange(e) {
//     let name = e.target.name,
//       value = e.target.value.trim();
//     this.setState({ [name]: value });
//     this.props.form.setFieldsValue({ [name]: value });

//   }
//   //编辑字段对应值
//   onSelectChange(name, value) {
//     this.setState({ [name]: value });
//     this.props.form.setFieldsValue({ [name]: value });
//   }
//   //提交
//   handleSubmit(e) {
//     e.preventDefault();
//     this.props.form.validateFieldsAndScroll((err, values) => {
//       if (!err) {
//         if (null != this.state.cube_id && '' != this.state.cube_id && 'null' != this.state.cube_id) {
//           values.cube_id = this.state.cube_id;
//         } else {
//           values.cube_id = 'null';
//         }
//         _cubeService.saveCubeInfo(values).then(response => {
//           if (null != this.state.cube_id && '' != this.state.cube_id && 'null' != this.state.cube_id) {
//             alert("修改成功");
//           } else {
//             alert("保存成功");
//           }
//           window.location.href = "#cube/cubeList";
//         }, errMsg => {
//           this.setState({
//           });
//           localStorge.errorTips(errMsg);
//         });
//       }
//     });
//   }

//   openModelClick() {
//     this.setState({ visible: true, totald: 0, selectedRowKeys: [] }, function () {
//       this.loadModelData();
//     });
//   }
//   //调用模式窗口内的数据查询
//   loadModelData() {
//     let page = {};
//     page.pageNumd = this.state.pageNumd;
//     page.perPaged = this.state.perPaged;
//     page.qry_name = this.state.qry_name;
//     _query.getAllQueryNameList(page).then(response => {
//       this.setState({ dictionaryList: response.data.list, totald: response.data.total }, function () { });
//     }).catch(error => {
//       message.error(error);
//     });
//   }
//   // 字典页数发生变化的时候
//   onPageNumdChange(pageNumd) {
//     this.setState({
//       pageNumd: pageNumd
//     }, () => {
//       this.loadModelData(this.state.paramValue);
//     });
//   }
//   //模式窗口点击确认
//   handleOk = (e) => {
//     let values = '';
//     if (this.state.selectedRowKeys.length > 0) {
//       const arr1 = this.state.selectedRowKeys[0];
//       const dataArr = arr1.split("&");
//       values = dataArr[0];
//       let qryname = dataArr[1];
//       this.props.form.setFieldsValue({ ['qry_id']: values, ['class_name']: qryname });
//       // this.props.form.setFieldsValue({['qry_name']:qryname});
//     }
//     this.setState({ visible: false, pageNumd: 1, qry_id: values });
//   }
//   //模式窗口点击取消
//   handleCancel = (e) => {
//     this.setState({
//       visible: false,
//       selectedRowKeys: []
//     });
//   }
//   //数据字典选中事件
//   onSelectChangeDic = (selectedRowKeys) => {
//     this.setState({ selectedRowKeys });
//   }
//   //数据字典的search
//   onDictionarySearch(qry_name) {
//     this.setState({ pageNumd: 1, qry_name: qry_name }, () => {
//       this.loadModelData();
//     });
//   }
//   render() {
//     const { getFieldDecorator } = this.props.form;
//     const formItemLayout = {
//       labelCol: {
//         xs: { span: 24 },
//         sm: { span: 8 },
//       },
//       wrapperCol: {
//         xs: { span: 24 },
//         sm: { span: 16 },
//       },
//     };
//     const tailFormItemLayout = {
//       wrapperCol: {
//         xs: {
//           span: 24,
//           offset: 0,
//         },
//         sm: {
//           span: 16,
//           offset: 8,
//         },
//       },
//     };
//     const { selectedRowKeys } = this.state;
//     const rowSelectionDictionary = {
//       selectedRowKeys,
//       onChange: this.onSelectChangeDic,
//       hideDefaultSelections: true,
//       type: 'radio'
//     };
//     const dictionaryColumns = [{
//       title: '编码',
//       dataIndex: 'qry_id',
//       key: 'qry_id',
//     }, {
//       title: '名称',
//       dataIndex: 'qry_name',
//       key: 'qry_name',
//     }];
//     if (null != this.state.dictionaryList) {
//       this.state.dictionaryList.map((item, index) => {
//         item.key = item.qry_id + "&" + item.qry_name;
//       });
//     }
//     return (
//       <div id="page-wrapper">
//         <Card title='数据资产'>
//           <Form onSubmit={this.handleSubmit}>
//             <Row>
//               <Col xs={24} sm={12}>
//                 <FormItem {...formItemLayout} label="资产名称">
//                   {getFieldDecorator('cube_name', {
//                     rules: [{ required: true, message: '请输入名称!' }],
//                   })(
//                     <Input type='text' name='cube_name' onChange={(e) => this.onValueChange(e)} />
//                   )}
//                 </FormItem>
//               </Col>
//               <Col xs={24} sm={12}>
//                 <FormItem {...formItemLayout} label="资产描述">
//                   {getFieldDecorator('cube_desc', {
//                     rules: [{ required: true, message: '请输入描述!' }],
//                   })(
//                     <Input type='text' name='cube_desc' onChange={(e) => this.onValueChange(e)} />
//                   )}
//                 </FormItem>
//               </Col>
//             </Row>
//             <Row>
//               <Col xs={24} sm={12}>
//                 <FormItem {...formItemLayout} label="资产类型">
//                   {getFieldDecorator('cube_name', {
//                     rules: [{ required: true, message: '请输入名称!' }],
//                   })(
//                     <Select
//                     showSearch
//                     style={{ width: 200 }}
//                     placeholder="Select a person"
//                     optionFilterProp="children"
//                          defaultValue="jack" 
//                 >
//                     <Option value="jack">目录视图</Option>
//                     <Option value="lucy">主机视图</Option>
//                     <Option value="tom">存储类型视图</Option>
//                 </Select>
//                   )}
//                 </FormItem>
//               </Col>
//               <Col xs={24} sm={12}>
//                 <FormItem {...formItemLayout} label="资产位置">
//                   {getFieldDecorator('cube_desc', {
//                     rules: [{ required: true, message: '请输入描述!' }],
//                   })(
//                     <Select
//                     showSearch
//                     style={{ width: 200 }}
//                     placeholder="Select a person"
//                     optionFilterProp="children"
//                          defaultValue="jack" 
//                 >
//                     <Option value="jack">目录视图</Option>
//                     <Option value="lucy">主机视图</Option>
//                     <Option value="tom">存储类型视图</Option>
//                 </Select>
//                   )}
//                 </FormItem>
//               </Col>
//             </Row>
//             <Row>
//               <Tabs defaultActiveKey="1" >
//                   <TabPane tab="元数据" key="1">
//                     <Table columns={columns} dataSource={data} />
//                   </TabPane>
//                   <TabPane tab="数据血缘" key="2">
//                     Content of Tab Pane 2
//                   </TabPane>
//                   <TabPane tab="数据权限" key="3">
//                     Content of Tab Pane 3
//                   </TabPane>
//                   <TabPane tab="数据浏览" key="4">
//                     Content of Tab Pane 3
//                   </TabPane>
//               </Tabs>,
//           </Row>
//             <FormItem {...tailFormItemLayout}>
//               <Button type="primary" htmlType="submit">保存</Button>
//               <Button href="#/cube/cubeList" type="primary" style={{ marginLeft: '30px' }}>返回</Button>
//             </FormItem>
//           </Form>
//         </Card>
//         <div>
//           <Modal title="字典查询" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
//             <Search
//               style={{ width: 300, marginBottom: '10px' }}
//               placeholder="请输入..." enterButton="查询"
//               onSearch={value => this.onDictionarySearch(value)}
//             />
//             <Table ref="diction" rowSelection={rowSelectionDictionary} columns={dictionaryColumns}
//               dataSource={this.state.dictionaryList} size="small" bordered pagination={false} />
//             <Pagination current={this.state.pageNumd}
//               total={this.state.totald} showTotal={total => `共 ${this.state.totald} 条`}
//               onChange={(pageNumd) => this.onPageNumdChange(pageNumd)} />
//           </Modal>
//         </div>
//       </div>
//     );
//   }
// }
// export default Form.create()(dataAssetInfo);




import React,{useState,useEffect,useRef} from 'react';
import { Form, Input, Table, Button, Modal, Card, Row, Col, Select, Pagination, message, Tabs, Divider, Tag } from 'antd';
import LocalStorge from '../../util/LogcalStorge.jsx';
import CubeService from '../../service/CubeService.jsx';
import QueryService from '../../service/QueryService.jsx';
import HttpService from '../../util/HttpService.jsx';
import DataModeling from './index.jsx'
import { fromPairs } from 'lodash';
import G6 from '@antv/g6';
import echarts from 'echarts';
// // 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend'
import 'echarts/lib/chart/pie';
import XY from './Primordial.jsx'
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
let datalist=['元数据','数据血缘','数据权限','数据浏览','元数据1','数据建模','数据血缘1版','地图']

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
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: '说明',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '数据类型',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '索引',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <span>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
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
      <a onClick={()=>function(){}}>
       修改描述
      </a>
    ),
  },
];

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
  console.log(data)
  return(
    <Table columns={cm} dataSource={data}/>
  )
}


function  MYXY(props){
  return(
    < XY/>
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

//组件
export default ()=>{
  let [cube_name,setcube_name]=useState('');
  let [cube_desc,setcube_desc]=useState('');
  let [cube_class,setcube_class]=useState('');//资源类型
  let [Asset_location,setAsset_location]=useState('')//资产位置
  let [cube_classlist,setcube_classlist]=useState([...classlist]);
  let [objtext,settext]=useState('元数据');
  let [listdata,setlistdata]=useState(0);
  let path=location.hash.substring(location.hash.lastIndexOf('/')+1);
  let dataobj={
    '元数据':<List data={data} columns={columns}></List>,
    '数据血缘':<BloodKinship></BloodKinship>,
    '数据权限':<div>数据权限</div>,
    '数据浏览':<div>数据浏览</div>,
    '元数据1':<List1 data={data} cm={cm}></List1>,
    '数据建模':<DataModeling></DataModeling>,
    '数据血缘1版':<MYXY />,
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
    console.log(1)
  }
  useEffect(()=>{
    let mylist= async()=>{
      let obj={
        table_id:path
      }
      console.log(path)
       await HttpService.post('/reportServer/DBConnection2/getAllTableList', JSON.stringify(obj)).then(res=>{
         console.log(res)
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
                label="产品名称"
                name="basic"
                initialValues={{ remember: true }}
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
              <Input value={cube_name} onChange={(e)=>{setcube_name(e.target.value)}}/>
          </Form.Item>
          <Form.Item
                {...layout}
                label="资产描述"
                name="basic"
                initialValues={{ remember: true }}
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
              <Input value={cube_desc} onChange={(e)=>{setcube_desc(e.target.value)}}/>
          </Form.Item>
        </Form>
        <Form
           style={{...maringLeft}}
           name="horizontal_login" layout="inline"
        >
          <Form.Item
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
          </Form.Item>
          <Form.Item
                style={{marginLeft:'2px',marginTop:'10px'}}
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
    </div>
  )
}
