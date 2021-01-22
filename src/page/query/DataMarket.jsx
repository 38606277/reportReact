import React,{useState,useEffect,useRef} from 'react'
import { Form, Input, Table, Button,Card,Tag, Col,Select, Radio,Pagination, message, Tabs, Divider ,Layout,Avatar,Row,InputNumber,Checkbox,Popover} from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import HttpService from '../../util/HttpService.jsx';
import style from './DataMarket.less'

const columns = [
    {
      title: '服务名称',
      dataIndex: 'qry_name',
      key: 'qry_name',
      width: '25%',
    },
    {
      title: '服务类型',
      dataIndex: 'qry_type',
      key: 'qry_type',
      width: '25%',
    },
    {
      title: '服务用途',
      dataIndex: 'qry_desc',
      key: 'qry_desc',
      width: '25%',
    },
    {
        title: '服务连接',
        dataIndex: 'x',
        key: 'x',
        width: '25%',
        render:((_,item)=>{
            return <Popover
            content={<a>http://localhost:9609/reportServer/query/execQuery/{item.qry_id}/{item.class_id}</a>}
            >
            <a>{
                `http://localhost:9609/reportServer/query/execQuery/${item.qry_id}/${item.class_id}`.substring(0,30)
                }...</a>
            </Popover>
           
        })
    }
  ];
export default (props)=>{
    const [classList,setClassList]=useState([])
    const [list,setList]=useState([])
    useEffect(()=>{
        (async ()=>{
            await HttpService.post('/reportServer/query/getAllQueryClass',null).then(res=>{
                console.log(res)
                if(res.resultCode==="1000"){
                    setClassList(res.data)
                }
            })
        })();
        (async ()=>{
            await getListAll()
        })();
    },[])
    const getList=(item)=>{
        HttpService.post('/reportServer/query/getQueryByClassID/'+item.class_id,JSON.stringify({class_id:item.class_name})).then(res=>{
            console.log(res)
            if(res.resultCode==="1000"){
                setList(res.data)
            }
        })
        console.log(item)
    }
    const getListAll=()=>{
        HttpService.post('/reportServer/query/getAllQueryName',null).then(res=>{
            if(res.resultCode==="1000"){
                setList(res.data)
            }
        })
    }
    return(
        <Card  title="数据市场" style={{display:"flow-root"}} headStyle={{fontWeight:"600",fontSize:"20px"}}>
            <Radio.Group defaultValue="全部" size="large">
                <Radio.Button style={{marginRight:"10px"}} value="全部" onClick={()=>{
                    getListAll()
                }}>全部</Radio.Button>
                {
                    classList.map((item,index)=>{
                        return(
                            <Radio.Button onClick={()=>{getList(item)}} style={{marginRight:"10px"}} key={index} value={item.class_name}>{item.class_name}</Radio.Button>
                        )
                    })
                }
            </Radio.Group>
            <Table columns={columns}
                    dataSource={list}
                    style={{
                        marginTop:"20px"
                    }}
            >

            </Table>
            {/* <Row style={{marginTop:"20px"}}>
                {
                    list.map((item,index)=>{
                        return (
                            <Card title={item.qry_name} className={style.list} bodyStyle={{fontSize:"12px"}} headStyle={{fontSize:"14px",fontWeight:600,color:"burlywood",textAlign:"center"}} hoverable={true}>
                                <div>
                                    <span style={{fontWeight:600,color:"#9448eb"}}>服务类型：</span>
                                    {
                                        item.qry_type.length>4?
                                        <Popover
                                        content={<span>{item.qry_type}</span>}
                                    >
                                    <span>{
                                        item.qry_type.substring(0,5)
                                        }...</span>
                                    </Popover>:<span>{item.qry_type}</span>
                                    }
                                </div>
                                <div>
                                    <span style={{fontWeight:600,color:"#9448eb"}}>服务用途：</span>
                                    {
                                        item.qry_desc?item.qry_desc.length>5?
                                        <Popover
                                        content={<span>{item.qry_desc}</span>}
                                    >
                                    <span>{
                                        item.qry_desc.substring(0,5)
                                        }...</span>
                                    </Popover>:<span>{item.qry_desc}</span>:<span>暂无</span>
                                    }
                                </div>
                                <div>
                                    <span style={{fontWeight:600,color:"#9448eb"}}>服务连接：</span>
                                    <Popover
                                    content={<a>http://localhost:9609/reportServer/query/execQuery/{item.qry_id}/{item.class_id}</a>}
                                    >
                                    <a>{
                                        `http://localhost:9609/reportServer/query/execQuery/${item.qry_id}/${item.class_id}`.substring(0,12)
                                        }...</a>
                                    </Popover>
                                </div>
                            </Card>
                        )
                    })
                }
            </Row> */}
        </Card>
    )
}