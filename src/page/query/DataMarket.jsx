import React,{useState,useEffect,useRef} from 'react'
import { Form, Input, Table, Button,Card,Tag, Col,Select, Radio,Pagination, message, Tabs, Divider ,Layout,Avatar,Row,InputNumber,Checkbox} from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import HttpService from '../../util/HttpService.jsx';
import style from './DataMarket.less'
const url=window.getServerUrl();
export default (props)=>{
    const [classList,setClassList]=useState([])
    const [list,setList]=useState([])
    useEffect(()=>{
        (()=>{
            HttpService.post('/reportServer/query/getAllQueryClass',null).then(res=>{
                console.log(res)
                if(res.resultCode==="1000"){
                    setClassList(res.data)
                }
            })
        })();
        (()=>{
            HttpService.post('/reportServer/query/getQueryByClassID/',JSON.stringify({})).then(res=>{
                console.log(res)
                if(res.resultCode==="1000"){
                    setList(res.data)
                }
            })
        })();
    },[])
    const getList=(item)=>{
        console.log(item)
    }
    return(
        <Card  title="数据市场" style={{display:"flow-root"}} headStyle={{fontWeight:"600",fontSize:"20px"}}>
            <Radio.Group defaultValue="全部" size="large">
                <Radio.Button style={{marginRight:"10px"}} value="全部">全部</Radio.Button>
                {
                    classList.map((item,index)=>{
                        return(
                            <Radio.Button onClick={()=>{getList(item)}} style={{marginRight:"10px"}} key={index} value={item.class_name}>{item.class_name}</Radio.Button>
                        )
                    })
                }
            </Radio.Group>
            <Card>
                <Row>
                    
                </Row>
            </Card>
        </Card>
    )
}