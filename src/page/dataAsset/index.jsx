import React,{useState,useEffect,useRef} from 'react';
import { Form, Input, Table, Button, Card, Select, Pagination, message, Tabs, Divider, Tag ,Layout,Popconfirm} from 'antd';
import HttpService from '../../util/HttpService';
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
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const columns = [
  {
    title: 'fieldName',
    dataIndex: 'fieldName',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'fieldType',
    dataIndex: 'fieldType',
  }
];
const reme=(res,G_data_source,setG_data_source)=>{
  let arr =G_data_source.filter(item=>{
    if(item.key!==res.key){
      return item
    }
  })
  setG_data_source([...arr])
  console.log(arr)
}
export default ()=>{
    const [editingKey, setEditingKey] = useState('');
    const [form] = Form.useForm();
    const [source,setsource]=useState({});//记录账号和密码 +数据来源标记
    const [data_source,setdata_source]=useState([]);//来源
    const [selectedRowKeys,setselectedRowKeys]=useState([]);//控制1表选中
    const [arr,setarr]=useState([]);//整合选中信息
    const [data_library,setdata_library]=useState([]);//数据库
    const [data_list,setdata_list]=useState([]);//数据表
    const [selectionType, setSelectionType] = useState('checkbox');//表
    const [G_data_source,setG_data_source]=useState([]);//已建模表
    const [mylist,setmylist]=useState([]);
    const [user,setuser]=useState(true);
    const [librarystr,setlibrarystr]=useState('');//获取数据库字段
    const [liststr,setliststr]=useState('')//获取数据表字段
    const [tableList,settableList]=useState([])//左侧记录
    const Hcenter=useRef();//中间dom
    const Hbtn=useRef();//中间蓝色按钮
    const letTable=useRef();///左侧dom
    const [recordSelect,setrecordSelect]=useState([]);//单选框选中数据
    //右侧变量
    const [Rdata_library,setRdata_library]=useState([{'value':'my','text':'my'},{'value':'ou','text':'ou'}]);//数据列表
    const [H_module_name,setmoduleName]=useState('')//模型名称
    // const [getRsource,setRsource]=useState('');//数据来源内容
    const [getRlibrary,setRlibrary]=useState('');//数据列表内容
    const [H_list,setH_list]=useState('');//获取数据内容
    useEffect(()=>{
        if(user){
            let mysource=async()=>{
                let n= await HttpService.post('/reportServer/dataModeling/getjdbcUrl', JSON.stringify({})).then(res=>{
                    let arr =res.map(item=>{
                        return {
                            value:JSON.stringify(item),
                            text:item.datasourename
                        }
                    });
                    setuser(false);
                    setdata_source(arr);
                  })
            }
            mysource();
        }
        Hcenter.current.style.paddingTop=letTable.current.clientHeight/2-Hbtn.current.clientHeight+'px';//动态改变按钮高度
    },[source,mylist,user,G_data_source]);
    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            setrecordSelect([...selectedRows])
            // setrecordSelect(selectedRowKeys)
            setarr(selectedRows);
            setselectedRowKeys(selectedRowKeys);
        },
      };
    const  go =()=>{
      let my=arr.map(item=>{
        return {
          ...item,
          dbName:librarystr,
          leftTableName:liststr
        }
      })
      settableList(Array.from(new Set([...tableList,...my])))
      setselectedRowKeys([])
      setG_data_source(Array.from(new Set([...G_data_source,...arr])));
      setarr([])
      }
    const onsetsource= e =>{//左侧数据源change事件
      let obj={
        jdbcurl:JSON.parse(e).url, 
        username:JSON.parse(e).username,
        password:JSON.parse(e).password
      };  
      setsource(obj);
      HttpService.post('/reportServer/dataModeling/getDatabaseList',JSON.stringify(obj)).then(res=>{
          setmylist([])
          setdata_list([])
          setselectedRowKeys([])
          let arr=res.map(item=>{
            return{
              value:item,
              text:item
            }
          });
          setdata_library(arr);
      })
    }
    const onsetlibrary= e =>{//左侧数据库change事件 
      let obj={
        url:source.jdbcurl,
        user:source.username,
        password:source.password,
        dbName:e
      };
      console.log(obj)
      setlibrarystr(e)
      HttpService.post('/reportServer/dataModeling/getTableNamesByDbname',JSON.stringify(obj)).then(res=>{
        let arr=res.map(item=>{
          return{
            value:item,
            text:item
          }
        });
        setselectedRowKeys([])
        setdata_list(arr)
        setmylist([])//重新选择清空左侧列表 
      });
    };
    const onsetdata_lists= e =>{//左侧数据表change事件
      setliststr(e)
      console.log(e)
      HttpService.post('/reportServer/dataModeling/getStructureByTableName',JSON.stringify({
        url:"jdbc:mysql://192.168.206.49:3306/"+librarystr+"?characterEncoding=UTF-8&serverTimezone=Asia/Shanghai&useSSL=false&useUnicode=true&autoReconnect=true", 
        username: "appuser",
        password: "123456",
        dbName: librarystr,
        tableName:e
      })).then(res=>{
        let arr=res.map((item,index)=>{
          return{
            ...item,
            'key':index
          }
        });
        setselectedRowKeys([])
        setmylist([...arr]);
      });
    };
    //提交建模内容
    const Submit = () =>{
      let myarr=JSON.parse(JSON.stringify(G_data_source))
      let MJSON=myarr.map(item=>{
        delete item.key
        return {
          ...item
        }
      })
      setselectedRowKeys([])
      let mydata={
          leftTableFields:JSON.stringify([...tableList]),
          tableName: H_list,
          tableFields:JSON.stringify([...MJSON])
      }
      HttpService.post('/reportServer/dataModeling/createNewTable2',JSON.stringify(mydata)).then(res=>{
        message.success('采集完成')
      })
      //非空校验
      // let obj={
      //   0:'请选择数据源',
      //   1:'请选择数据库',
      //   2:'请填写数据表'
      // };
      // let arr1=[getRsource,getRlibrary,H_list];
      // let index=arr1.indexOf('');
      // if(obj[index]){
      //   message.error(obj[index])
      //   return
      // };
    }
    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
      // console.log(record)
      form.setFieldsValue({
        title: '',
        dataIndex: '',
        ...record,
      });
      setEditingKey(record.key);
    };
  
    const cancel =async (record) => {
      let key=record.key
       try {
        const row = await form.validateFields();//获取当前三个input中的数据
        console.log(row)
        const newData = [...G_data_source];
        const index = newData.findIndex((item) => key === item.key);
  
        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, { ...item, ...row });
          setG_data_source(newData);
          setEditingKey('');
        } else {
          // newData.push(row);
          setG_data_source(newData);
          setEditingKey('');
        }
      } catch (errInfo) {
        console.log('Validate Failed:', errInfo);
      }
    };
  
    const save =  () => {
      setEditingKey('');
     
    };
  
    const colimnsR = [
      {
        title: 'fieldName',
        dataIndex: 'fieldName',
        width: '25%',
        editable: true,
      },
      {
        title: 'fieldType',
        dataIndex: 'fieldType',
        width: '15%',
        editable: true,
      },  
      {
        title: '操作',
        dataIndex: 'x',
        render: (_, res) => {
          const editable = isEditing(res)
          if(!isNaN(res.key)){
            return (<Tag color="#108ee9" onClick={()=>{
              let arr=G_data_source.filter(item=>{
                return item.fieldName!==res.fieldName
              })
              let sele=arr.map(item=>{
               return item.key
              })
              setG_data_source(arr)
              setselectedRowKeys(sele)
            }}>取消</Tag>)
          }else{
            return editable?(
              <div>
                <Tag onClick={()=>cancel(res)}>确定</Tag>
              </div>
            ):(<div>
              <Tag onClick={()=>reme(res,G_data_source,setG_data_source)}>删除</Tag>
              <Tag onClick={()=>edit(res)}>修改</Tag>
            </div>)
          }          
        },
      },
    ];
    const mergedColumns = colimnsR.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record) => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }),
      };
    });
    const addGlist=()=>{
      let str=''
      for(let i=0;i<26;i++){    
        str+=String.fromCharCode(65+i)+String.fromCharCode(97+i)+i
      }
      let n=Math.floor(Math.random()*str.length-1)
      let z=Math.floor(Math.random()*str.length-1)
      // console.log(G_data_source)
      if(G_data_source.length>0){
        let fieldNametext =G_data_source[G_data_source.length-1].fieldName
        let fieldTypetext =G_data_source[G_data_source.length-1].fieldType
        let obj={
          0:'请填写fieldName',
          1:'请填写fieldType'
        }
        let arr=[fieldNametext,fieldTypetext]
        if(obj[arr.indexOf('')]){
          message.warning(obj[arr.indexOf('')])
          return
        }
        console.log(fieldNametext,fieldTypetext)
        G_data_source.push({fieldName:'',fieldType:"",key:G_data_source.length+'H'})
        setG_data_source([...G_data_source])
        edit(G_data_source[G_data_source.length-1]) 
      }else{
        let arr=[{fieldName:'',fieldType:"",key:G_data_source.length+'H'+str[n]+str[z]}]
        setG_data_source(arr)
        edit(arr[0])
      }
    }
    return(
        <div>
            <Card title='数据采集' style={{display:'flow-root'}}>
              <Form
              name="horizontal_lo2" layout="inline"
              >
                 <div style={{width:'45%',float:'left'}} ref={letTable}>
                    <Table
                        rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                        }}
                        
                        pagination={mylist.length>10?true:false}
                        columns={columns}
                        dataSource={mylist}
                        size='small'
                        bordered={true} 
                        title={()=>{//左侧表头
                          return <div>
                                    <div style={{textAlign:'center',padding:"10px 0 20px 0"}} >选择数据库</div>
                                    <Form
                                      name="horizontal_login" layout="inline"
                                      >
                                      <Form.Item
                                              style={
                                                {
                                                  marginBottom:'10px'
                                                }
                                              }
                                              {...layout}
                                              label="数据源"
                                              name="basic"
                                              initialValues={{ remember: true }}
                                              rules={[{ required: true}]}
                                          >
                                          <Select defaultValue="请选择" style={{ width: 155,marginLeft:7 }} onChange={onsetsource}>
                                              {
                                              data_source.map((item,index)=>{
                                                  return <Option value={item.value} key={index}>{item.text}</Option>
                                              })
                                              }
                                          </Select>
                                      </Form.Item>
                                      <Form.Item
                                              {...layout}
                                              label="数据库"
                                              name="basic2"
                                              initialValues={{ remember: true }}
                                              rules={[{ required: true}]}
                                              style={{marginBottom:'9px'}}
                                          >
                                          <Select defaultValue="请选择" style={{ width: 155,marginLeft:7 }} onChange={onsetlibrary}>
                                              {
                                              data_library.map((item,index)=>{
                                                  return <Option value={item.value} key={index}>{item.text}</Option>
                                              })
                                              }
                                              </Select>
                                      </Form.Item>
                                      <Form.Item
                                              {...layout}
                                              label="数据表"
                                              name="basic3"
                                              initialValues={{ remember: true }}
                                              rules={[{ required: true}]}
                                          >
                                          <Select defaultValue="请选择" style={{ width: 155,marginLeft:7 }} onChange={onsetdata_lists}>
                                              {
                                              data_list.map((item,index)=>{
                                                  return <Option value={item.value} key={index}>{item.text}</Option>
                                              })
                                              }
                                              </Select>
                                      </Form.Item>
                                  </Form>
                          </div>
                        }}
                    />
                </div>
                <div style={{paddingTop:'130px',paddingLeft:'20px',paddingRight:'20px'}} ref={Hcenter}><Button type="primary" onClick={()=>go()} ref={Hbtn}>→</Button></div>
                <div style={{width:'45%',float:'right'}}>
                  <Form form={form} component={false}>
                  <Table
                     components={{
                      body: {
                        cell: EditableCell,
                      },
                      }}
                      bordered
                      rowClassName="editable-row"
                      pagination={{
                        onChange: cancel,
                      }}
                      dataSource={G_data_source} 
                      columns={mergedColumns} 
                      pagination={G_data_source.length>10?true:false} 
                      rowClassName="editable-row"
                      title={() => {//右侧表头
                        return <div>
                          <div style={{textAlign:'center',padding:"10px 0 20px 0"}} >采集</div>
                          <Form
                              name="horizontal_login" layout="inline"
                              >
                              <div  style={{
                                marginRight:"9px",
                                marginBottom:"9px"
                              }}>
                                  <span style={{marginRight:'8px'}}><span style={{...Star}}>*</span>模型名称</span> <span>：</span><Input placeholder="请输入" style={{...inoutStyle, marginLeft:'10px'}} value={H_module_name} onChange={(e)=>setmoduleName(e.target.value)}/>
                              </div>
                              <div style={{marginBottom:"9px"}}>
                               <span style={{marginRight:'8px'}}><span style={{...Star}}>*</span>数据库</span><span style={{marginLeft:"18px"}}>：</span> 
                               <Select defaultValue="请选择" style={{ width: 155,marginLeft:9 }} onChange={setRlibrary}>
                                      {
                                        Rdata_library.map((item,index)=>{
                                          return <Option value={item.value} key={index}>{item.text}</Option>
                                      })
                                      }
                                </Select>
                              </div>
                              <div>
                                  <span style={{marginRight:'8px'}}><span style={{...Star}}>*</span>数据表</span><span style={{marginLeft:"18px"}}>：</span><Input placeholder="请输入" style={{...inoutStyle}} value={H_list} onChange={(e)=>setH_list(e.target.value)}/>
                              </div>
                              <Button type="primary" style={{marginLeft:"100px"}} onClick={()=>addGlist(G_data_source,setG_data_source)}>新增列</Button>
                          </Form>
                        </div>
                    }} bordered={true} 
                        size='small'
                    />
                  </Form>
                  <Button type="primary" style={{float:'right',marginTop:'20px'}} onClick={()=>Submit()}>保存</Button>
                </div>
              </Form>
                {/* <Table dataSource={G_data_source} columns={columns} pagination={G_data_source>10?true:false} title={() => {
                    return <div style={{textAlign:'center'}} >修改建模</div>
                }} bordered={true}/> */}
            </Card>
        </div>
    )
}