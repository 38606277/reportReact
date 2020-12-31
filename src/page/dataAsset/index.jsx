import React,{useState,useEffect,useRef} from 'react';
import { Form, Input, Table, Button, Modal, Card,  Radio,Row, Col, Select, Pagination, message, Tabs, Divider, Tag ,Layout} from 'antd';
import HttpService from '../../util/HttpService.jsx';
const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 15 },
  };
const inoutStyle={
  width:'155px',
  marginLeft:'8px'
};
const Star={//红色*样式
  marginRight: '4px',
  color: '#ff4d4f',
  fontSize: '14px',
  fontFamily: 'SimSun, sans-serif',
  lineHeight: '1'
};
export default ()=>{
    let [source,setsource]=useState({});//记录账号和密码 +数据来源标记
    let [data_source,setdata_source]=useState([]);//来源
    let [selectedRowKeys,setselectedRowKeys]=useState([]);//控制1表选中
    let [arr,setarr]=useState([]);//整合选中信息
    let [data_library,setdata_library]=useState([]);//数据库
    let [data_list,setdata_list]=useState([]);//数据表
    let [selectionType, setSelectionType] = useState('checkbox');//表
    let [G_data_source,setG_data_source]=useState([]);//已建模表
    let [mylist,setmylist]=useState([]);
    let [user,setuser]=useState(true);
    let [recordSelect,setrecordSelect]=useState([]);//记录选中数据
    let [librarystr,setlibrarystr]=useState('')//获取数据库字段
    let [liststr,setliststr]=useState('')//获取数据表字段
    let [tableList,settableList]=useState([])//左侧记录
    const Hcenter=useRef();//中间dom
    const Hbtn=useRef();//中间蓝色按钮
    const letTable=useRef();///左侧dom

    //右侧变量
    let [Rdata_source,setRdata_source]=useState([{'value':'总部','text':'总部'}]);//数据来源
    let [Rdata_library,setRdata_library]=useState([{'value':'my','text':'my'},{'value':'ou','text':'ou'}]);//数据列表
    let [getRsource,setRsource]=useState('');//数据来源内容
    let [getRlibrary,setRlibrary]=useState('');//数据列表内容
    let [H_list,setH_list]=useState('');//获取数据内容
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
    },[source,mylist,user]);
    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            setrecordSelect([...selectedRows])
            console.log(recordSelect)
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
        message.success('建模完成')
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
    const colimnsR=[
      {
        title: 'fieldName',
        dataIndex: 'fieldName',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'fieldType',
        dataIndex: 'fieldType',
      },
      {
        title:'操作',
        render: (text,res) => <a onClick={()=>{//右侧取消逻辑
          let arr=G_data_source.filter(item=>{
            return item.fieldName!==res.fieldName
          })
          let sele=arr.map(item=>{
           return item.key
          })
          setG_data_source(arr)
          setselectedRowKeys(sele)
        }}>取消</a>,
      }
    ];
    return(
        <div>
            <Card title='数据建模' style={{display:'flow-root'}}>
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
                    <Table dataSource={G_data_source} columns={colimnsR} pagination={G_data_source.length>10?true:false} title={() => {//右侧表头
                        return <div>
                          <div style={{textAlign:'center',padding:"10px 0 20px 0"}} >建模</div>
                          <Form
                              name="horizontal_login" layout="inline"
                              >
                              <div  style={{
                                marginRight:"9px",
                                marginBottom:"9px"
                              }}>
                                  <span style={{marginRight:'8px'}}><span style={{...Star}}>*</span>数据表</span>  <Input placeholder="Basic usage" style={{...inoutStyle}} value={H_list} onChange={(e)=>setH_list(e.target.value)}/>
                              </div>
                              <Form.Item
                                      {...layout}
                                      label="数据库"
                                      name="basic2 "
                                      initialValues={{ remember: true }}
                                      rules={[{ required: true}]}
                                      style={{marginBottom:'9px'}}
                                  >
                                  <Select defaultValue="请选择" style={{ width: 155,marginLeft:7 }} onChange={setRlibrary}>
                                      {
                                        Rdata_library.map((item,index)=>{
                                          return <Option value={item.value} key={index}>{item.text}</Option>
                                      })
                                      }
                                  </Select>
                              </Form.Item>
                              <div>
                                  <span style={{marginRight:'8px'}}><span style={{...Star}}>*</span>数据表</span>  <Input placeholder="Basic usage" style={{...inoutStyle}} value={H_list} onChange={(e)=>setH_list(e.target.value)}/>
                              </div>
                          </Form>
                        </div>
                    }} bordered={true} 
                        size='small'
                    />
                  <Button type="primary" style={{float:'right',marginTop:'20px'}} onClick={()=>Submit()}>建模</Button>
                </div>
              </Form>
               
                {/* <Table dataSource={G_data_source} columns={columns} pagination={G_data_source>10?true:false} title={() => {
                    return <div style={{textAlign:'center'}} >修改建模</div>
                }} bordered={true}/> */}
            </Card>
        </div>
    )
}