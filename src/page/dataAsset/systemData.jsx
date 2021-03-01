import React,{useState,useEffect,useRef} from 'react'
import { Link } from 'react-router-dom';
import {
    Form,
    Divider,
    Button,
    Table,
    Radio,
    Space,
    Input,
    Row,
    Col,
    List,
    ConfigProvider,
    Tooltip,
    Spin ,
    Dropdown,
    Menu,
    Card,
    Tabs
} from 'antd';
import { TableOutlined,CaretRightOutlined,DownOutlined } from '@ant-design/icons';
import './index.css'
const { TabPane } = Tabs;
import HttpService from '../../util/HttpService.jsx';
import DataAssetListInfo from './dataAssetListInfo.jsx';//打开表
import DataAssetInfonew from './dataAssetInfonew.jsx'//描述
import Electronicwatch from './Electronicwatch.jsx'//电子表分析
import Dimension1 from './Dimension.jsx'// 维表分析
import Algorithm from './algorithm.jsx'//算法分析
import Chart from './Chart.jsx'//图表
// import Sql from './Sql.jsx'
const analysis=[//分析list
    {
        name:"电子表格分析",
        path:""
    },
    {
        name:"维表分析",
        path:""
    },
    {
        name:"算法分析",
        path:""
    },
    {
        name:"图表分析",
        path:""
    },
    {
        name:"sql分析",
        path:""
    },
]
export default (props)=>{
    const [tabPosition,settabPosition]=useState('')
    const [mcol,setmcol]=useState([])
    const [list,setlist]=useState([])
    const [total,settotal]=useState([])
    const [spinning,setspinning]=useState(true)
    const [data,setdata]=useState([])
    const [TableName,setTableName]=useState('')
    const [infvisi,setinfvisi]=useState(false)//打开表控件
    const [dataObj,setDataObj]=useState({})//表的请求数据
    const [describe,setdescribe]=useState(false)//描述表
    const [describeObj,setdescribeObj]=useState({})//描述对象
    const [Ewatch1,setEwatch]=useState(false)//电子表
    const [Dimension,setDimension]=useState(false)//维表
    const [algorithm,setalgorithm]=useState(false)//算法
    const [char,setchar]=useState(false)//图表
    // const [sql,setsql]=useState(false)//sql
    const [mName,setmName]=useState(0)
    const box=useRef()
    const Bo=useRef()
    useEffect( ()=>{
        const obj =props.match.params
        const {dbType,host_id}=obj
        console.log(obj)
        if(obj.class==="sourec"){
            myhttp('/reportServer/dbTableColumn/getTableListMap',{dbType,host_id},setBOX())
        }
        if(obj.class==='dbtype'){
             myhttp('/reportServer/dataAsset/getTablesByDbType',{dbtype_id:obj.host_id},setBOX())
        }
        if(obj.class==="dbsourec"){
             myhttp('/reportServer/dataAsset/getTablesBySource',{source_id:obj.host_id},setBOX())
        }
    },[])
    useEffect(()=>{
        if(list.length>0){
            setspinning(false)
        }
    },[list])
    const setBOX=()=>{
        const bHeight=document.getElementsByClassName("navbar-side")[0].offsetHeight
        const sHeight=box.current.offsetTop
        const mHeight=bHeight-sHeight-70
        box.current.style.height=mHeight-80+'px'
        return mHeight
    }
    const setarr=(arr,mHeight)=>{
        Bo.current.style.mixWidth=box.current.offsetWidth+"px"
        const listnum=Math.ceil(mHeight/52)//一个col放几个list
        const colnum=Math.ceil(arr.length/listnum)//col的个数
        box.current.style.width=colnum*(260+15)+'px'
        const colarr=[]
        const marr=[]
        for(let u=0;u<colnum;u+=1){
            marr.push([...arr.splice(0,listnum)])
            colarr.push(u)
        }
        return {
            colarr,
            marr
        }
    }
    const myhttp=(src,obj,mHeight)=>{
        HttpService.post(src,JSON.stringify(obj)).then(res=>{
            if(res.resultCode==='1000'){
                const arr=[...res.data]
                const {colarr,marr}=setarr(arr,mHeight)
                setmcol(colarr)
                setlist(marr)
                setdata(res.data)
                settotal(res.data)
                setmName(res.data.length)
                console.log(res.data[0])
                let obj={
                    temphost_id:res.data[0].host_id,
                    temptable_name:res.data[0].table_name,
                    tempdbtype_id:res.data[0].dbtype_id
                }
                setDataObj(obj)
            }
        })
    }
    const changeTabPosition=(e)=>{
        settabPosition(e)
    }
    const  showModal = (record) => {
        // onClick={()=>{
            let obj={
                temphost_id:record.host_id,
                temptable_name:record.table_name,
                tempdbtype_id:record.dbtype_id
            }
            setDataObj(obj)
            setinfvisi(true)
        // }}
        // window.open("#/dataAsset/dataAssetListInfo/"+record.host_id+"/"+record.table_name+"/"+record.dbtype_id);
    }
    const TableNameOnChange=e=>{
        setTableName(e)
        let arrs=JSON.parse(JSON.stringify(total))
        const arr =arrs.filter(item=>{
            if(item.table_name){
                if(item.table_name.search(e)!==-1){
                    return item
                }
            }
         })
         let m=JSON.parse(JSON.stringify(arr))
         setdata(m)
         const {colarr,marr}=setarr(arr,setBOX())
         setmcol(colarr)
         setlist(marr)
      
    }
    const analysisClick=(obj,items)=>{//分析点击事件
        const {name}=obj
        if(name==='电子表格分析'){
            let obj={
                temphost_id:items.host_id,
                temptable_name:items.table_name,
                tempdbtype_id:items.dbtype_id
            }
            setDataObj(obj)
            setEwatch(true)
        }
        if(name==='维表分析'){
            let obj={
                temphost_id:items.host_id,
                temptable_name:items.table_name,
                tempdbtype_id:items.dbtype_id
            }
            setdescribeObj(obj)
            setDimension(true)
        }
        if(name==='算法分析'){
            setalgorithm(true)
        }
        if(name==='图表分析'){
            setchar(true)
        }
        if(name==='sql分析'){
            props.history.push('/dataCompute/sqlDataCompute')
          
            // setsql(true)
        }
      
        
    }
    const columns = [{
        title: '数据名称',
        dataIndex: 'table_name',
        key: 'table_name',
        className: 'headerRow',
        // sorter: (a, b) => a.table_name - b.table_name,
        // sortOrder: sortedInfo.columnKey === 'table_name' && sortedInfo.order,
    }, {
        title: '数据描述',
        dataIndex: 'table_desc',
        key: 'table_desc',
        className: 'headerRow',
    }, {
        title: '数据目录',
        dataIndex: 'catalog_value',
        key: 'catalog_value',
        className: 'headerRow',
    }, {
        title: '数据类型',
        dataIndex: 'dbtype_id',
        key: 'cube_desc',
        className: 'headerRow',
    },
    {
        title: '数据行',
        dataIndex: 'data_count',
        key: 'data_count',
        className: 'headerRow',
    }, {
        title: '操作',
        dataIndex: '操作',
        className: 'headerRow',
        render: (text, record) => (
            <span>
                <a href="javascript:;"
                onClick={()=>{
                    let obj={
                        host_id:record.host_id,
                        dbType:record.dbtype_id,
                        table_name:record.table_name
                        }
                    setdescribeObj(obj)
                    setdescribe(true)
                }}
                >描述</a>
                <Divider type="vertical" />
                <a onClick={() => showModal(record)} href="javascript:;">浏览数据</a>
                <Divider type="vertical" />
                <Dropdown overlay={
                    ()=>{
                        return (
                            <Menu style={{
                                width:"100%",
                                border:"none"
                            }}>
                                {
                                    analysis.map((item1,index)=>{
                                        return (
                                            <Menu.Item>
                                             <a target="_blank" rel="noopener noreferrer"
                                                onClick={()=>{
                                                    analysisClick(item1,record)
                                                }}
                                                >
                                                    {item1.name}
                                                </a>
                                            </Menu.Item>
                                        )
                                    })
                                }
                            </Menu>  
                        )
                    }
                }>
                    <a>
                    分析 <DownOutlined />
                    </a>
                </Dropdown>
                {/* <Divider type="vertical" />
                <a onClick={() => this.deleteCube(`${record.cube_id}`)} href="javascript:;">删除</a> */}
            </span>
        ),
    }];
    return (
        <Card title={
            <div style={{display:'flex'}}>
               <div style={{marginRight:"30px"}}>
                   <span style={{fontWeight:600}}>资产名称：</span>
                   <span >{props.match.params.name}</span>
               </div>
                <div>
                    <span style={{fontWeight:600}}>资产数量：</span>
                    <span >{mName}</span><span >(条)</span>
                </div>
                {/* {props.match.params.name}资产,共{mName}条 */}
            </div>
        }
            bodyStyle={
                {
                    padding:"0px"
                }
            }
            extra={<Button type="primary" href="/#/dataAsset/totalAssets" size="small">返回</Button>}
        >
            <Row>
                <Col sm={24}>
                    <Card
                          bodyStyle={
                            {
                                maxWidth:"100%",
                                padding:"0px"
                            }
                        }
                    >
                            <Tabs 
                                // centered
                                className="H_w_x_tabs"
                                animated
                                tabBarStyle={{
                                    marginBottom:'0px'
                                }}
                                tabBarExtraContent={{
                                left:<Row 
                                >
                                <Radio.Group 
                                    style={{
                                        marginLeft:'10px'
                                    }}
                                    buttonStyle="solid" value={tabPosition} onChange={(e)=>changeTabPosition(e.target.value)}
                                >
                                    <Radio.Button value="top">新建</Radio.Button>
                                    <Radio.Button value="bottom">导入</Radio.Button>
                                    <Radio.Button value="left">设计</Radio.Button>
                                    <Radio.Button value="right">导出</Radio.Button>
                                </Radio.Group>
                                <Form
                                    name="customized_form_controls"
                                    layout="inline"
                                    style={{
                                        marginLeft:'10px'
                                    }}
                                >
                                    <Form.Item name="FName" label="表名">
                                        <Input value={TableName} onChange={e=>{
                                            TableNameOnChange(e.target.value)
                                        }}/>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            搜索
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Row>
                            }}>
                                <TabPane tab="列表" key="1">
                                    <div ref={Bo}
                                        style={{
                                            overflowX:"auto"
                                        }}
                                    >
                                    <Spin spinning={spinning}>
                                        <Row ref={box}
                                            style={{
                                                borderTop:"1px solid #f0f0f0"
                                            }}
                                        >
                                            {
                                                mcol.length>0?mcol.map((item,index)=>{
                                                    return (
                                                        <Col style={{
                                                            marginTop:"-10px",
                                                            marginRight:"15px"
                                                        }}>
                                                            {
                                                            list.length>0?list[index].map((items,indexs)=>{
                                                                return (
                                                                    <Dropdown
                                                                            trigger="contextMenu"
                                                                            overlay={()=>{
                                                                                return (
                                                                                    <Menu>
                                                                                        <Menu.Item>
                                                                                        <a target="_blank" rel="noopener noreferrer"
                                                                                            onClick={()=>{  
                                                                                                let obj={
                                                                                                    temphost_id:items.host_id,
                                                                                                    temptable_name:items.table_name,
                                                                                                    tempdbtype_id:items.dbtype_id
                                                                                                }
                                                                                                setDataObj(obj)
                                                                                                setinfvisi(true)
                                                                                                // props.history.push("/dataAsset/dataAssetListInfo/"+items.host_id+"/"+items.table_name+"/"+items.dbtype_id)
                                                                                            }}
                                                                                        >
                                                                                            打开表
                                                                                        </a>
                                                                                        </Menu.Item>
                                                                                        <Menu.Item>
                                                                                        <a target="_blank" rel="noopener noreferrer"
                                                                                            onClick={()=>{  
                                                                                                // host_id,dbType,table_name
                                                                                                let obj={
                                                                                                    host_id:items.host_id,
                                                                                                    dbType:items.dbtype_id,
                                                                                                    table_name:items.table_name
                                                                                                    }
                                                                                                setdescribeObj(obj)
                                                                                                setdescribe(true)
                                                                                                // props.history.push("/dataAsset/dataAssetInfonew/"+items.host_id+"/"+items.dbtype_id+"/"+items.table_name)
                                                                                            }}
                                                                                        >
                                                                                            
                                                                                            描述表
                                                                                        </a>
                                                                                        </Menu.Item>
                                                                                        <Menu.Item>{/**分析表 */}
                                                                                            <Tooltip 
                                                                                            placement="rightBottom"
                                                                                            overlayStyle={{
                                                                                                padding:"0px"
                                                                                            }}
                                                                                            color="#fff"
                                                                                            overlay={ 
                                                                                                ()=>{
                                                                                                    return (
                                                                                                        <Menu style={{
                                                                                                            width:"100%",
                                                                                                            border:"none"
                                                                                                        }}>
                                                                                                            {
                                                                                                                analysis.map((item1,index)=>{
                                                                                                                    return (
                                                                                                                        <Menu.Item>
                                                                                                                         <a target="_blank" rel="noopener noreferrer"
                                                                                                                            onClick={()=>{
                                                                                                                                analysisClick(item1,items)
                                                                                                                            }}
                                                                                                                            >
                                                                                                                                {item1.name}
                                                                                                                            </a>
                                                                                                                        </Menu.Item>
                                                                                                                    )
                                                                                                                })
                                                                                                            }
                                                                                                        </Menu>
                                                                                                        
                                                                                                    )
                                                                                                }
                                                                                            }>
                                                                                                <a className="ant-dropdown-link">
                                                                                                    分析表 <CaretRightOutlined />
                                                                                                </a>
                                                                                            </Tooltip>
                                                                                        </Menu.Item>
                                                                                    </Menu>
                                                                                )
                                                                            }} placement="bottomLeft">
                                                                                <Button type="text" icon={<TableOutlined style={{color:"#096dd9"}}/>} style={{display:"block",margin:"10px 0",width:"260px",border: 'none',textAlign:"left"}}>{items.table_name}</Button>
                                                                    </Dropdown>
                                                                )
                                                            }):null
                                                            }
                                                        </Col>
                                                    )
                                                }):null
                                            } 
                                        </Row>
                                    </Spin>
                                </div>
                                </TabPane>
                                <TabPane tab="详情信息" key="2">
                                      <Table dataSource={data} columns={columns} size="small"/>
                                </TabPane>
                            </Tabs>
                    </Card>
                </Col>
            </Row>
            <DataAssetListInfo infvisi={infvisi} dataObj={dataObj} back={{setDataObj,setinfvisi}}/>
            <DataAssetInfonew  infvisi={describe} dataObj={describeObj} back={{setdescribeObj,setdescribe}}/>
            <Electronicwatch infvisi={Ewatch1} dataObj={dataObj} back={{setEwatch,setDataObj}} />
            <Dimension1  infvisi={Dimension} dataObj={describeObj} back={{setDimension,setdescribeObj}}/>
            <Algorithm infvisi={algorithm} dataObj={{}} back={{setalgorithm,setdescribeObj}}/>
            <Chart infvisi={char} dataObj={{}} back={{setchar,setdescribeObj}}/>
            {/* <Sql infvisi={sql} dataObj={{}} back={{setsql,setdescribeObj}}/> */}
            {/* infvisi={Dimension} dataObj={dataObj} back={{setDimension,setDataObj}} */}
        </Card>
    )
}