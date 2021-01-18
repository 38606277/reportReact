import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'antd/lib/pagination';
import { BarChartOutlined, LineChartOutlined, PieChartOutlined, ProfileOutlined ,SearchOutlined ,PlusOutlined,CloseOutlined, CheckOutlined,DownOutlined,EditOutlined  } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import Mymodal from './editMQTT.jsx'
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
    Dropdown
} from 'antd';
// import 
import HttpService from '../../util/HttpService.jsx';
import MI from './mecharts2.jsx'
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    class:"mysqltomysql",
    Cron:"1",
    route:"随机",
    type:false,
    types:"成功",
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    class:"mysqltomysql",
    Cron:"1",
    route:"随机",
    type:true,
    types:"成功",
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    class:"mysqltomysql",
    Cron:"1",
    route:"随机",
    type:false,
    types:"成功",
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
const options = [{ value: 'gold' }, { value: 'lime' }, { value: 'green' }, { value: 'cyan' }];
const options2 = [{ value: '任务1' }, { value: '任务2' }, { value: '任务3' }, { value: '任务4' }];
const Lstyle={
 marginRight:"6px"
}
export default ()=>{
    //  const {visible,handleOk,handleCancel}=props
    const [titleSelect,settitleSelect]=useState([])
    const [visible,setvisible]=useState(false)
    const [visible2,setvisible2]=useState(false)
    const [text,setText]=useState("新建任务")
    const TitleSelect=(e)=>{
      if(e.length===0){
        settitleSelect("所属项目")
        return
      }
      settitleSelect(e)
    }
    useEffect(()=>{

    },[])
    const columns = [
      {
        title: 'ID',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '项目名称',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
      },
      {
        title: '所属项目',
        dataIndex: 'class',
        key: 'class',
      },
      {
        title: 'Cron',
        dataIndex: 'Cron',
        key: 'Cron',
      },
      {
        title: '路由策略',
        dataIndex: 'route',
        key: 'route',
      },
      {
        title: '状态',
        dataIndex: 'type',
        key: 'type',
        render:(tags,text)=>{
          return <Switch checkedChildren="开启" unCheckedChildren="停止" defaultChecked={tags} onChange={e=>{
            notification.open({
              duration:2,
              message: text.name,
              description:
                e?"已经启动":"已经关闭",
              onClick: () => {
                console.log('Notification Clicked!');
              },
            });
          }}/>
        }
      },
      {
        title: '注册节点',
        dataIndex: 'address',
        key: 'address',
        render: res=>(
          <Popover placement="top" content={res} trigger="click">
            <Button>查看</Button>
          </Popover>
        )
      },
      {
        title: '下次触发',
        key: 'tags',
        dataIndex: 'tags',
        render: res => (
          <Popover placement="top" content={res} trigger="click">
            <Button>查看</Button>
          </Popover>
        ),
      },
      {
        title: '数据监控',
        key: '1',
        dataIndex: '1',
        render: res => (
            <Button onClick={()=>setvisible2(true)}>查看</Button>
        ),
      },
      {
        title: '状态',
        dataIndex: 'types',
        key: 'types',
      },
      {
        title: '操作',
        key: 'x',
        render: (text, res) => (
          <Dropdown
          trigger="click"
          overlay={()=>{
            return(
              <Menu>
              <Menu.Item>
                <a target="_blank" onClick={()=>
                  {
                    setvisible(true)
                    setText("编辑任务")
                  }
                  }>
                  查看详情
                </a>
              </Menu.Item>
            </Menu>
            )
          }}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              操作 <DownOutlined />
            </a>
        </Dropdown>
        ),
      },
    ];
    return (
        <Card title="MQTT任务管理">
            <Table columns={columns} dataSource={data} title={()=>{
              return (<Row style={{marginBottom:"10px"}}>
                  <Col style={{...Lstyle}}>
                    <Input placeholder="任务名称" size="middle"/>
                  </Col>
                  <Col style={{...Lstyle}}>
                    <Select
                      size="middle"
                      mode={titleSelect.length===0?"":"multiple"}
                      placeholder="所属项目"
                      showArrow
                      defaultValue={titleSelect.length===0?null:titleSelect}
                      style={{ width: '200px' }}
                      options={options}
                      onChange={(e)=>{TitleSelect(e)}}
                    />
                  </Col>
                  <Col style={{...Lstyle}}>
                    <Select
                        style={{ width: '200px' }}
                        size="middle"
                        showArrow
                        allowClear
                        placeholder="任务类型"
                        options={options2}
                  />
                  </Col> 
                  <Col>
                    <Button type="primary" icon={<SearchOutlined />}>
                      搜索
                    </Button>
                  </Col>
                  <Col style={{marginLeft:"10px"}}>
                    <Button type="primary" icon={<EditOutlined />} onClick={()=>{
                      setvisible(true)
                      setText("新建任务")
                    }}>
                      新建
                    </Button>
                  </Col>
              </Row>)
            }}/>
            
            <Mymodal visible={visible} handleOk={setvisible} handleCancel={setvisible} text={text}/>
            <Modal 
              width="900px"
              visible={visible2}
              onOk={()=>{setvisible2(false)}} onCancel={()=>{setvisible2(false)}}
            >
              <MI />
            </Modal>
        </Card>
    )
}