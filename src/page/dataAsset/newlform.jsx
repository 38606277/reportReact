import React,{useState,useEffect,useRef} from 'react'
import { Form, Input, Table, Button, Card, Col,Select, Radio,Pagination, message, Tabs, Divider, Tag ,Layout,Popconfirm,Row,InputNumber,Checkbox} from 'antd';
import { PageContainer} from '@ant-design/pro-layout';
import {PlusOutlined,MinusOutlined} from '@ant-design/icons'
import ProCard from '@ant-design/pro-card';
import TableForm from './FieldFrom/TableForm';
import TableForm2 from './FieldFrom/TableForm2'
import HttpService from '../../util/HttpService.jsx';
import { List } from 'antd/es/form/Form';
// import ModuleTable from './ModuleTable'
const Star={//红色*样式
  marginRight: '4px',
  color: '#ff4d4f',
  fontSize: '14px',
  fontFamily: 'SimSun, sans-serif',
  lineHeight: '1'
  };
const titleList=[
    {
        title:"列",
        value:'xxx1'
    },
    {
        title:"关系",
        value:'xxx3'
    },
    {
        title:"预览",
        value:'xxx6'
    },
]
const Hinput= props=>{
  const {ISname,value,chang}=props
  return (
    <div style={{display:"flex",width:'250px',height:'30px',alignItems:'center'}}>
      <span style={{marginRight:'5px'}}><span style={{...Star}}>*</span>{ISname} <span>： </span></span>
      <Input bordered={chang?true:false}  disabled={chang?null:"disabled"} style={{width:'150px'}} value={value} onChange={chang?e=>chang(e.target.value):null}/>
    </div>
  )
}

export default (props)=>{
  useEffect(()=>{
    const path=props.match.params.module_id
    if(path[0]==="L"){
      const path2 =path.split("&");
      (async()=>{
        await HttpService.post('/reportServer/bdModelTableColumn/table/getModelTableById', JSON.stringify({table_id:path2[0].slice(1)})).then(res => {
          if (res.resultCode == "1000") {
                    let tableLink=res.data.tableLink.length>0?res.data.tableLink.map(item=>{
                      return {
                        ...item,
                        id: `xxx3NEW${(Math.random() * 1000000).toFixed(0)}`,
                        dict_id:mainForm2.getFieldValue('dict_id'),
                        editable: true,
                        isNew: true,
                      }
                    }):[]
                    let column =res.data.column.map(item=>{
                      return {
                        ...item,
                        id: `xxx1NEW${(Math.random() * 1000000).toFixed(0)}`,
                        dict_id:mainForm.getFieldValue('dict_id'),
                        editable: true,
                        isNew: true,
                      }
                    })
                    setistableLink(tableLink)
                    setiscolumn(column)
                    setformName(res.data.table.table_name)
                    setnotes(res.data.table.table_title)
                    tableRef.current.initData(column)
                    tableRef2.current.initData(tableLink)
          }
          else {
              message.error(res.message);
          }
      })
      })()
    }
    setPath(path[0]==="L"?path.split("&"):path.slice(1));
    (async ()=>{
      
      await HttpService.post('/reportServer/bdModel/getModelById', JSON.stringify({model_id:path[0]==="L"?path.split("&")[1]:path.slice(1)})).then(res => {
        if (res.resultCode == "1000") {
          console.log(res)

          setdb_type(res.data.db_type)
          setmodel_name(res.data.model_name)
        }
        else {
            message.error(res.message);
        }
    })
      // 
    })()
    console.log("list改变了",list)
  },[path,formName,model_name])
    //栏位
    const [path,setPath]=useState('');
    const [model_name,setmodel_name]=useState('')
    const [formtext,setformText]=useState('xxx1')
    const [formName,setformName]=useState('')//表名
    const [notes,setnotes]=useState('')//注释
    const [tableForm] = Form.useForm();
    const [list,setList]=useState("成功")
    const [mainForm] = Form.useForm();
    const tableRef = useRef();
    const [tableData, setTableData] = useState([]);
    const [displayType, setDisplayType] = useState('list');
    const [index,setIndex]=useState(0)
    const [db_type,setdb_type]=useState("")
    //编辑 记录俩表变化

    const [istableLink,setistableLink]=useState([]) 
    const [iscolumn,setiscolumn]=useState([]) 
    //关系
    const [tableForm2] = Form.useForm();
    const [list2,setList2]=useState("成功")
    const [mainForm2] = Form.useForm();
    const tableRef2 = useRef();
    const [tableData2, setTableData2] = useState([]);
    const [displayType2, setDisplayType2] = useState('list');
    const obj={
        "xxx1":mainForm,
        "xxx3":mainForm2
      }
    const addList=formtext=>{
      let arr={
        "xxx1":tableRef,
        "xxx3":tableRef2
      }
      setIndex(2)
      arr[formtext].current.addItem({
        id: `${formtext}${(Math.random() * 1000000).toFixed(0)}`,
        dict_id:obj[formtext].getFieldValue('dict_id'),
        column_name:"",
        editable: true,
        isNew: true,
      });
    }
    const add=()=>{
      console.log("我是点击的list",list)
    }
    return(
        <Card  title={props.match.params.module_id[0]==="X"?"新建列表":"编辑列表"} extra={
          <div>
              {             console.log(list)}
            <Button type="primary" href="/#/dataAsset/modelList" style={{right:"50px"}}>返回</Button>
            <Button type="primary" onClick={() =>{
               mainForm.submit()
            //  await add()
              if(formName===""){
                return  message.error("请填写表名");
              }
              if(notes===""){
                return message.error("请填写注释");
              }
              
              // if(Rindex!==tableData2.length){
              //   return message.error("关系您还有未填写内容");
              // }
              // if(tableData.length>0){
              //   tableData.forEach((item,index)=>{
              //     for(let i in item){
              //       console.log(i)
              //     }
              //   })
              // }
              // console.log(tableData)
              // let deleteColumnList =tableData.length>0?tableData.map(item=>{
              //     return item.column_name
              // }):[]
              // let deleteTableLinkList =tableData2.length>0?tableData2.map(item=>{
              //   return item.column_name
              //  }):[]
              // console.log(deleteColumnList)
              HttpService.post('/reportServer/bdModelTableColumn/table/createModelTable', JSON.stringify({model_id:path[0][0]==="L"?path[1]:path,table_name:formName,table_title:notes,table_id:path[0][0]==="L"?path[0].slice(1):"",columnlist:[...tableData],linkList:[...tableData2],deleteColumnList:[],deleteTableLinkList:[]})).then(res => {
                console.log(res)
                if (res.resultCode == "1000") {   
                    HttpService.post('/reportServer/bdModel/getAllList', null).then(res => {
                        if (res.resultCode == "1000") {
                          message.success('保存成功');
                          // console.log(res)
                          props.history.push('/dataAsset/modelList')
                        }
                        else {
                            message.error(res.message);
                        }
                    })
                }
                else {
                    message.error(res.message);
                }
              })
              // console.log(tableData)
            }}>保存</Button>
          </div>
        }>
          <Form 
                   name="horizontal_login" layout="inline"
              > 
            <Hinput ISname={"模型名称"} value={model_name}/>  
            <Hinput ISname={"表名"} value={formName} chang={setformName}/>
            <Hinput ISname={"注释"} value={notes} chang={setnotes}/>                 
          </Form>
            
            <div style={{display:'flow-root',backgroundColor: 'rgb(250, 250, 250)',margin:"20px 0"}}>
                <div style={{float:'left'}}>
                    <Radio.Group style={{ float: "left", marginRight: "30px" }}  defaultValue={titleList[0].value} buttonStyle="solid">
                        {
                            titleList.map((item,index)=>{
                                return (<Radio.Button value={item.value} key={index} onClick={()=>{setformText(item.value)}}>{item.title}</Radio.Button>)
                            })
                        }
                    </Radio.Group>
                </div>
                <div style={{float:"right"}}>
                
                <Button
                    style={{
                      marginRight:"10px"
                    }}
                   icon={<PlusOutlined />}
                   onClick={() => { addList(formtext)
                    //新增一行
                  }}
                ></Button>
                <Button
                icon={<MinusOutlined />}
                onClick={() => {
                  //删除选中项orm
                  if(formtext==="xxx1"){
                    return tableRef.current.removeRows()
                  }else if(formtext==="xxx3"){
                    return tableRef2.current.removeRows()
                  }
                }}
                ></Button>
                </div>
            </div>
            <div>
            <Form
                style={{
                  display:formtext==="xxx1"?"block":"none"
                }}
                form={mainForm}
                onFinish={(values) => {
                  //验证tableForm
                    tableForm.validateFields()
                    .then(() => {
                      //验证成功
                      let postData={
                        ...values,
                        lineForm:tableData,
                        lineDelete:tableRef.current.getDeleteData()
                      }
                      setList("成功")
                    }) .catch(errorInfo => {
                      //验证失败
                      setList("失败")
                      message.error('保存失败您还有未填写内容');
                    });

                    tableForm.validateFields()
                    .then(() => {
                      //验证成功
                      let postData={
                        ...values,
                        lineForm:tableData,
                        lineDelete:tableRef.current.getDeleteData()
                      }
                      setList("成功")
                      setList("成功")
                    }) .catch(errorInfo => {
                      //验证失败
                      setList("失败")
                      message.error('保存失败您还有未填写内容');
                    });
                  
                }} >

                {/* <ProCard
                > */}
                  {displayType=='list'?
                    <TableForm
                      ref={tableRef}
                      primaryKey='id' 
                      value={tableData}
                      formName={formName}
                      db_type={db_type}
                      onChange={(newTableData) => {
                        //onChange实时回调最新的TableData 
                        //手动获取方式 tableRef.current.getTableData()，可以节省onChange方法
                        setTableData(newTableData);
                      }} 
                      tableForm={tableForm} />
                    :<TreeTableForm
                      ref={tableRef} 
                      primaryKey='id' 
                      value={tableData}
                      onChange={(newTableData) => {
                        //onChange实时回调最新的TableData 
                        //手动获取方式 tableRef.current.getTableData()，可以节省onChange方法
                        setTableData(newTableData);
                      }} 
                      tableForm={tableForm} /> 
                  }
                {/* </ProCard> */}
              </Form>
            {/* <Form
                style={{
                  display:formtext==="xxx1"?"block":"none"
                }}
                
                onFinish={async (values) => {
                  //验证tableForm
                  tableForm.validateFields()
                    .then(() => {
                      //验证成功
                      let postData={
                        ...values,
                        lineForm:tableData,
                        lineDelete:tableRef.current.getDeleteData()
                      }
                         setList(postData)
                    })
                  
                }} >

                <ProCard
                >
                  {displayType=='list'?
                    <TableForm
                      form={mainForm}
                      ref={tableRef}
                      primaryKey='id' 
                      value={tableData}
                      onChange={(newTableData) => {
                        //onChange实时回调最新的TableData 
                        //手动获取方式 tableRef.current.getTableData()，可以节省onChange方法
                        setTableData(newTableData);
                      }} 
                      tableForm={tableForm} />
                    :<TreeTableForm
                      ref={tableRef} 
                      primaryKey='id' 
                      value={tableData}
                      onChange={(newTableData) => {
                        //onChange实时回调最新的TableData 
                        //手动获取方式 tableRef.current.getTableData()，可以节省onChange方法
                        setTableData(newTableData);
                      }} 
                      tableForm={tableForm} /> 
                  }
                </ProCard>
              </Form> */}
              <Form
                style={{
                  display:formtext==="xxx3"?"block":"none"
                }}
                form={mainForm2}
                onFinish={async (values) => {
                  //验证tableForm
                  tableForm2.validateFields()
                    .then(() => {
                      //验证成功
                      let postData={
                        ...values,
                        lineForm:tableData2,
                        lineDelete:tableRef2.current.getDeleteData()
                      }
                      setList2("成功")
                    }) .catch(errorInfo => {
                      //验证失败
                      setList2("失败")
                      message.error('保存失败您还有未填写内容');
                    });
                  
                }} >

                {/* <ProCard
                > */}
                  {displayType2=='list'?
                    <TableForm2
                      ref={tableRef2}
                      primaryKey='id' 
                      value={tableData2}
                      formName={formName}
                      setformName={setformName}
                      onChange={(newTableData) => {
                        //onChange实时回调最新的TableData 
                        //手动获取方式 tableRef.current.getTableData()，可以节省onChange方法
                        setTableData2(newTableData);
                      }} 
                      tableForm={tableForm2} />
                    :<TreeTableForm2
                      ref={tableRef2} 
                      primaryKey='id' 
                      value={tableData2}
                      onChange={(newTableData) => {
                        //onChange实时回调最新的TableData 
                        //手动获取方式 tableRef.current.getTableData()，可以节省onChange方法
                        setTableData2(newTableData);
                      }} 
                      tableForm={tableForm2} /> 
                  }
                {/* </ProCard> */}
              </Form>
              {/* <></> */}
            </div>
            {/* <EditOut></EditOut> */}
        </Card>
    )
}