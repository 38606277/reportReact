import React,{useState,useEffect,useRef} from 'react';
import { Form, Input, Table, Button, Card, Select, Pagination, message, Tabs, Divider, Tag ,Layout,Popconfirm,Row} from 'antd';

// const Hinput= (props)=>{
//   const {ISname,value,chang}=props
//   return (
//     <div style={{display:"flex",width:'280px',height:'30px',alignItems:'center'}}>
//       <span style={{flex:'3.5'}}><span style={{...Star}}>*</span>{ISname} <span>： </span></span>
//       <Input style={{flex:'6.5'}} value={value} onChange={e=>chang(e.target.value)}/>
//     </div>
//   )
// }
const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 15 },
};
const inoutStyle={
width:'155px',
marginLeft:'5px'
};
const Star={//红色*样式
marginRight: '4px',
color: '#ff4d4f',
fontSize: '14px',
fontFamily: 'SimSun, sans-serif',
lineHeight: '1'
};
const list=[
  {
    name:'add_1',
    id:'1'
  },
  {
    name:'add_2',
    id:'2'
  },
  {
    name:'add_3',
    id:'3'
  }
]
export default ()=>{
  const [Rdata_library,setRdata_library]=useState([{'value':'my','text':'my'},{'value':'ou','text':'ou'}]);//数据列表
  const [H_module_name,setmoduleName]=useState('')//模型名称
  const [getRlibrary,setRlibrary]=useState('');//数据列表内容
  const [ModName,setModName]=useState('')
  const [H_list,setH_list]=useState('');//获取数据内容
  useEffect(()=>{
    console.log(ModName)
  },[])
  return (
    <Card title='新建模型'>
      <div style={{display:'flow-root',margin:'10px 0'}}>
          <Button type="primary" style={{float:'right'}}  href={"#/dataAsset/newlform"}>新建表</Button>
      </div>
      <Form
          name="horizontal_login" layout="inline"
          >
          <div  style={{
            marginRight:"9px",
            marginBottom:"9px"
          }}>
              <span style={{marginRight:'8px'}}><span style={{...Star}}>*</span>模型名称</span> <span>：</span><Input placeholder="请输入" style={{...inoutStyle, marginLeft:'10px'}} value={H_module_name} onChange={(e)=>setmoduleName(e.target.value)}/>
          </div>
          <div style={{
            marginRight:"9px",
            marginBottom:"9px"
          }}>
            <span style={{marginRight:'8px'}}><span style={{...Star}}>*</span>模型类型</span><span style={{marginLeft:"18px"}}>：</span> 
            <Select defaultValue="请选择" style={{ width: 155,marginLeft:9 }} onChange={setRlibrary}>
                  {
                    Rdata_library.map((item,index)=>{
                      return <Option value={item.value} key={index}>{item.text}</Option>
                  })
                  }
            </Select>
          </div>
          <div style={{
            marginRight:"9px",
            marginBottom:"9px"
          }}>
              <span style={{marginRight:'8px'}}><span style={{...Star}}>*</span>创建人</span><span style={{marginLeft:"18px"}}>：</span><Input placeholder="请输入" style={{...inoutStyle}} value={H_list} onChange={(e)=>setH_list(e.target.value)}/>
          </div>
          <div style={{
            marginRight:"9px",
            marginBottom:"9px"
          }}>
              <span style={{marginRight:'8px'}}><span style={{...Star}}>*</span>创建日期</span><span style={{marginLeft:"18px"}}>：</span><Input placeholder="请输入" style={{...inoutStyle}} value={H_list} onChange={(e)=>setH_list(e.target.value)}/>
          </div>
      </Form>
      <div style={{
            boxSizing:'border-box',
            paddingTop:"10px",
            boxShadow:'5px 5px 5px 5px #eee',
            display:'flow-root',
            
      }}>
        {
          list.map((item,index)=>{
            return(
              <div key={index} style={{
                width:'200px',
                height:'150px',
                boxShadow:'5px 5px 5px 5px #eee',
                margin:'20px',
                float:'left',
                backgroundColor:'rgb(250, 250, 250)',
                textAlign:'center',
                position:'relative',
                boxSizing:'border-box',
                paddingTop:"10px"
                
              }}>
                <div style={{position:'absolute',left:'0',right:'0',zIndex:'999'}}>
                  <Tag color="#f50">修改</Tag>
                  <Tag color="red">删除</Tag>
                  <Tag color="green" >查看</Tag>
                </div>
                <h1 style={{position:'absolute',top:'0',left:'0',right:'0',bottom:'0',lineHeight:'150px',zIndex:"0"}}>{item.name}</h1>
              </div>
            )
          })
        }
      </div>
    </Card>
  )
}