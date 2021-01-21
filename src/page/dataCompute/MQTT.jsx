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
import MI from './mecharts.jsx'
import { render } from 'less';
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
    const [data,setdata]=useState([])
    const [topic,settopic]=useState("")//主题名称
    const [clientinid,setclientinid]=useState("")//任务名称
    const [startIndex,setStartIndex]=useState(1);//当前第几页
    const [perPage,setPerPage]=useState(10);//一页显示第几条
    const [total,setTotal]=useState(0);
    const [datal,setDatal]=useState(null)
    const TitleSelect=(e)=>{
      if(e.length===0){
        settitleSelect("所属项目")
        return
      }
      settitleSelect(e)
    }
    useEffect(()=>{
      (async()=>{
          await getList(1,10,"","")
      })()
    },[])
    const getList=(startIndex,perPage,topic,clientinid)=>{//获取列表数据
      HttpService.post('/reportServer/mqttTask/getMqttTaskList', JSON.stringify({startIndex,perPage,topic,clientinid})).then(res => {
        console.log(res)
        if(res.resultCode==="1000"){
          setdata(res.data.list)
          setTotal(res.data.total)
        }
    
    }, errMsg => {
        // this.setState({
        //     list: [], loading: false
        // });
    });
    }
    const columns = [
      {
        title: '目标服务器',
        dataIndex: 'host',
        key: 'host',
        render: text => <a>{text}</a>,
      },
      {
        title: '主题',
        dataIndex: 'topic',
        key: 'topic',
        render:text=>{
          return text.length>10? 
            <Popover
            content={<p>{text}</p>}
            >{text.substring(0,11)}...</Popover>
          :<div>{text}</div>
        }
      },
      {
        title: '任务名称',
        dataIndex: 'clientinid',
        key: 'clientinid',
      },
      {
        title: '是否超时',
        dataIndex: 'timeout',
        key: 'timeout',
      },
      {
        title: '间隔时间',
        dataIndex: 'keepalibe',
        key: 'keepalibe',
      },
      {
        title: '状态',
        dataIndex: 'state',
        key: 'state',
        render:(tags,text)=>{
          let state=tags==="0"?false:true
          return <Switch checkedChildren="开启" unCheckedChildren="停止" defaultChecked={state} onChange={e=>{
            HttpService.post('/reportServer/mqttTask/updateState', JSON.stringify({id:text.id,state:e===false?"0":"1"})).then(res => {
              getList(1,10,"","")
          }, errMsg => {
              // this.setState({
              //     list: [], loading: false
              // });
          });
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
        title: '数据监控',
        key: '1',
        dataIndex: '1',
        render: res => (
            <Button onClick={()=>setvisible2(true)}>查看</Button>
        ),
      },
      {
        title: '操作',
        key: 'x',
        render: (text, ress) => (
          <Dropdown
          trigger="click"
          overlay={()=>{
            return(
              <Menu>
              <Menu.Item>
                <a target="_blank" onClick={()=>
                  {
                    setDatal(ress)
                    setvisible(true)
                    setText("编辑任务")
                  }
                  }>
                  编辑
                </a>
              </Menu.Item>
              <Menu.Item>
                <a onClick={()=>
                  {
                    console.log(ress.id)
                    remoeList(ress.id)
                  }
                  }>
                  删除
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
    const search=()=>{//搜索
      getList(1,10,topic,clientinid)
    }
    const setpagindex=(page, pageSize)=>{
      console.log(page,pageSize)
      setStartIndex(page)
      setPerPage(pageSize)
  }
  const onShowSizeChange =(current, pageSize)=>{
      setStartIndex(1)
      setPerPage(pageSize)
  }
  const remoeList=(id)=>{
    getList(1,10,"","")
    HttpService.post('/reportServer/mqttTask/deleteMqttTaskById', JSON.stringify({id:id})).then(res => {
      if(res.resultCode==="1000"){
      
        // setdata(res.data.list)
        // setTotal(res.data.total)
      }
  
  }, errMsg => {
      // this.setState({
      //     list: [], loading: false
      // });
  });
  }
    return (
        <Card title="MQTT任务管理">
            <Table columns={columns} dataSource={data}  title={()=>{
              return (<Row style={{marginBottom:"10px"}}>
                  <Col style={{...Lstyle}}>
                    <Input placeholder="任务名称" size="middle" value={clientinid} onChange={e=>setclientinid(e.target.value)}/>
                  </Col>
                  <Col style={{...Lstyle}}>
                    <Input placeholder="主题" size="middle" value={topic} onChange={e=>settopic(e.target.value)}/>
                  </Col>
                  <Col>
                    <Button type="primary" icon={<SearchOutlined />} onClick={()=>search()}>
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
            }}
            pagination={false}
            footer={()=>{
                return (<div style={{display:"flow-root"}}>
                    <Pagination style={{float:'right'}} defaultCurrent={startIndex} total={total} onChange={setpagindex} onShowSizeChange={onShowSizeChange}/>
                </div>)
            }}
            
            />
            
            <Mymodal visible={visible} handleOk={setvisible} handleCancel={setvisible} text={text} getList={getList} datal={datal} setDatal={setDatal}/>
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