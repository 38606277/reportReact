import React,{useState,useEffect,useRef} from 'react'
import { Form, Input, Table, Button, Card, Col,Select, Radio,Pagination, message, Tabs, Divider, Tag ,Layout,Avatar,Row,InputNumber,Checkbox} from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import HttpService from '../../util/HttpService.jsx';
import style from './DataMarket.less'
const url=window.getServerUrl();
export default (props)=>{
    const [classList,setClassList]=useState([]  )
    useEffect(()=>{
        (()=>{
            HttpService.post('/reportServer/query/getAllQueryClass',null).then(res=>{
                console.log(res)
                if(res.resultCode==="1000"){
                    setClassList(res.data)
                }
            })
        })();
    },[])
    return(
        <Card  title="数据市场" style={{display:"flow-root"}}>
            {
                classList.map((item,index)=>{
                    console.log(item.img_file)
                    return (
                        <div key={index} className={style.DataMarket} style={{background:url+"/report/"+item.img_file}}>
                            <div>{item.class_name}</div>
                        </div>
                    )
                })
            }
        </Card>
    )
}