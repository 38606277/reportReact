import React,{useState,useEffect,useRef} from 'react'
import { Form, Input, Table, Button,Card,Tag, Col,Select, Radio,Pagination, message, Tabs, Divider ,Layout,Avatar,Row,InputNumber,Checkbox} from 'antd';
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
        <Card  title="数据市场" style={{display:"flow-root"}} headStyle={{fontWeight:"600",fontSize:"20px"}}>
            {
                classList.map((item,index)=>{
                    return (
                        <div key={index} className={style.DataMarket}
                            onClick={()=>{
                                props.history.push('/query/DataMarketDetails/'+item.class_id+"&"+item.class_name)
                                console.log(item.class_id)
                            }}
                        >
                            <div style={{textAlign:"center"}}>
                                <img className={style.DataMarket_img} src={url+"/report/"+item.img_file} />
                            </div>
                            <div className={style.DataMarket_text}>{item.class_name}</div>
                        </div>
                    )
                })
            }
        </Card>
    )
}