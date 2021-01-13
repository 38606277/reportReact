import React, { useState ,useEffect,useRef} from 'react';
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
    Select,
    Tooltip,
    Radio,
    Modal,
    Tag,
    Popconfirm,
    message,
    Popover 
} from 'antd';
import HttpService from '../../util/HttpService.jsx';
const { Option } = Select;
const Star={//红色*样式
    marginRight: '4px',
    color: '#ff4d4f',
    fontSize: '14px',
    fontFamily: 'SimSun, sans-serif',
    lineHeight: '1'
    };
  const Hinput= props=>{
    const {ISname,value,chang}=props
    return (
      <div style={{display:"flex",width:'480px',height:'30px',alignItems:'center'}}>
        <span style={{marginRight:'5px'}}><span style={{...Star}}>*</span>{ISname} <span>： </span></span>
        <Input style={{width:'390px'}} value={value} onChange={e=>chang(e.target.value)}/>
      </div>
    )
  }

export default (props)=>{
    const {visible,on,go,set,ModObj}=props
    const [data,setdata]=useState(set)
    const [data_Source,setData_Source]=useState('请选择');//数据来源
    const [ModName,setModName]=useState('');//模型名称
    const [data_Class,setData_Class]=useState('请选择');//数据类型
    const [C_list,setC_list]=useState([])//类选择
    const [S_list,setS_list]=useState([])//来源选择
        useEffect(()=>{
            setdata(visible)
            if(ModObj){
                setModName(ModObj.model_name);
                setData_Source(ModObj.db_source);
                setData_Class(ModObj.db_type);
                ShandleChange(ModObj.db_type)
                console.log(data_Source)
            };
            (async ()=>{
               await HttpService.post('/reportServer/DBConnection/ListAll', JSON.stringify({})).then(res => {
                    const Clist=[]
                    setdata(set)
                    res.forEach(item=>{
                        let index=Clist.findIndex(items=>{return items.text===item.dbtype})
                        if(index===-1){
                            Clist.push({
                                text:item.dbtype,
                                value:item.dbtype,
                            })
                        }
                    })
                    setC_list([...Clist])
                }, errMsg => {
                    // this.setState({
                    //     list: [], loading: false
                    // });
                }); 
            })();
        },[visible])
    const ok=()=>{
        go({
            db_source:data_Source,
            model_name:ModName,
            db_type:data_Class,
            model_id:set!==false?ModObj.model_id:null
        })
        setData_Source("请选择")
        setModName("")
        setData_Class("请选择")
    }
    const ShandleChange =(e)=>{
        HttpService.post('/reportServer/DBConnection/ListAll', JSON.stringify({})).then(res => {
            const Tlist=res.filter(item=>{
                if(item.dbtype===e){
                    return {
                        text:item.name,
                        value:item.name,
                    }
                }
            })
            setS_list([...Tlist])
        })
        setData_Class(e)
    }
    return (<Modal 
            title={set!==false?"编辑模型":"新增模型"}
            width='900px'
            cancelText='取消'
            okText='确认'
            visible={visible}
            onOk={()=>ok()}
            onCancel={()=>{
                setData_Source("请选择")
                setModName("")
                setData_Class("请选择")
                on()
            }}
        >
        <div style={{position:"relative"}}>
                <Hinput value={ModName} chang={setModName} ISname={"模型名称"}/>
                <div style={{display:"flex",margin:"10px 0px"}}>
                    <div style={{display:"flex",width:'220px',height:'30px',alignItems:'center'}}>
                        <span style={{marginRight:'5px'}}><span style={{...Star}}>*</span>数据类型 <span>： </span></span>
                        <Select defaultValue="请选择" style={{ width: 120 }} value={data_Class} onChange={ShandleChange}>
                            {
                                C_list.map((item,index)=>{
                                    return (<Option value={item.value} key={index}>{item.text}</Option>)
                                })
                            }
                        </Select>
                    </div>
                    <div style={{display:"flex",width:'220px',height:'30px',alignItems:'center'}}>
                        <span style={{marginRight:'5px'}}><span style={{...Star}}>*</span>数据来源 <span>： </span></span>
                        <Select defaultValue="请选择" style={{ width: 120 }} value={data_Source} onChange={setData_Source}>
                            {
                                S_list.map((item,index)=>{
                                    return (<Option value={item.name} key={index}>{item.name}</Option>)
                                })
                            }
                        </Select>
                    </div>
                </div>

            </div>

    </Modal>)
}