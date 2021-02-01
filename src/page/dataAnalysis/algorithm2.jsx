import React,{useState,useEffect,useRef} from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'antd/lib/pagination';
import { BarChartOutlined, LineChartOutlined, PieChartOutlined, ProfileOutlined ,SearchOutlined ,PlusOutlined,CloseOutlined, CheckOutlined,DownOutlined,EditOutlined,DisconnectOutlined  } from '@ant-design/icons';
// import { Form } from '@ant-design/compatible';

// import CodeMirror from 'react-codemirror';
// import 'codemirror/lib/codemirror.css';
// import 'codemirror/mode/sql/sql';
// import 'codemirror/theme/ambiance.css';
// import 'codemirror/addon/hint/show-hint.css';  
// import 'codemirror/addon/hint/show-hint.js';  
// import 'codemirror/addon/hint/sql-hint.js';  
// import 'codemirror/theme/ambiance.css'; 
// import '@ant-design/compatible/assets/index.css';
import {
    Table,
    Form,
    Divider,
    Button,
    Checkbox,
    Card,
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
    Empty,
    Steps 
} from 'antd';
import Addhm from './addAlgorithm.jsx'
import HttpService from '../../util/HttpService.jsx';
import style from './algorithm.less'
import TagSelect from '../../components/TagSelect';

export default (props)=>{
    const [startIndex,setStartIndex]=useState(1);//当前第几页
    const [perPage,setPerPage]=useState(10);//一页显示第几条
    const [total,setTotal]=useState(1);//一共多少条数据
    const [isModalVisible,setisModalVisible]=useState(false)//新建表单控制
    const [listClass,setListClass]=useState([])//算法分类
    const [list,setList]=useState([])//所有算法
    const [n,setN]=useState(-1)
    const [Class_id,setClass_id]=useState("")//类别id
    const [algorithm_name,setalgorithm_name]=useState("")//算法名称搜集
    useEffect(()=>{
        HttpService.post("reportServer/mdmDict/getDictValueByDictCode", JSON.stringify({dict_code:"algorithm_type"}))
         .then(res => {
             if (res.resultCode == '1000') {
                setListClass(res.data)
             }
             else
                 message.error(res.message);
         });
        getList(1,10,"","")
    },[])

    const setpagindex=(page, pageSize)=>{
        getList(page,pageSize,"",Class_id)
        setStartIndex(page)
        setPerPage(pageSize)
    }
    const onShowSizeChange =(current, pageSize)=>{
        setStartIndex(1)
        setPerPage(pageSize)
    }
    const addAlgorithm=()=>{//新建模板
        setisModalVisible(true)
    }
    const handleOk=(e)=>{//ok点击
        console.log(e)
        setisModalVisible(false)
    }
    const handleCancel=()=>{//取消
        setisModalVisible(false)
    }

    const getList=(startIndex,perPage,algorithm_name,algorithm_class_id)=>{
        HttpService.post('/reportServer/algorithm/getAlgorithmList',JSON.stringify({startIndex,perPage,algorithm_name,algorithm_class_id})).then(res=>{
            if(res.resultCode==="1000"){
                setList(res.data.list)
                setTotal(res.data.total)
            }
        })
    }

    const search=()=>{
        getList(startIndex,perPage,algorithm_name,Class_id)
    }
    const train=()=>{
        setisModalVisible(true)
    }
    return (    
        <Card title="算法" style={{height:"100%"}}>
            <Row style={{marginBottom:"15px"}}>
                <Col>
                 <span className={style.addAlgorithmName}>算法分类 :</span>
                </Col>
                <Col>
                 <span onClick={()=>{
                    setN(-1)
                    setClass_id("")
                    setStartIndex(1)
                    getList(1,10,"","")
                }} class={[style.list,n===-1?style.colors:null].join(' ')} >全部</span>
                {
                    listClass.map((item,index)=>{
                        return (
                            <span className={[style.list,n===index?style.colors:null].join(' ')} key={index}
                                onClick={()=>{
                                    getList(1,10,"",item.value_code)
                                    setClass_id(item.value_code)
                                    setN(index)
                                    setStartIndex(1)
                                }}
                            >{item.value_name}</span>
                        )
                    })
                }
                </Col>
            </Row>
            <Card title={  <Form
                        style={{fontSize:"14px"}}
                        layout="inline" 
                        >
                        <Form.Item
                                    label="算法名称"
                                    name="算法名称"
                                >
                                    <Input style={{height:'22px '}} value={algorithm_name} onChange={e=>setalgorithm_name(e.target.value)}/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" size="small" onClick={()=>search()}>搜索</Button>
                        </Form.Item>
                    </Form>}
                    extra={
                        <Button type="primary" >新建算法</Button>
                    }
                >
                <Row style={{margin:"20px 0px"}}>
                <List
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={list}
                    renderItem={item => (
                    <List.Item>
                        <Card title={item.algorithm_name} className={style.lists}>
                        <div className={style.train}
                                onClick={()=>{
                                    train()
                                }}
                            >训练模型</div>
                        </Card>
                    </List.Item>
                    )}
                />
                </Row>
                <Pagination  current={startIndex} total={total} onChange={setpagindex} onShowSizeChange={onShowSizeChange}/>
            </Card>
            <Addhm isModalVisible={isModalVisible} handleOk={e=>handleOk(e)} title={"训练模型"} handleCancel={handleCancel}></Addhm>
         </Card>           
    )
}