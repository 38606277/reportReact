import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import style from './modelList.less'
import Pagination from 'antd/lib/pagination';
import { BarChartOutlined, LineChartOutlined, PieChartOutlined, ProfileOutlined ,SearchOutlined ,PlusOutlined,MoreOutlined} from '@ant-design/icons';
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
    List,
    Menu
} from 'antd';
// import 
import HttpService from '../../util/HttpService.jsx';
import MyModal from './Moduleadd.jsx'// 模型弹窗
import BatchForm from './batchForm.jsx'//批量编辑表
const backgroundcolor={//左侧背景
    background:"#40a9ff",
    color:"#fff"
}

import ERGraphDemo from '../ERGraphDemo/index.tsx';
import NewLform from './newlform.jsx'
export default ()=>{
    const [table_name,setTable_name]=useState("");//表中文名
    const [TableList,setTableList]=useState([]);//左侧列表
    const [table_title,setTable_title]=useState("");//表英文名
    const [startIndex,setStartIndex]=useState(1);//当前第几页
    const [perPage,setPerPage]=useState(10);//一页显示第几条
    const [model_id,setModel_id]=useState(null);//模型id
    const [ModData,setModData]=useState({});//获取默认模型信息
    const [TableListinit,setTableListinit]=useState([]);//左侧数据复值
    const [TableListinit_name,setTableListinit_name]=useState("");//左侧搜索
    const [backgroundindex,setbackgroundindex]=useState(0);//左侧选中
    const [list,setList]=useState([]);//列表
    const [moduleType,setModuleType]=useState(true);//控制模型和列
    const [total,setTotal]=useState(0);//一共多少条数据
    const [visible,setvisible]=useState(false)
    const [tableData,settableData]=useState([])//浏览数据
    const [tableColumn,settableColumn]=useState([])
    const [visible2,setVisible2]=useState(false)//创建模型控制变量
    const [ModObj,setModObj]=useState(null)
    const [set,setSet]=useState(true)
    const [isModalVisible,setisModalVisible]=useState(false)
    const [url,seturl]=useState("X")
    const [TbatchForm,setTbatchForm]=useState(false)//批量建表
    useEffect(()=>{
        (async()=>{
            await HttpService.post('/reportServer/bdModel/getAllList', null).then(res=>{
                if(res.resultCode==="1000"){
                    setTableListinit(res.data)
                    setTableList(res.data)
                    setModData(res.data[0])
                    setModel_id(res.data[0].model_id)
                    getTableList(1,10,"","",res.data[0].model_id)
                }
            })
        })()
    },[set,url])
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
                setList(res.data.list)
                setStartIndex(1)
                setPerPage(10)
                setTotal(res.data.total)
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
        setModel_id(obj.model_id)
        getTableList(1,10,"","",obj.model_id)
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
    const addTableList=()=>{//新建模型按钮
        setVisible2(true)
        setSet(false)
    }
    const confirmModule=(id)=>{//删除磨练
        HttpService.post('/reportServer/bdModel/deleteModelById', JSON.stringify({"model_id":id})).then(res => {
            console.log(res)
            if (res.resultCode == "1000") {   
                HttpService.post('/reportServer/bdModel/getAllList', null).then(res => {
                    if (res.resultCode == "1000") {
                        HttpService.post('/reportServer/bdModel/getAllList', null).then(res=>{
                            if(res.resultCode==="1000"){
                                setTableListinit(res.data)
                                setTableList(res.data)
                                setModData(res.data[0])
                                setModel_id(res.data[0].model_id)
                                seturl("X"+res.data[0].model_id)
                                getTableList(1,10,"","",res.data[0].model_id)
                            }
                        })
                    }
                    else {
                        message.error(res.message);
                    }
                })
            }
            else {
                message.error(res.message);
            }
        })
    }

    const setpagindex=(page, pageSize)=>{
        console.log(model_id)
        getTableList(page,pageSize,"","",model_id)
        setStartIndex(page)
        setPerPage(pageSize)
    }
    const onShowSizeChange =(current, pageSize)=>{
        setStartIndex(1)
        setPerPage(pageSize)
    }
    const showModal =(record)=>{
        setvisible(true)
        //查询表格数据 
        let param = {
            dbtype_id:ModData.db_type,
            host_id:ModData.db_source,
            table_name:record.table_name
        };
        HttpService.post('/reportServer/dataAsset/getValueByHostAndTable', JSON.stringify(param)).then(res => {
            console.log(res)
            //生成列信息
            let cols = [];
            let columns = res.data[0];
            let obj={
                overflow: 'hidden',
                display: 'block',
                width: '200px',
                height:'40px'
            }
            for (var key in columns) {

                if(key==='fileDataBlob'){
                    cols.push({
                        title: key,
                        dataIndex: key,
                        render: text => <a style={{...obj}}>{text}</a>,
                    })
                }else{
                    cols.push({
                        title: key,
                        dataIndex: key
                    })
                }

            }
            // for (j = 0, len = columns.length; j < len; j++) {
            //     cols.push({
            //         title: columns[j],
            //         dataIndex: columns[j]
            //     })
            // }
            settableData(res.data)
            settableColumn(cols)
            // 设置高亮
        }, errMsg => {
            setList([])
        });
    }
    const columns = [
        {
            title:"数据中文名称",
            dataIndex: 'table_title',
            key: 'table_title',
            className: 'table_title',
        },
        {
            title: '数据名称',
            dataIndex: 'table_name',
            key: 'table_name',
            className: 'headerRow',
        }, {
            title: '数据描述',
            dataIndex: 'table_desc',
            key: 'table_desc',
            className: 'headerRow',
        },
        {
            title: '创建时间',
            dataIndex: 'create_date',
            key: 'create_date',
            className: 'create_date',
        },
        {
            title: '操作',
            dataIndex: '操作',
            className: 'headerRow',
            render: (text, record) => (
                <span>
                    <a onClick={()=>{
                        const myurl="L"+record.table_id+"&"+model_id
                        seturl(myurl)
                
                        setisModalVisible(true)
                    }}>编辑</a>
                    <Divider type="vertical" />
                    <a onClick={() => showModal(record)} href="javascript:;">浏览数据</a>
                    <Divider type="vertical" />
                    <Popconfirm
                        title="您确定要删除此表吗?"
                        onConfirm={()=>deleteList(record.table_id)}
                        okText="确定"
                        cancelText="取消"
                    ><a>删除</a> 
                    </Popconfirm>
                </span>
            ),
        }];
    const search=()=>{//搜索
        getTableList(  startIndex,perPage,table_title,table_name,model_id)
    }
    const deleteList=(table_id)=>{
        HttpService.post('/reportServer/bdModelTableColumn/table/deleteTableId', JSON.stringify({"table_id":table_id})).then(res => {
            if (res.resultCode == "1000") {   
                getTableList(  startIndex,perPage,table_title,table_name,model_id)
                message.success('删除成功');
            }
            else {
                message.error(res.message);
            }
        })
    }

    const addModule=(data)=>{
        const {db_source,db_type,model_name}=data
        if(model_name===""){
            return message.error("请填写模型名称")
        }
        if(db_type==="请选择"){
            return message.error("请填选择模型类型")
        }
        if(db_source===""){
            return message.error("请填选择模型来源")
        }
        HttpService.post('/reportServer/bdModel/createModel', JSON.stringify(data)).then(res => {
            if (res.resultCode == "1000") {   
                HttpService.post('/reportServer/bdModel/getAllList', null).then(res => {
                    if (res.resultCode == "1000") {
                        setModData({...res.data[0]})
                        setTableList(res.data)
                        setTableListinit(res.data)
                        setTableList(res.data)
                        setModData(res.data[0])
                        setModel_id(res.data[0].model_id)
                        getTableList(1,10,"","",res.data[0].model_id)
                        setVisible2(false)
                    }
                    else {
                        message.error(res.message);
                    }
                })
            }
            else {
                message.error(res.message);
            }
        })
    }
    const handleCancel=(id)=>{
        console.log(id)
        setisModalVisible(false)
        setModel_id(id)
    }
    return (
        <Card title="数据模型" bodyStyle={
            {
                padding:"0px"
            }
        }>
            <Row>
                <Col sm={4}>
                    <Card>
                        <Row>
                            <Col sm={19} style={{fontSize:"15px"}}>
                                模型列表
                            </Col>
                            <Col sm={4}>
                                <Popover content={()=>{
                                    return(<div>新建模型</div>)
                                }}>
                                    <PlusOutlined style={{marginLeft: '15px'}}  onClick={()=>{
                                        addTableList()
                                    }}/>
                                </Popover>
                            </Col>
                        </Row>
                            <Input className={style.TableListInput} value={TableListinit_name} onChange={e=>{
                                            TableListNamechang(e)
                            }}/>
                        <Row>
                            <List
                                style={{
                                    width:"170px",
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
                                            borderRadius:"2px",
                                            ...backgroundindex===index?backgroundcolor:null
                                        }
                                    }
                                ><span>{item.model_name}</span> 
                                      <Popover
                                            trigger="click"
                                            placement="bottomRight"
                                            content={()=>{
                                                return(
                                                    <List>
                                                        <li  onClick={()=>{
                                                            setVisible2(true)
                                                            setModObj(item)
                                                            setSet(true)
                                                            }}>编辑</li>
                                                        <Popconfirm 
                                                            title="确定要删除这个模块吗?"
                                                            onConfirm={()=>confirmModule(item.model_id)}
                                                            okText="删除"
                                                            cancelText="取消"
                                                        >
                                                            <li >删除</li>
                                                        </Popconfirm>
                                                    </List>
                                                )
                                            }}
                                        >
                                                <MoreOutlined  className={style.MICNS} style={{color:backgroundindex===index?"#fff":"#40a9ff"}}/>
                                        </Popover >
                                </List.Item>}
                                />
                        </Row>
                    </Card>
                </Col>
                <Col sm={20}>
                    <Card bodyStyle={{
                        padding:"0px 10px"
                    }}>
                        <Form 
                                name="horizontal_login" layout="inline"
                        >
                            <Form.Item name="note" label="数据类型" rules={[{ required: true }]}>
                                <Input value={ModData.db_type} bordered={false} disabled/>
                            </Form.Item>
                            <Form.Item name="note" label="数据来源" rules={[{ required: true }]}>
                                <Input value={ModData.db_source} bordered={false} disabled/>
                            </Form.Item>
                        </Form>
                    </Card>
                        <Row style={{
                         padding:"2px 10px"
                        }}
                            justify="space-between"
                            align="middle"
                        >
                                <Form
                                    name="horizontal_login" layout="inline"
                                >
                                    <Form.Item name="note" label="表中文名称" rules={[{ required: true }]}>
                                        <Input size="small" value={table_title} onChange={e=>{setTable_title(e.target.value)}} />
                                    </Form.Item>
                                    <Form.Item name="note" label="表名英文" rules={[{ required: true }]}>
                                        <Input size="small" value={table_name} onChange={e=>{setTable_name(e.target.value)}}/>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" size="small" icon={<SearchOutlined />} onClick={()=>{
                                            search()
                                        }}>搜索</Button>
                                    </Form.Item>
                                    
                                </Form>
                                <Row>
                                    <Button
                                        type="primary" size="small"  style={{marginRight:"10px"}} 
                                        onClick={()=>{
                                            setTbatchForm(true)
                                        }}
                                    >批量建表</Button>
                                    <Button type="primary" size="small"  style={{marginRight:"10px"}} 
                                        onClick={()=>{
                                            const myurl ="X"+model_id
                                            seturl(myurl)
                                            setisModalVisible(true)
                                            
                                        }}
                                    >新建表</Button>
                                    <Radio.Group size="small"  defaultValue="list" buttonStyle="solid">
                                        <Radio.Button size="small" value="list" onClick={()=>setModuleType(true)}>列表</Radio.Button>
                                        <Radio.Button size="small" value="column" onClick={()=>setModuleType(false)}>模型</Radio.Button>
                                    </Radio.Group>
                                </Row>
                             
                        </Row>
                        <div>
                            {
                                moduleType? <Table style={{display:'flow-root'}} dataSource={list} columns={columns} bordered={true}
                               
                                pagination={false}
                                footer={()=>{
                                    return (<div style={{display:"flow-root"}}>
                                        <Pagination style={{float:'right'}} defaultCurrent={startIndex} total={total} onChange={setpagindex} onShowSizeChange={onShowSizeChange}/>
                                    </div>)
                                }}
                                />:<div style={
                                    {   
                                        width:"100%",
                                        position: 'relative',
                                        height:"500px"
                                    }
                                } ><ERGraphDemo  model_id={model_id}/></div>
                            } 
                        </div>
                </Col>
            </Row>
            <Modal
                    title="表详情"
                    width='900px'
                    cancelText='取消'
                    okText='确认'
                    visible={visible}
                    onOk={()=>{setvisible(false)}}
                    onCancel={()=>{setvisible(false)}}
                >
                    <Card>
                        <Table dataSource={tableData} columns={tableColumn}
                            scroll={{ x: 1300 }}
                            bordered={true} />
                    </Card>
                </Modal>
            <MyModal
            destroyOnClose={true}
            visible={visible2} on={()=>{
                setVisible2(false)
                setModObj(null)
                // this.setState({visible2:false,ModObj:this.state.set!==false?this.state.ModData:null,set:false})
                }} go={(data)=>addModule(data)}  set={set} ModObj={ModObj}></MyModal>
                <NewLform isModalVisible={isModalVisible} handleOk={(e)=>handleCancel(e)} module_id={url} getTableList={getTableList} handleCancel={(e)=>handleCancel(e)}/>
                {/* isModalVisible,handleOk,handleCancel */}
                <BatchForm TbatchForm={TbatchForm} ModData={ModData} n={()=>setTbatchForm(false)} y={()=>{setTbatchForm(false)}}/>
        </Card>
    )
}