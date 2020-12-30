import React,{useState,useEffect} from 'react'
import HttpService from '../../util/HttpService.jsx';
import {Table,Tag,Card,Button } from 'antd'
import LocalStorge  from '../../util/LogcalStorge.jsx';
const localStorge = new LocalStorge();
const columns = [
    { title: '主导航名称', dataIndex: 'func_name', key: 'func_name' },
    { title: '主导航路径', dataIndex: 'func_url', key: 'func_url' },
    { title: '主导icon图标', dataIndex: 'func_icon', key: 'func_icon' },
    {
      title: '操作',
      dataIndex: '',
      key: 'x',
      render: () => <span>
          <Tag color="#87d068">添加子节点</Tag>
      </span>,
    },
  ];
const columns2=[
  {
    title:'子导航名称',
    dataIndex: 'func_name',
    key:'func_name'
  },{ 
    title: '子导航路径',
     dataIndex: 'func_url',
     key: 'func_url' },
  {
     title: '子导航icon图标', 
     dataIndex: 'func_icon',
      key: 'func_icon' 
  },
  {
    title:'操作',
    dataIndex:'',
    key:'x',
    render:()=>
    <span>
      <Tag color="#87d068">修改子节点</Tag>
      <Tag color="#87d068">删除子节点</Tag>
    </span>
     
    
  }

]
export default()=>{
  let [list,setlist]=useState([])
  let [clisst,setclist]=useState([])
  let userId=localStorge.getStorage('userInfo').id
    useEffect(()=>{
      (
        async () =>{
         await HttpService.post('/reportServer/auth/getMenuListNew',JSON.stringify({userId:userId})).then(res=>{
           let children=[]
           let arr=res.data.map((item,index)=>{
             console.log(item)
             children.push(item.children)
            return{ 
              func_icon:item.func_icon,
              func_name:item.func_name,
              func_id:item.func_id,
              func_url:item.func_url,
              key:index}
           })
           setclist(children)
           setlist(arr)

         })
        }
      )();
    },[])
    console.log(list)
    const expandedRowRender=(record,index)=>{
      console.log(index)
      let arr= clisst[index].map((item,indexs)=>{
        return {
          ...item,
          key:indexs
        }
      })
        return (<Table columns={columns2} dataSource={arr}  pagination={false} bordered={true} size='small' 
        title={()=>{
          return (<div style={{textAlign:'center'}}>子序列</div>)
        }} 
        
        />)
    }
    return(
        <Card title='侧导航设置'>
          <Button>增加新的主导航</Button>
          <Table
                columns={columns}
                dataSource={list}
                expandable={{
                expandedRowRender: (record,index) =>{
                  return expandedRowRender(record,index)
                }
                }}
            />
        </Card>
    )
}