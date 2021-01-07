import React,{useState,useEffect,useRef} from 'react';
import { Form, Input, Table, Button, Card, Select, Pagination, message, Tabs, Divider, Tag ,Layout,Popconfirm,Row,Col,Radio} from 'antd';
const { Option } = Select;
const Hinput= props=>{
  const {ISname,value,chang}=props
  return (
    <div style={{display:"flex",width:'280px',height:'30px',alignItems:'center'}}>
      <span style={{flex:'3.5'}}><span style={{...Star}}>*</span>{ISname} <span>： </span></span>
      <Input style={{flex:'6.5'}} value={value} onChange={e=>chang(e.target.value)}/>
    </div>
  )
}
const Hselect=props=>{
  const {ISname,list,fn}=props
  return(
    <div>
       <span style={{flex:'3.5'}}><span style={{...Star}}>*</span>{ISname} <span>： </span></span>
       <Select style={{flex:'6.5',width:"100px"}} defaultValue='请选择' onChange={fn}>
         {
           list.map((item,index)=>{
              return (
                <Option key={"h"+index} value={item.value}>{item.text}</Option>
              )
           })
         }
       </Select>
    </div>
  )
}
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
    key:1,
    name:'add_1',
    id:'1'
  },
  {
    key:2,
    name:'add_2',
    id:'2'
  },
  {
    key:3,
    name:'add_3',
    id:'3'
  }
]
const columns =[
  {
    title:"表名",
    dataIndex: 'name',
    key: 'name',
  },
  {
    title:"id",
    dataIndex: 'id',
    key: 'id',
  },
  {
    title:"操作",
    dataIndex:'x',
    render:res=>{
      return(
        <div>
          <Tag color="#f50">修改</Tag>
          <Tag color="red">删除</Tag>
        </div>
      )
    }
  }
]
export default ()=>{
  const [data_Source,setData_Source]=useState('')//数据来源
  const [ModName,setModName]=useState('')//模型名称
  const [data_Class,setData_Class]=useState('')//数据类型
  const [format,setformat]=useState(true)
  useEffect(()=>{
    // console.log(ModName)
  },[])
  const formlist=[
    {
      type:"select",
      text:"数据来源",
      list:[
        {
          text:"fn",
          value:"fn"
        }
      ],
      value:data_Source,
      fn:setData_Source
    },
    {
      type:"select",
      text:"数据类型",
      list:[
        {
          text:"mysql",
          value:"mysql"
        }
      ],
      value:data_Class,
      fn:setData_Class
    },
    {
      type:"input",
      text:"模型名称",
      value:ModName,
      fn:setModName
    }
  ]
  return (
    <Card title='新建模型'>
      <div style={{display:'flow-root',margin:'10px 0'}}>
          <div style={{float:'left'}}>
            {
              formlist.map((item,index)=>{
                return (
                  <div key={index} style={{margin:"10px 0"}}>
                    {
                      item.type==='input'?<Hinput value={item.value} chang={item.fn} ISname={item.text}/>:<Hselect list={item.list} chang={item.fn} ISname={item.text}/>
                    }
                  </div>
                )
              })
            }
          </div>
          <Button type="primary" style={{float:'right',marginTop:"100px"}}  href={"#/dataAsset/newlform"}>保存</Button>
      </div>
      <Card bodyStyle={{ padding: "8px", backgroundColor: '#fafafa' }}>
        <Row>
            <Col xs={24} sm={24}>
                <Radio.Group style={{ float: "right", marginRight: "30px" }}  defaultValue="list" buttonStyle="solid">
                    <Radio.Button value="list" onClick={()=>setformat(true)}>列表</Radio.Button>
                    <Radio.Button value="column" onClick={()=>setformat(false)}>模型</Radio.Button>
                    {
                      format?<Radio.Button value="list">添加</Radio.Button>:null
                    }
                </Radio.Group>
            </Col>
        </Row>
      </Card>
      {
        format?<Table 
          columns={columns}
          dataSource={list}
          title={()=>{
            return(
              <div>添加</div>
            )
          }}
        ></Table>:null
      }
      {/* <div style={{
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
                </div>
                <h1 style={{position:'absolute',top:'0',left:'0',right:'0',bottom:'0',lineHeight:'150px',zIndex:"0"}}>{item.name}</h1>
              </div>
            )
          })
        }
      </div> */}
    </Card>
  )
}