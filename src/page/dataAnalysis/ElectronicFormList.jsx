import React,{useState,useEffect,useRef} from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'antd/lib/pagination';
import { BarChartOutlined, LineChartOutlined, PieChartOutlined, ProfileOutlined ,SearchOutlined ,PlusOutlined,CloseOutlined, CheckOutlined,DownOutlined,EditOutlined,DisconnectOutlined,AreaChartOutlined  } from '@ant-design/icons';
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
    Checkbox,
    Card,
    Drawer,
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
    Popconfirm,
    message,
    Popover,
    List,
    Menu,
    Switch,
    notification,
    Dropdown,
    Tag,
    Statistic,
    Empty 
} from 'antd';
// import 
import HttpService from '../../util/HttpService.jsx';
import ElectronicForm from './ElectronicForm.jsx'
import AddMouldForm from './addMouldForm.jsx'
import style from './ElectronicFormList.less'
const Lstyle={
    marginRight:"6px"
}
const FormList=[
    {
        title:"模板1",
        name:"计划表"
    }
] 
const columns=[
    {
        title:"表名",
        dataIndex: 'name',
        key: 'name',
    },
    {
        title:"创建人",
        dataIndex: 'founder',
        key: 'founder',
    },
    {
        title:"创建时间",
        dataIndex:"creationTime",
        key:"creationTime"
    },
    {
        title:"更新时间",
        dataIndex:"revisionTime",
        key:"revisionTime"
    },
    {
        title:"操作",
        dataIndex:"x",
        key:"x",
        render:(_,res)=>{
            return (
                <Dropdown overlay={
                    <Menu>
                    <Menu.Item>
                      <a target="_blank" rel="noopener noreferrer">
                        编辑
                      </a>
                    </Menu.Item>
                    <Menu.Item>
                      <a target="_blank" rel="noopener noreferrer">
                        删除
                      </a>
                    </Menu.Item>
                  </Menu>
                }>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    操作 <DownOutlined />
                </a>
              </Dropdown>
            )
        }
    }
]
const data=[
    {
        id:1,
        name:"财务报表",
        founder:"zhangsan",
        creationTime:"2021/01/21",
        revisionTime:"2021/01/22"
    },
    {
        id:1,
        name:"财务报表2",
        founder:"zhangsan",
        creationTime:"2021/01/21",
        revisionTime:"2021/01/22"
    },
    {
        id:1,
        name:"财务报表3",
        founder:"zhangsan",
        creationTime:"2021/01/21",
        revisionTime:"2021/01/22"
    },
    {
        id:1,
        name:"财务报表4",
        founder:"zhangsan",
        creationTime:"2021/01/21",
        revisionTime:"2021/01/22"
    },
]
export default (props)=>{
    const FormListbox=useRef()
    const [visible, setVisible] = useState(false)//数据查询显示影藏
    const [visible2, setVisible2] = useState(false)//新建编辑表格显示影藏
    const showDrawer = () => {
        setVisible(true);
      };
    
      const onClose = (types) => {
        setVisible(types);
      };
    useEffect(()=>{
        document.documentElement.style.overflow = 'hidden'
        const h=document.getElementsByClassName('navbar-side')[0]
        FormListbox.current.style.height=h.offsetHeight+'px'
        FormListbox.current.style.overflowY="scroll"

    },[FormListbox])
    return (
        <div ref={FormListbox}>
    <Card title="电子表格" className={style.ElectronicFormList} headStyle={{fontWeight:"600",fontSize:"18px"}}
    
    extra={<a onClick={()=>showDrawer()}>表格数据查询</a>}
    >
        <Divider plain orientation="left" style={{fontWeight:700,marginTop:"-10px"}}>表格模板</Divider>
        <Row className={style.ElectronicFormListMole}>
            <Card className={style.ElectronicFormListMole_List} onClick={()=>{setVisible2(true)}}>
                <div className={style.ElectronicFormListMole_List_title}>
                    <PlusOutlined className={style.ElectronicFormListMole_List_title_ICON}/>
                </div>
                <div className={style.ElectronicFormListMole_List_text}>新建模板</div>
            </Card>
            {
                FormList.map((item,index)=>{
                    return (
                    <Card className={style.ElectronicFormListMole_List}>
                        <div className={style.ElectronicFormListMole_List_title}>
                            <AreaChartOutlined className={style.ElectronicFormListMole_List_title_ICON}/>
                        </div>
                        <div className={style.ElectronicFormListMole_List_text}>{item.name}</div>
                    </Card>
                    )
                })
            }
        </Row>
        <Divider plain orientation="left" style={{fontWeight:700}}>全部电子表格</Divider>
        <Card>
        <Table columns={columns} dataSource={data}  title={()=>{
              return (<Row style={{marginBottom:"10px"}}>
                  <Col style={{...Lstyle}}>
                    <Input placeholder="表名" size="middle"/>
                  </Col>
                  <Col>
                    <Button type="primary" icon={<SearchOutlined />} onClick={()=>{}}>
                      搜索
                    </Button>
                  </Col>
              </Row>)
            }}
            pagination={false}
            footer={()=>{
                return (<div style={{display:"flow-root"}}>
                    {/* <Pagination style={{float:'right'}} defaultCurrent={startIndex} total={total} onChange={setpagindex} onShowSizeChange={onShowSizeChange}/> */}
                </div>)
            }}
            
            />
        </Card>

        <Drawer
               placement="right"
               visible={visible}
               destroyOnClose={true}
               closable={false}
               width="100%"
               bodyStyle={
                    {padding:"0px"}
                }
               maskStyle={
                {   
                    padding:"0px",
                    width:"100%",
                    height:"100%"
                }
                
               }
        >
              <ElectronicForm
               onClose={onClose}
               ></ElectronicForm>  
        </Drawer>
        
        <Drawer
               placement="right"
               visible={visible2}
               destroyOnClose={true}
               closable={false}
               width="100%"
               bodyStyle={
                    {padding:"0px"}
                }
               maskStyle={
                {   
                    padding:"0px",
                    width:"100%",
                    height:"100%"
                }
                
               }
        >
              <AddMouldForm setVisible2={setVisible2}></AddMouldForm>  
        </Drawer>
    </Card>   
    </div>      
)
}