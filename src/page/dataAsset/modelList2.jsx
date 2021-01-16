import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import style from './modelList.less'
import Pagination from 'antd/lib/pagination';
import { BarChartOutlined, LineChartOutlined, PieChartOutlined, ProfileOutlined ,SearchOutlined ,PlusOutlined} from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
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
    List
} from 'antd';
// import 
import HttpService from '../../util/HttpService.jsx';
const backgroundcolor={//左侧背景
    background:"#5e7ce0",
    color:"#fff"
}
export default ()=>{
    const [table_name,setTable_name]=useState("")//表中文名
    const [TableList,setTableList]=useState([])//左侧列表
    const [table_title,setTable_title]=useState("")//表英文名
    const [startIndex,setStartIndex]=useState(1)//当前第几页
    const [perPage,setPerPage]=useState(10)//一页显示第三条
    const [model_id,setModel_id]=useState(null)//模型id
    const [ModData,setModData]=useState({})//获取默认模型信息
    const [TableListinit,setTableListinit]=useState([])//左侧数据复值
    const [TableListinit_name,setTableListinit_name]=useState("")//左侧搜索
    const [backgroundindex,setbackgroundindex]=useState(0)//左侧选中
    useEffect(()=>{
        (async()=>{
            await HttpService.post('/reportServer/bdModel/getAllList', null).then(res=>{
                if(res.resultCode==="1000"){
                    setTableListinit(res.data)
                    setTableList(res.data)
                    setModData(res.data[0])

                }
            })
        })()
    },[])
    const getTableList =(startIndex,perPage,table_title,table_name,model_id)=>{//表list获取
        let obj={
            startIndex,
            perPage,
            table_title,
            table_name,
            model_id
        }
        HttpService.post('/reportServer/bdModelTableColumn/table/getTableList',JSON.stringify(obj)).then(res => {///列表接口
            if (res.resultCode == "1000") {
                this.setState({
                    list:res.data.list,
                    startIndex:1,
                    perPage:10,
                    total:res.data.total
                });
            }
            else {
                message.error(res.message);
            }
        }, errMsg => {
        });
    }


    const ClickmModelList=(obj,i)=>{//左侧点击
        setModData(obj)
        setbackgroundindex(i)
    }

    const TableListNamechang=e=>{
        setTableListinit_name(e.target.value)
        const arr =TableListinit.filter(item=>{
           if(item.model_name.search(e.target.value)!==-1){
               return item
           }
        })
        setbackgroundindex(0)
        setModData(arr[0]?arr[0]:{})
        setTableList(arr)
    }
    const addTableList=()=>{

    }
    return (
        <Card title="数据模型">
            <Row>
                <Col sm={4}>
                        <Row style={{padding:"0 10px"}}>
                            <Col sm={19} style={{fontSize:"14px"}}>
                                模型列表
                            </Col>
                            <Col sm={4}>
                                <Popover content={()=>{
                                    return(<div>新建模型</div>)
                                }}>
                                    <Button shape="circle" icon={<PlusOutlined />} size="small" onClick={()=>{
                                        addTableList()
                                    }}></Button>
                                </Popover>
                            </Col>
                        </Row>
                        <div className={style.TableListInput}>
                            <Input style={{height:"22px",width:"175px"}} value={TableListinit_name} onChange={e=>{
                                            TableListNamechang(e)
                            }}/>
                        </div>
                        <Row style={{padding:"0 10px"}}>
                            <List
                                style={{
                                    width:"100%",
                                    fontSize:"14px"
                                }}
                                split={false}
                                dataSource={TableList}
                                renderItem={(item,index) => <List.Item
                                    className={
                                        style.TableList
                                    }
                                    onClick={
                                        ()=>ClickmModelList(item,index)
                                    }
                                    style={
                                        {
                                            boxSizing:"border-box",
                                            padding:"2px 10px",
                                            cursor:"pointer",
                                            margin:"4px 0",
                                            ...backgroundindex===index?backgroundcolor:null
                                        }
                                    }
                                >{item.model_name}</List.Item>}
                                />
                        </Row>
                </Col>
                <Col sm={20}
                    style={{
                        padding:"10px",
                        bordered:"1px solid #ccc"
                    }}
                >
                    <Row>
                        <Form 
                                name="horizontal_login" layout="inline"
                        >
                            <Form.Item name="note" label="模型名称" rules={[{ required: true }]}>
                                <Input value={ModData.model_name} bordered={false} disabled/>
                            </Form.Item>
                            <Form.Item name="note" label="数据类型" rules={[{ required: true }]}>
                                <Input value={ModData.db_type} bordered={false} disabled/>
                            </Form.Item>
                            <Form.Item name="note" label="数据来源" rules={[{ required: true }]}>
                                <Input value={ModData.db_source} bordered={false} disabled/>
                            </Form.Item>
                            <Form.Item name="note" label="创建时间" rules={[{ required: true }]}>
                                <Input value={ModData.update_date} bordered={false} disabled/>
                            </Form.Item>
                            <Form.Item name="note" label="创 建 人" rules={[{ required: true }]}>
                                <Input value={ModData.update_by} bordered={false} disabled/>
                            </Form.Item>
                        </Form>
                    </Row>
                </Col>
            </Row>
        </Card>
    )
}