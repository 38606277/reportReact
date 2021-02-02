import React,{useState,useEffect,useRef} from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'antd/lib/pagination';
import { BarChartOutlined, LineChartOutlined, PieChartOutlined, ProfileOutlined ,SearchOutlined ,PlusOutlined,CloseOutlined, CheckOutlined,DownOutlined,EditOutlined,DisconnectOutlined  } from '@ant-design/icons';
// import { Form } from '@ant-design/compatible';

// import CodeMirror from 'react-codemirror';
// import 'codemirror/lib/codemirror.css';
// import 'codemirror/mode/sql/sql';
// import 'codemirror/theme/ambiance.css';
// import 'codemirror/addon/hint/show-hint.css';  
// import 'codemirror/addon/hint/show-hint.js';  
// import 'codemirror/addon/hint/sql-hint.js';  
// import 'codemirror/theme/ambiance.css'; 
// import '@ant-design/compatible/assets/index.css';
import {
    Table,
    Form,
    Divider,
    Button,
    Checkbox,
    Card,
    Tree,
    Input,
    Spin,
    Row,
    Col,
    Select,
    Tooltip,
    InputNumber,
    Radio,
    Modal,
    Popconfirm,
    message,
    Popover,
    List,
    Menu,
    Switch,
    notification,
    Dropdown,
    Tag,
    Statistic,
    Empty,
    Steps 
} from 'antd';
const {Option}=Select
import HttpService from '../../util/HttpService.jsx';

const tailLayout = {
    wrapperCol: { offset: 1, span: 9 },
  };
export default (props)=>{
    const {isModalVisible,handleOk,handleCancel,title,ok,algorithm,data}=props
    const [source,setsource]=useState([])//数据源
    const [Source,getSource]=useState(null)//获取数据源名称
    const [listTabl,setListTabl]=useState([])//数据表
    const [ListTabl,getListTable]=useState(null)//获取数据表
    const [moduleName,setmoduleName]=useState([])//算法名称list
    const [ModuleName,getModuleName]=useState(null)//获取算法名称
    const [model_name,setmodel_name]=useState("")//模型名称
    const [model_file_url,setmodel_file_url]=useState("")//输出路径
    const [typ,settyp]=useState(false)//是否可用改
    useEffect(()=>{
        if(data){
            const a=data.model_file_url
            setmodel_file_url(a)
            setmodel_name(data.model_name)
            getListTable(data.dataset_id)
            getSource(data.datasource_id)
            HttpService.post('/reportServer/algorithm/getAllList',JSON.stringify(null)).then(res=>{
                if(res.resultCode==="1000"){
                    const arr=res.data.map(item=>{
                        return {
                            text:item.algorithm_id,
                            value:item.algorithm_name
                        }
                    })
                    let names=arr.filter(item=>{
                        if(item.text===data.algorithm_id){
                            return item
                        }
                    })[0].value
                    setsource(arr)
                    getModuleName(names)
                    settyp(true)
                }
            })
            return 
        }
         HttpService.post('/reportServer/DBConnection/ListAll',JSON.stringify({})).then(res=>{
            const arr=res.map(item=>{
                return {
                    value:item.url,
                    text:item.name
                }
            })
            setsource(arr)
            getSource(arr[0].text)
            getlistTabl(arr[0].text)
            
        })
        HttpService.post('/reportServer/algorithm/getAllList',JSON.stringify(null)).then(res=>{
            if(res.resultCode==="1000"){
                console.log(res.data)
                const arr=res.data.map(item=>{
                    return {
                        text:item.algorithm_id,
                        value:item.algorithm_name
                    }
                })
                setmoduleName(arr)
                getModuleName(arr[0].value)
                if(algorithm){
                    return  getModuleName(algorithm.algorithm_name)
                }
              
            }
        })
        
    },[algorithm,data])
    const ok1=e=>{
        const algorithm_id=moduleName.filter(item=>{
            if(item.value===ModuleName){
                return item
            }
        })[0].text
        if(model_name===""){
            return message.warning('请填写模型名称')
        }
        handleOk({
            model_id:"",
            model_name:model_name,
            comment:null,
            dataset_id:ListTabl,
            algorithm_id:algorithm_id,
            create_date:"",
            model_file_url:model_file_url,
            datasource_id:Source,
            statues:0
        })
        settyp(false)
        setmodel_name("")
        setmodel_file_url("")
        getSource(null)
        getListTable(null)
        getModuleName(null)
    }
    const handle=()=>{
        setmodel_name("")
        setmodel_file_url("")
        getSource(null)
        getListTable(null)
        getModuleName(null)
        handleCancel()
    }
    const getlistTabl=(name)=>{
         HttpService.post("reportServer/selectsql/getTableList", JSON.stringify({fromdb:name}))
        .then(res => {
            if (res.resultCode == '1000') {
                const arr=res.data.tables.map(item=>{
                    return{
                        value:item
                    }
                })
                setListTabl(arr)
                getListTable(arr[0].value)
            }
            else{
                setListTabl([])
                getListTable(null)
            }
               
        })
    }
    return (    
        <Modal destroyOnClose title={title} width="800px" visible={isModalVisible} onOk={ok1} onCancel={handle} confirmLoading={ok?true:false}>
            <Form.Item
                style={{boxSizing:"border-box",padding:"0 50px"}}
                label="模型名称"
                name="模型名称"
            >
                <Input disabled={data?true:false} value={model_name} onChange={e=>{setmodel_name(e.target.value)}}/>
            </Form.Item>
            <Divider  orientation="left" plain>输入数据</Divider>
            <Row justify="space-between" style={{boxSizing:"border-box",padding:"0 50px"}}>
                <Form.Item
                    label="算法名称"
                    name="算法名称"
                    placeholder="请选择算法名称"
                >
                   <Select
                   disabled={data?true:false} 
                    style={{ width: 180 }}
                    value={ModuleName}
                    placeholder={ModuleName}
                    onChange={e=>{
                        console.log(e)
                        getModuleName(e)
                    }}
                   >
                        {
                            moduleName.map((item,index)=>{
                               return <Option value={item.value}>{item.value}</Option>
                            })
                        }
                   </Select>
                </Form.Item>
                {/* <Form.Item
                    label="模型类别"
                    name="模型类别"
                    placeholder="请选择模型类别"
                    {...tailLayout}
                >
                   <Select
                    style={{ width: 180 }}
                   >
                        {
                            moduleName.map((item,index)=>{
                               return <Option value={item.id}>{item.value}</Option>
                            })
                        }
                   </Select>
                </Form.Item> */}
            </Row> 
            <Row justify="space-between" style={{boxSizing:"border-box",padding:"0 50px"}}>
                <Form.Item
                    label=" 数据源"
                    name="数据源"
                    placeholder="请选择数据源"
                    {...tailLayout}
                >
                   <Select
                   disabled={data?true:false} 
                      placeholder={Source}
                      value={Source}
                      style={{ width: 180 }}
                      onChange={(e)=>{
                        getSource(e)
                        getlistTabl(e)
                    }}
                   >
                        {
                            source.map((item,index)=>{
                               return <Option value={item.text}>{item.text}</Option>
                            })
                        }
                   </Select>
                </Form.Item>
                <Form.Item
                    label="数据表"
                    name="数据表"
                    placeholder="请选择数据表"
                    {...tailLayout}
                    
                >
                   <Select
                   disabled={data?true:false} 
                    placeholder={ListTabl}
                    value={ListTabl}
                    style={{ width: 180 }}
                    onChange={(e)=>{
                        getListTable(e)
                  }}
                   
                   >
                        {
                            listTabl.map((item,index)=>{
                               return <Option value={item.value}>{item.value}</Option>
                            })
                        }
                   </Select>
                </Form.Item>
            </Row>
            <Divider  orientation="left" plain>输出模型</Divider>
            <Row justify="space-between" style={{boxSizing:"border-box",padding:"0 50px"}}>
                <Form.Item
                    label="模型路径"
                    name="模型路径"
                >
                    <Input disabled={data?true:false}  value={data?data.model_file_url:model_file_url} onChange={e=>{setmodel_file_url(e.target.value)}}/>
                    <div style={{display:"none"}}>{data?data.model_file_url:model_file_url}</div>
                </Form.Item>
                <Form.Item
                    label="模型类别"
                    name="模型类别"
                >
                    <Input disabled={data?true:false}  />
                </Form.Item>
            </Row>
        </Modal>
     
    )
}