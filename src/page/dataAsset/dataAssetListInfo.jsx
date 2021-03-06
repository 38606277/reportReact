
import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'antd/lib/pagination';
import '@ant-design/compatible/assets/index.css';
import ReactJson from 'react-json-view'
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
    Popover,
    Drawer,
    Modal,
} from 'antd';
import HttpService from '../../util/HttpService.jsx';
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
    const [x,setx]=useState(0)
    const [loading,setloading]=useState(false)
    useEffect(()=>{
        const bHeight=document.getElementsByClassName("navbar-side")[0].offsetHeight
        const bWidth=document.getElementsByClassName("navbar-side")[0].offsetWidth
        const bodyw= document.body.clientWidth
        const width=bodyw-bWidth
        setheight(bHeight)
        setwith(width)
        setmw(bWidth)
         loadHostTable(startIndex,perPage);
    },[infvisi])
    const back =()=>{
        const {setinfvisi,setDataObj}=props.back
        setDataObj({})
        setinfvisi(false)
    }
    const onPageNumChange=(startIndex)=>{
        setstartIndex(startIndex)
        loadHostTable(startIndex,perPage) 
    }

    const showTotal  = (total) =>  {
        return `共 ${total} 条`;
      }
    
   const loadHostTable = (startIndex,perPage) => {
        //查询表格数据 
        const {temphost_id,temptable_name,tempdbtype_id}=props.dataObj
        let param = {
            host_id:temphost_id,
            table_name: temptable_name,
            dbtype_id:tempdbtype_id,
            startIndex:startIndex,
            perPage:perPage
        };
        let url = "/reportServer/dataAsset/getValueByHostAndTable";
        HttpService.post(url, JSON.stringify(param)).then(res => {
            
            //生成列信息
            let cols = [];
            if(res.data.list){
                let columns = res.data.list[0];
                let obj={
                    overflow: 'hidden',
                    display: 'block',
                    width: '200px',
                }
                for (var key in columns) {
    
                    if(key==='fileDataBlob'){
                        cols.push({
                            title: key,
                            dataIndex: key,
                            render: text => <a style={{...obj}}>{TypeIsJSON(text)}</a>,
                        })
                    }else{
                        cols.push({
                            title: key,
                            dataIndex: key,
                            render: text => <a style={{...obj}}>{TypeIsJSON(text)}</a>,
                        })
                    }
    
                }
                let myx=cols.length*200
                setx(myx)
                settableColumnModel(cols)
                settableDataModel(res.data.list)
                settotal(res.data.total)
            }
         
        }, errMsg => {
            
        });
    };
    const TypeIsJSON=(json)=>{
        try
        {
            let Json = JSON.parse(json);
            if(Json instanceof Object || Json instanceof Array){
              return     <Popover 
                            destroyTooltipOnHide={true}
                            content={
                                <div style={{
                                    minWidth:height/2+"px",
                                    maxHeight:height/2+'px',
                                    overflowY:"auto"
                                }}>
                                      <ReactJson displayDataTypes={false} displayObjectSize={false} name={false} src={Json}></ReactJson>
                                </div>
                             } title="数据" trigger="hover">
                            <div>浏览（<span style={{color:'red',fontWeight:600}}>JSON</span>）数据</div>
                        </Popover>
            }else{
                return json
            }
            
        }
        catch (e)
        {
            return json
        }
    }
    return(
        <Drawer
        placement="right"
        closable={false}
        destroyOnClose
        visible={infvisi}
        onClose={back}
        bodyStyle={{
            padding:"0px"
        }}
        width={width/1}
        >
            <Spin spinning={loading} delay={100}>
                <Card title={temptable_name}
                    style={{
                        height:"100%"
                    }}
                    extra={<Button onClick={()=>{
                        back()
                    }} size="small">返回</Button>}
                >
                <Table dataSource={tableDataModel} columns={tableColumnModel}
                        scroll={{ x: x,y:height-140}}
                        bordered={true} pagination={false}/>
                    <Pagination current={startIndex}
                        total={total}
                        showTotal={showTotal}
                        size="small"
                        onChange={(startIndex) => onPageNumChange(startIndex)} />
                </Card>
            </Spin>
        </Drawer>
    )
}

// export default class dataAssetList extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             startIndex: 1,
//             perPage: 10,
//             total:0,
//             listType: 'list',
//             cube_name: '',
//             loading: false,
//             tableColumnModel: [],
//             tableDataModel: [],
//             tempdbtype_id:this.props.dataObj.tempdbtype_id,
//             temptable_name:this.props.dataObj.temptable_name,
//             temphost_id:this.props.dataObj.temphost_id,
//             height:0,
//             width:0,
//             mw:0
//         };
//     }
//     componentDidMount() {
//         console.log(this.props.dataObj)
//         const bHeight=document.getElementsByClassName("navbar-side")[0].offsetHeight
//         const bWidth=document.getElementsByClassName("navbar-side")[0].offsetWidth
//         const bodyw= document.body.clientWidth
//         const width=bodyw-bWidth
//         this.setState({height:bHeight,width,mw:bWidth})
//         this.loadHostTable();
//     }

//     // 页数发生变化的时候
//     onPageNumChange(startIndex) {
//         this.setState({
//             startIndex: startIndex
//         }, () => {
//             this.loadHostTable();
//         });
//     }
  
//     // 搜索
//     onSearch(cube_name) {
        
//     }

//     loadHostTable = () => {
//         //查询表格数据 
//         let param = {
//             host_id:this.state.temphost_id,
//             table_name: this.state.temptable_name,
//             dbtype_id:this.state.tempdbtype_id,
//             startIndex:this.state.startIndex,
//             perPage:this.state.perPage
//         };
//         console.log(param)
//         let url = "/reportServer/dataAsset/getValueByHostAndTable";
//         HttpService.post(url, JSON.stringify(param)).then(res => {
            
//             //生成列信息
//             let cols = [];
//             let columns = res.data.list[0];
//             let obj={
//                 overflow: 'hidden',
//                 display: 'block',
//                 width: '200px',
//                 height:'40px'
//             }
//             for (var key in columns) {

//                 if(key==='fileDataBlob'){
//                     cols.push({
//                         title: key,
//                         dataIndex: key,
//                         render: text => <a style={{...obj}}>{text}</a>,
//                     })
//                 }else{
//                     cols.push({
//                         title: key,
//                         dataIndex: key
//                     })
//                 }

//             }
//             this.setState({ tableColumnModel: cols, tableDataModel: res.data.list ,total:res.data.total});

//         }, errMsg => {
            
//         });
//     };


//     showTotal  = (total) =>  {
//         return `共 ${total} 条`;
//       }
    
//     render() {
//         const {infnone,infvisi}=this.props
//         return (
//             <Drawer
//             placement="bottom"
//             closable={false}
//             destroyOnClose
//             visible={infvisi}
//             onClose={infnone}
//             style={
//                 {
//                     height:this.state.height+'px',
//                     width:this.state.width+"px",
//                     marginLeft:this.state.mw+'px',
//                     minHeight:this.state.height+'px',
//                     minWidth:this.state.width+"px",
              
//                 }
//             }
//             bodyStyle={{
//                 padding:"0px"
//             }}
//             height={this.state.height/1}
//             width={this.state.width/1}
//             >
//                 <Spin spinning={this.state.loading} delay={100}>
//                     <Card title="数据资产目录"
//                         style={{
//                             height:"100%"
//                         }}
//                     >
//                     <Table dataSource={this.state.tableDataModel} columns={this.state.tableColumnModel}
//                             scroll={{ x: 1300 ,y:450}}
//                             bordered={true} pagination={false}/>
//                         <Pagination current={this.state.startIndex}
//                             total={this.state.total}
//                             showTotal={this.showTotal}
//                             size="small"
//                             onChange={(startIndex) => this.onPageNumChange(startIndex)} />
//                     </Card>
//                 </Spin>
//             </Drawer>
//         );
//     }
// }
