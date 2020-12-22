import React,{useState,useEffect,useRef} from 'react';
import { Form, Input, Table, Button, Modal, Card,  Radio,Row, Col, Select, Pagination, message, Tabs, Divider, Tag ,Layout } from 'antd';
import HttpService from '../../util/HttpService.jsx';
// import MY from './a.jsx'
const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 15 },
  };
  const columns = [
    {
      title: 'url',
      dataIndex: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      id: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      id: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      id: 32,
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: '4',
      name: 'Disabled User',
      id: 99,
      address: 'Sidney No. 1 Lake Park',
    },
  ]; // rowSelection object indicates the need for row selection
  const data2=[
    {
        key: '1',
        name: 'aaaa',
        id: 32,
        address: 'New York No. 1 Lake Park',
      },
      {
        key: '2',
        name: 'bbbb',
        id: 42,
        address: 'London No. 1 Lake Park',
      },
      {
        key: '3',
        name: 'cccc',
        id: 32,
        address: 'Sidney No. 1 Lake Park',
      },
      {
        key: '4',
        name: 'cccc',
        id: 99,
        address: 'Sidney No. 1 Lake Park',
      },
  ]
export default ()=>{
    let [source,setsource]=useState('')
    let [data_source,setdata_source]=useState([])//来源
    let [library,setlibrary]=useState('')
    let [data_library,setdata_library]=useState([{'value':'mysql','text':'mysql'}])//数据库
    let [data_list,setdata_list]=useState([{'value':'mysql','text':'mysql'}])//数据表
    let [selectionType, setSelectionType] = useState('checkbox');//表
    let [G_data_source,setG_data_source]=useState([])//已建模表
    let [G_list,setG_list]=useState([])//获取内容表
    let [mylist,setmylist]=useState([])
    let [user,setuser]=useState(true)
    useEffect(()=>{
        if(user){
            let mysource=async()=>{
                let n= await HttpService.post('/bigdataCon/dataSourceManage/getDataSourceName', JSON.stringify({}),'1').then(res=>{
                    console.log(res)
                    let arr =res.data.list.map(item=>{
                        return {
                            value:item,
                            text:item
                        }
                    })
                    setmylist(data)
                    setuser(false)
                    setdata_source(arr)
                  })
            }
            mysource()
        }
       
        console.log(source)
        if(source){
            if(library){
                setmylist(data2)
            }
            let mylibrary= async ()=>{
                console.log(1)
                // await HttpService.post('/bigdataControl/data4Mysql/getDatabases4Url',JSON.stringify({}),'1').then(res=>{
                //     console.log(res.data)
                // })
            }
            mylibrary()
        }
    },[source,mylist,library])
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {

            let arr =[...JSON.parse(JSON.stringify(selectedRows))]
            console.log(arr)
            console.log(Array.from(new State([...G_data_source,...arr])))
            setG_data_source([...G_data_source,...arr])
            // console.log(selectionType)   
          
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps:(e)=>{
            console.log(e)
        }
      };
    const  go =()=>{
        console.log(G_data_source)
      }
    return(
        <div>
            <Card title='数据建模'>
                <div style={{width:'45%',float:'left'}}>
                    <Form
                        name="horizontal_login" layout="inline"
                        >
                        <Form.Item
                                {...layout}
                                label="数据源"
                                name="basic"
                                initialValues={{ remember: true }}
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                            <Select defaultValue="请选择" style={{ width: 155,marginLeft:7 }} onChange={setsource}>
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
                                name="basic"
                                initialValues={{ remember: true }}
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                            <Select defaultValue="请选择" style={{ width: 155,marginLeft:7 }} onChange={setlibrary}>
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
                                name="basic"
                                initialValues={{ remember: true }}
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                            <Select defaultValue="请选择" style={{ width: 155,marginLeft:7 }} onChange={setdata_list}>
                                {
                                data_list.map((item,index)=>{
                                    return <Option value={item.value} key={index}>{item.text}</Option>
                                })
                                }
                                </Select>
                        </Form.Item>
                    </Form>
                    <Table
                        rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                        }}
                        pagination={mylist.length>10?true:false}
                        columns={columns}
                        dataSource={mylist}
                        size='small'
                    />
                </div>
                <div style={{float:'left',margin:'20px 0px',width:'10%',marginTop:'10%'}}><Button type="primary" onClick={()=>go()}>→</Button></div>
                <div style={{width:'45%',float:'right'}}>
                    <Table dataSource={G_data_source} columns={columns} pagination={G_data_source.length>10?true:false} title={() => {
                        return <div style={{textAlign:'center'}} >已建模内容</div>
                    }} bordered={true} 
                        size='small'
                    />
                </div>
                {/* <Table dataSource={G_data_source} columns={columns} pagination={G_data_source>10?true:false} title={() => {
                    return <div style={{textAlign:'center'}} >修改建模</div>
                }} bordered={true}/> */}
            </Card>
        </div>
    )
}