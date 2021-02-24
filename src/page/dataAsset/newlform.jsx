import React,{useState,useEffect,useRef} from 'react'
import { Form, Input, Table, Button, Card, Col,Select, Radio,Pagination, message, Modal} from 'antd';
import { PageContainer} from '@ant-design/pro-layout';
import {PlusOutlined,MinusOutlined} from '@ant-design/icons'
import ProCard from '@ant-design/pro-card';
import TableForm from './FieldFrom/TableForm.jsx';
import TableForm2 from './FieldFrom/TableForm2.jsx'
import HttpService from '../../util/HttpService.jsx';
import { List } from 'antd/es/form/Form';
import { resolveOnChange } from 'antd/lib/input/Input';
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
  const {ISname,value,chang,i}=props
  return (
    <div style={{display:"flex",width:'250px',height:'30px',alignItems:'center'}}>
      <span style={{marginRight:'5px'}}><span style={{...Star}}>{i?null:"*"}</span>{ISname} <span>： </span></span>
      <Input bordered={chang?true:false}  disabled={chang?null:"disabled"} style={{width:'150px'}} value={value} onChange={chang?e=>chang(e.target.value):null}/>
    </div>
  )
}

export default (props)=>{
  const {module_id,isModalVisible,handleOk,handleCancel,getTableList}=props
  useEffect(()=>{
    const path=module_id;
    if(module_id){
    (async ()=>{
      await HttpService.post('/reportServer/bdModel/getModelById', JSON.stringify({model_id:path[0]==="L"?path.split("&")[1]:path.slice(1)})).then(res => {
        if (res.resultCode == "1000") {
          if(res.data.db_type){
            setdb_type(res.data.db_type)
          }
          console.log(res.data)
          setmodel(res.data)
        }
        else {
            message.error(res.message);
        }
    })
      // 
    })();
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
    setPath(module_id[0]==="L"?module_id.split("&"):module_id.slice(1));
  }

  },[path,formName,model,list,list2,Type,module_id])
    //栏位
    const [path,setPath]=useState('');
    const [model,setmodel]=useState({})
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
    const [Type,setType]=useState(false)
    const [s,sets]=useState('失败')
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
      setType(false)
      setList2("失败")
      setList("失败")
    }
    // {conosle.log(module_id)}
    const ok=()=>{
      if(formName===""){
        return  message.error("请填写表名");
      }
      mainForm.submit()
      mainForm2.submit()
      setType(true)
      setPath("")
      console.log(s)
      
    }
    const no=()=>{
      const id=path  instanceof Array?path[1]:path
      getTableList(1,10,"","",id)
      setPath("")
      setformName("")
      setnotes("")
      setTableData([])
      setTableData2([])
      setType(false)
      setformText('xxx1')
      // console.log(11)
      handleCancel()
    }
    const  baocun =()=>{
      const mypath =module_id[0]==="L"?module_id.split("&"):module_id.slice(1)
      console.log(mypath)
      HttpService.post('/reportServer/bdModelTableColumn/table/createModelTable', JSON.stringify({model_id:mypath[0]!=="X"?mypath:mypath[1],table_name:formName,table_title:notes,table_id:mypath[0]!=="X"?"":mypath[0].slice(1),columnlist:[...tableData],linkList:[...tableData2],deleteColumnList:[],deleteTableLinkList:[],dbtype_id:model.db_type,source_id:"",host_id:model.db_source,url:'url'})).then(res => {
        if (res.resultCode == "1000") {   
            HttpService.post('/reportServer/bdModel/getAllList', null).then(res => {
                if (res.resultCode == "1000") {
                  const id=mypath[0]!=="X"?mypath:mypath[1]
                  message.success('保存成功');
                  // console.log(res)
                  getTableList(1,10,"","",id)
                  setformName("")
                  setnotes("")
                  setTableData([])
                  setTableData2([])
                  setType(false)
                  setformText('xxx1')
                  handleOk()
                  sets('成功')
                  // props.history.push('/dataAsset/modelList')
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
    }
    return(
    
      <Modal width={1200} title={module_id[0]==="X"?"新建表":"编辑表"} visible={isModalVisible} onOk={()=>ok()} onCancel={()=>no()} destroyOnClose={true}>
        <Card 
   
        >
                 
            {/* {
             (()=>{
            
              if(list==="成功"&&list2==="成功"&&Type){
                // if(db_type==="hive"){
                //   HttpService.post('/reportServer/dataModeling/createModelTable', JSON.stringify({model_id:path[0][0]==="L"?path[1]:path,table_name:formName,table_title:notes,table_id:path[0][0]==="L"?path[0].slice(1):"",columnlist:[...tableData],linkList:[...tableData2],deleteColumnList:[],deleteTableLinkList:[]})).then(res => {
                //     if (res.resultCode == "1000") {   
                //       console.log(resolveOnChange)
                //         // HttpService.post('/reportServer/bdModel/createHiveTable', null).then(res => {
                //         //     if (res.resultCode == "1000") {
                //         //       message.success('保存成功');
                //         //       // console.log(res)
                //         //       getTableList(1,10,"","",id)
                //         //       setformName("")
                //         //       setnotes("")
                //         //       setTableData([])
                //         //       setTableData2([])
                //         //       setType(false)
                //         //       handleOk()
                //         //       // props.history.push('/dataAsset/modelList')
                //         //     }
                //         //     else {
                //         //         message.error(res.message);
                //         //     }
                //         // })
                //     }
                //     else {
                //         message.error(res.message);
                //     }
                //   })
                // }
                //
                sets('成功')
                return
              
              }
             })()
            } */}
          <Form 
                   name="horizontal_login" layout="inline"
              > 
            <Hinput ISname={"模型名称"} value={model.model_name}/>  
            <Hinput ISname={"表名"} value={formName} chang={setformName}/>
            <Hinput ISname={"注释"} value={notes} chang={setnotes} i={true}/>                 
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
                  setType(false)
                  setList2("失败")
                  setList("失败")
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
                      baocun()
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
                      baocun()
                      setList2("成功")
                    }) .catch(errorInfo => {
                      //验证失败
                      setList2("失败")
                      // message.error('保存失败您还有未填写内容');
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
        </Modal >
    )
}