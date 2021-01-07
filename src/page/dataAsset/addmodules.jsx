import React,{useState,useEffect,useRef} from 'react';
import { Form, Input, Table, Button, Card, Select, Pagination, message, Tabs, Divider, Tag ,Layout,Popconfirm,Row,Col,Radio,Modal} from 'antd';
const { Option } = Select;
import NewFrom from './newlform'
import './addmodules.scss'
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
    <div style={{display:"flex",width:'280px',height:'30px',alignItems:'center'}}>
      <span style={{marginRight:'5px'}}><span style={{...Star}}>*</span>{ISname} <span>： </span></span>
      <Input style={{width:'130px'}} value={value} onChange={e=>chang(e.target.value)}/>
    </div>
  )
}
const Hselect=props=>{
  const {ISname,list,fn}=props
  return(
    <div>
       <span style={{marginRight:'1px'}}><span style={{...Star}}>*</span>{ISname} <span>： </span></span>
       <Select style={{width:'130px'}} defaultValue='请选择' onChange={fn}>
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

const inoutStyle={
width:'155px',
marginLeft:'5px'
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
          <Tag color="blue">修改</Tag>
          <Tag color="red">删除</Tag>
        </div>
      )
    }
  }
]
export default ()=>{
  const [data_Source,setData_Source]=useState('');//数据来源
  const [ModName,setModName]=useState('');//模型名称
  const [data_Class,setData_Class]=useState('');//数据类型
  const [visible, setVisible] = useState(false);//弹框
  const [format,setformat]=useState(true);
  useEffect(()=>{
    // console.log(ModName)
  },[]);
  const formlist=[
    {
      type:"input",
      text:"模型名称",
      value:ModName,
      fn:setModName
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
  ];
  return (
    <Card title='新建模型'>
      <div style={{display:'flow-root',margin:'10px 0'}}>
          <div style={{float:'left'}}>
            {
              formlist.map((item,index)=>{
                return (
                  <div key={index} style={{margin:"10px 20px",display:item.type==='input'?null:"inline-block"}}>
                    {
                      item.type==='input'?<Hinput value={item.value} chang={item.fn} ISname={item.text}/>:<Hselect list={item.list} chang={item.fn} ISname={item.text}/>
                    }
                  </div>
                )
              })
            }
          </div>
          <Col xs={24} sm={24}>
                <Button style={{float:'right'}}>保存</Button>
                <Radio.Group style={{ float: "right", marginRight: "-66px" ,marginTop:"100px"}}  defaultValue="list" buttonStyle="solid">
                    <Radio.Button value="list" onClick={()=>setformat(true)}>列表</Radio.Button>
                    <Radio.Button value="column" style={{marginRight:!format?"84px":"20px"}} onClick={()=>setformat(false)}>模型</Radio.Button>
                    {
                      format?<Button onClick={()=>setVisible(true)}>添加</Button>:null
                    }
                </Radio.Group>
            </Col>
      </div>
      {
        format?<Table 
          columns={columns}
          dataSource={list}
        ></Table>:
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
                  </div>
                  <h1 style={{position:'absolute',top:'0',left:'0',right:'0',bottom:'0',lineHeight:'150px',zIndex:"0"}}>{item.name}</h1>
                </div>
              )
            })
          }
          <div 
          id="H_add"
          >+
            <Tag color="gold"
            id="H_text"
            >新建表格</Tag>
          </div>
        </div>
      }
     


      <Modal
          title="新建表格"
          centered
          visible={visible}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
          width={1000}
        >
          <NewFrom />
      </Modal>
    </Card>
  )
}