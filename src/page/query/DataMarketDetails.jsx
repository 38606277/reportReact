import React,{useState,useEffect,useRef} from 'react'
import { Form, Input, Table, Button, Card, Col,Select, Radio,Pagination, message, Tabs, Divider, Tag ,Layout,Avatar,Row,InputNumber,Checkbox} from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import HttpService from '../../util/HttpService.jsx';
import style from './DataMarketDetails.less'

export default (props)=>{
    const [classList,setClassList]=useState([]  )
    useEffect(()=>{
        (()=>{
            const path =props.match.params.id_details.split("&")
            HttpService.post('/reportServer/query/getQueryByClassID/'+path[0],JSON.stringify({class_id:path[0]})).then(res=>{
                console.log(res)
                if(res.resultCode==="1000"){
                    setClassList(res.data)
                }
            })
        })();
    },[])
    return(
        <Card  title={props.match.params.id_details.split("&")[1]} style={{display:"flow-root"}} headStyle={{fontWeight:"600",fontSize:"20px"}}
        extra={<Button type="primary" shape="round" size='small' href="#/query/DataMarket">返回</Button>}
        >
        {
            classList.map((item,index)=>{
                return (
                    <div key={index} className={style.DataMarketDetails}
                    >
                        <div className={[style.DataMarketDetails_listRight].join(' ')}>
                            <div  style={{marginBottom:'4px'}}><span>产品名称</span>：{item.qry_name}</div>
                            <div><span>产品用途</span>：{item.qry_desc}</div>
                        </div>
                        <div className={style.DataMarketDetails_list}>
                            <div style={{marginBottom:'4px'}}><span>服务类型</span>：{item.qry_type}</div>
                            <div><span>服务连接</span>：http://localhost:9609/reportServer/query/execQuery/{item.qry_id}/{props.match.params.id_details.split("&")[0]}</div>
                        </div>
                        <div className={style.DataMarketDetails_Btn}>
                            <div>
                                <a onClick={()=>{
                                    window.location.href="#/query/QueryView/view/"+item.qry_id;
                                }}>API接口</a>
                                    <Divider type="vertical" />
                                <a onClick={()=>{
                                    if(item.qry_type=='sql'){
                                        window.location.href="#/query/SqlCreator/update/"+item.qry_id;
                                    }else if(item.qry_type=='procedure'){
                                        window.location.href="#/query/ProcedureCreator/update/"+item.qry_id;
                                    }else if(item.qry_type=='http'){
                                        window.location.href="#/query/HttpCreator/update/"+item.qry_id;
                                    }
                                }}>编辑</a>
                                 <Divider type="vertical" />
                                 <a   href={`#/query/CreateTemplate`}>模板</a>
                                 <Divider type="vertical" />
                                 <a onClick={()=>{
                                    window.location.href="#/query/ExecQuery/"+item.qry_id+"/"+item.class_id+"/"+item.qry_name+"/null";
                                }}>立即执行</a>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    </Card>
    )
}