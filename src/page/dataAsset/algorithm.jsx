
import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'antd/lib/pagination';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import TableRenderers from 'react-pivottable/TableRenderers';
import Plot from 'react-plotly.js';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';
//const Plot = createPlotlyComponent(window.Plotly);
const PlotlyRenderers = createPlotlyRenderers(Plot);
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
export default (props)=>{
    const {infvisi,dataObj}=props
    const [startIndex,setstartIndex]=useState(1)
    const [perPage,setperPage]=useState(10)
    const [data,setData]=useState([])
    const [attt,setattt]=useState({})
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
        console.log(infvisi)
            // loadHostTable();
    
     
            
    },[infvisi])
    const back =()=>{
        const {setalgorithm,setdescribeObj}=props.back
        setdescribeObj({})
        setalgorithm(false)
    }
    const onPageNumChange=(startIndex)=>{
        setstartIndex(startIndex)
    }

    const showTotal  = (total) =>  {
        return `共 ${total} 条`;
      }
    
   const loadHostTable = () => {
        //查询表格数据 
        let url = "/reportServer/dbTableColumn/getTableCloumnList";
        const {host_id,dbType,table_name}=dataObj
        let param={
         host_id,
         dbType,
         table_name
       }
        HttpService.post(url, JSON.stringify(param)).then(res => {
            let cols = [["列名","说明","数据类型"]];
     
            if(res.data.columnList){

                let columns = res.data.columnList;
                columns.forEach((item,index)=>{
                    cols.push([item.column_name,item.column_title,item.column_type])

                })
            }
            console.log(cols)
            setData(cols)
        })
    };

    return(
        <Drawer
        placement="bottom"
        closable={false}
        destroyOnClose
        visible={infvisi}
        // onClose={infnone}
        style={
            {
                // height:height+'px',
                width:width+"px",
                marginLeft:mw+'px',
          
            }
        }
        bodyStyle={{
            padding:"0px"
        }}
        height={height/1}
        width={width/1}
        >
            <Spin spinning={false} delay={100}>
                <Card title="算法分析"
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
                    待做
                </Card>
            </Spin>
        </Drawer>
    )
}

