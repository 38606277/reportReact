import React,{useState,useEffect,useRef} from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'antd/lib/pagination';
import { SlackOutlined} from '@ant-design/icons';
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
import gehttp from './gehttp.jsx'
export default (props)=>{
    const [startIndex,setStartIndex]=useState(1);//当前第几页
    const [perPage,setPerPage]=useState(10);//一页显示第几条
    const [total,setTotal]=useState(1);//一共多少条数据
    const [isModalVisible,setisModalVisible]=useState(false)//新建表单控制
    const [listClass,setListClass]=useState([])//算法分类
    const [list,setList]=useState([])//所有算法
    const [Liststate,setListstate]=useState([])
    const [algorithm_name,setalgorithm_name]=useState("")//算法名称搜集
    const [algorithm,setalgorithm]=useState(null)//算法名称
    useEffect(()=>{
        HttpService.post("reportServer/mdmDict/getDictValueByDictCode", JSON.stringify({dict_code:"algorithm_type"}))
         .then(res => {
             if (res.resultCode == '1000') {
                const arr=res.data.map(item=>{
                    return item.value_code
                })
                setListClass(res.data)
             }
             else
                 message.error(res.message);
         });
        getList(1,10,"","")
    },[])

    const setpagindex=(page, pageSize)=>{
        let str=""
        Liststate.forEach(item=>{
            str+=item+","
        })
        getList(page,pageSize,"",str.substr(0,str.length-1))
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
        gehttp('/reportServer/aimodel/createAiModel',e).then(res=>{
            if(res.resultCode==="1000"){
                message.success(res.message)
            }else{
                message.warning(res.message)
            }
        })
        setisModalVisible(false)
        setalgorithm(null)
    }
    const handleCancel=()=>{//取消
        setisModalVisible(false)
        setalgorithm(null)
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
        let str=""
        Liststate.forEach(item=>{
            str+=item+","
        })
        getList(startIndex,perPage,algorithm_name,str.substr(0,str.length-1))
    }
    const train=()=>{
        setisModalVisible(true)
    }
    const handleFormSubmit=e=>{
        let str=""
        e.forEach(item=>{
            str+=item+","
        })
        getList(startIndex,perPage,algorithm_name,str.substr(0,str.length-1))
        setListstate(e)
    }
    return (    
        <Card title="算法" style={{height:"100%"}}>
            <Row style={{marginBottom:"15px"}} align="middle">
                <Col style={{marginRight:"10px"}}>
                 <span className={style.addAlgorithmName}>算法分类 :</span>
                </Col>
                <Col>
                <TagSelect value={Liststate} onChange={handleFormSubmit}>
                    {
                        listClass.map((item,index)=>{
                            
                            return (
                                <TagSelect.Option value={item.value_code}>{item.value_name}</TagSelect.Option>
                            )
                        })
                    }
                </TagSelect>
                </Col>
            </Row>
            <Row style={{marginBottom:"15px"}} align="middle">
                <Col style={{marginRight:"10px"}}>
                    <span className={style.addAlgorithmName}>语言 :</span>
                    </Col>
                    <Col>
                    <TagSelect>
                        <TagSelect.Option value="cat1">hive</TagSelect.Option>
                        <TagSelect.Option value="cat2">hbase</TagSelect.Option>
                        <TagSelect.Option value="cat3">Mysql</TagSelect.Option>
                    </TagSelect>
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
                                    <Input style={{height:'26px '}} value={algorithm_name} onChange={e=>setalgorithm_name(e.target.value)}/>
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
                    renderItem={(item,index) => (
                    <List.Item>
                        <Card cover={<img style={{width:"100%",height:"100%"}} src={require('./img/1 ('+(index+1)+').png')} alt=""/>}
                            bodyStyle={{
                                boxSizing:"border-box",
                                padding:"0px 10px"
                            }}
                        >
                        <Row align="middle" style={{borderBottom:"1px solid #ccc",padding:"6px 0",boxSizing:"border-box",fontSize:"12px"}} justify="space-between">
                            <Row align="middle">
                                <SlackOutlined />
                                <span style={{marginLeft:"2px"}}>算法</span>
                            </Row>
                            <Col>
                                <div style={{fontSize:"12px",width:"30px",height:"20px",background:"#5e7ce0",color:"#fff",textAlign:"center"}}>官方</div>
                            </Col>
                        </Row>
                        <Row style={{fontSize: '14px',fontWeight: 600,marginTop:"10px",height:"44px",cursor:'pointer'}}>
                            <Tooltip placement="right" title={item.algorithm_name}>
                                {item.algorithm_name.length>13?item.algorithm_name.substr(0,14)+"...":item.algorithm_name}
                            </Tooltip>
                        </Row>
                        <p className={style.train}
                                onClick={()=>{
                                    train()
                                    setalgorithm({algorithm_id:item.algorithm_id,algorithm_name:item.algorithm_name})
                                }}
                            >训练模型</p>
                        </Card>
                    </List.Item>
                    )}
                />
                </Row>
                <Pagination  current={startIndex} total={total} onChange={setpagindex} onShowSizeChange={onShowSizeChange}/>
            </Card>
            <Addhm isModalVisible={isModalVisible} handleOk={e=>handleOk(e)} title={"训练模型"} handleCancel={handleCancel} algorithm={algorithm}></Addhm>
         </Card>           
    )
}