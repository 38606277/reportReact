
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
            loadHostTable();
    
     
            
    },[infvisi])
    const back =()=>{
        const {setDimension,setdescribeObj}=props.back
        setdescribeObj({})
        setDimension(false)
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
            if(!res.data.list){
                return 
            }
            let cols = [];
            const arr=res.data.list
            const TitleArr=[]
            for (let key in arr[0]){
                cols.push(key)
            }
            const Myarr=[cols]
            if(arr){
                arr.forEach((item,index)=>{
                    let m=[]
                    for (let i in item){
                        m.push(item[i])
                    }
                    Myarr.push(m)

                })
            }
            // console.log(Myarr)
            setData(Myarr)
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
                <Card title="维表分析"
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
                <div id="example">
                    <PivotTableUI
                        data={data}
                        renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
                        {...attt}
                        onChange={s =>setattt(s)}
                        unusedOrientationCutoff={Infinity}
                    />
                </div>
                </Card>
            </Spin>
        </Drawer>
    )
}

