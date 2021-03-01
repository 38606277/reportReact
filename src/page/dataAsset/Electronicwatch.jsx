
import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'antd/lib/pagination';
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
    Tooltip,
    Drawer,
    Modal,
} from 'antd';
import HttpService from '../../util/HttpService.jsx';
const en = window.luckysheet
const luckyCss = {
    margin: '0px',
    padding: '0px',
    position: 'relative',
    width: '100%',
    height: '100%'
}
export default (props)=>{
    const {infvisi,dataObj}=props
    const {temptable_name}=dataObj
    const [startIndex,setstartIndex]=useState(1)
    const [perPage,setperPage]=useState(10)
    const [tableColumnModel,settableColumnModel]=useState([])
    const [tableDataModel,settableDataModel]=useState([])
    const [total,settotal]=useState(0)
    const [height,setheight]=useState(0)
    const [width,setwith]=useState(0)
    const [mw,setmw]=useState(0)
    const [loading,setloading]=useState(true)
    useEffect(()=>{
        const bHeight=document.getElementsByClassName("navbar-side")[0].offsetHeight
        const bWidth=document.getElementsByClassName("navbar-side")[0].offsetWidth
        const bodyw= document.body.clientWidth
        const width=bodyw-bWidth
        setheight(bHeight)
        setwith(width)
        setmw(bWidth)
        // console.log(infvisi)
        if(infvisi){
            loadHostTable();
        }
     
            
    },[infvisi])
    const back =()=>{
        // setDataObj({})
        // setinfvisi(false)
        const {setEwatch,setDataObj}=props.back
        setEwatch(false)
        setDataObj({})
    }
    const onPageNumChange=(startIndex)=>{
        setstartIndex(startIndex)
    }

    const showTotal  = (total) =>  {
        return `共 ${total} 条`;
      }
    
   const loadHostTable = () => {
        //查询表格数据 
        let url = "/reportServer/dataAsset/getValueByHostAndTable";
        const {temphost_id,temptable_name,tempdbtype_id}=props.dataObj
        let param = {
            host_id:temphost_id,
            table_name: temptable_name,
            dbtype_id:tempdbtype_id,
            startIndex:startIndex,
            perPage:100
        };
        HttpService.post(url, JSON.stringify(param)).then(res => {
            if(res.resultCode==="1000"){
                if(!res.data.list){
                    return 
                }
                const arr=res.data.list
                const TitleArr=[]
                let l=-1
                for (let key in arr[0]){
                    l+=1
                    TitleArr.push({
                        r:0,
                        c:l,
                        v:{
                            v:key,
                            m:key+"",
                            bg: "#fce5cd",
                        }
                    })
                }
                const Myarr=[]

               for(let i=0;i<arr.length;i+=1){
                   let U=[]
                   let s=-1
                   for (let y in arr[i]){
                       s+=1
                        U.push({
                            r:i+1,
                            c:s,
                            v:arr[i][y]
                        })
                   }
                   Myarr.push(...U)
               }
                en.create({
                showtoolbarConfig:{
                    hou:false,
                    HOUQuery:false
                },
                    showinfobar:false,
                    lang: 'zh',
                    plugins:['chart'],
                    data:[
                    {
                        "name": "name",
                        "row": 36,
                        "column": 20,
                        "index": "0",
                        "order":  0,
                        "status": 1,
                        "celldata":[
                            ...TitleArr,
                            ...Myarr
                        ]
                    }
                    ]
                })
            en.setHorizontalFrozen(false)
            }
        })
    };

    return(
        <Drawer
        closable={false}
        destroyOnClose
        visible={infvisi}
        onClose={back}
        bodyStyle={{
            padding:"0px"
        }}
        width={width/1}
        >
            <Spin spinning={false} delay={100}>
                <Card title={temptable_name}
                    style={{
                        height:"100%"
                    }}
                    bodyStyle={{
                        height:height-60+'px'
                    }}
                    extra={<Button onClick={()=>{
                        back()
                    }} size="small">返回</Button>}
                >
             <div style={{height:"95%"}}>
                    <div
                        id="luckysheet"
                        style={luckyCss}
                        ></div>
                    </div>
                </Card>
            </Spin>
        </Drawer>
    )
}

