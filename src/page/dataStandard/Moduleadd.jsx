import React, { useState ,useEffect,useRef} from 'react';
import {
    Cascader ,
    Tree,
    Input,
    TreeSelect ,
    Modal
} from 'antd';
import HttpService from '../../util/HttpService.jsx';

const { TreeNode } = TreeSelect;
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
        <Input style={{width:'300px'}} value={value} onChange={e=>chang(e.target.value)}/>
      </div>
    )
  }

export default (props)=>{
    const {visible,on,go,isNewCatalog,ModObj,treeData}=props
    const [selCatalogPid,setSelCatalogPid]=useState('请选择');//数据来源
    const [ModName,setModName]=useState('');//模型名称
    useEffect(() => {
        if (null!= ModObj && "" != ModObj) {
            if(isNewCatalog){
                setSelCatalogPid(ModObj.catalog_pid);
                setModName(ModObj.catalog_name);
            }else{
                setSelCatalogPid(ModObj.catalog_id);
                setModName("");
            }
        }
    }, [isNewCatalog,ModObj])
    const ok=()=>{
        go({
            catalog_pid:selCatalogPid,
            catalog_name:ModName,
            catalog_id:isNewCatalog!==false?ModObj.catalog_id:null
        })
        setSelCatalogPid("请选择")
        setModName("")
    }
    const onSelctChange = value => {
        setSelCatalogPid(value);
    }

    return (<Modal 
            title={isNewCatalog!==false?"编辑目录":"新增目录"}
            width='600px'
            cancelText='取消'
            okText='确认'
            visible={visible}
            onOk={()=>ok()}
            onCancel={()=>{
                setModName("")
                on()
            }}
        >
        <div style={{position:"relative"}}>
                <Hinput value={ModName} chang={setModName} ISname={"标准名称"}/>
                <div style={{display:"flex",margin:"10px 0px",height:'30px',alignItems:'center'}}>
                    <span style={{marginRight:'5px'}}><span style={{...Star}}>*</span>选择目录 <span>： </span></span>
                    <TreeSelect
                        style={{ width: '300px' }}
                        value={selCatalogPid}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        treeData={treeData}
                        placeholder="Please select"
                        treeDefaultExpandAll
                        onChange={onSelctChange}
                        
                    />
                </div>

            </div>

    </Modal>)
}