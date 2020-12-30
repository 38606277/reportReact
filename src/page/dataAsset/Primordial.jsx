import React,{useState,useEffect,useRef} from 'react'
import { Table, Tag, Space } from 'antd';
import HttpService from '../../util/HttpService.jsx';
const columns = [
  {
    title: 'column_name',
    dataIndex: 'column_name',
    key: 'column_name',
  },
  {
    title: 'column_type',
    dataIndex: 'column_type',
    key: 'column_type',
  },
  {
    title: '"table_name"',
    dataIndex: 'table_name',
    key: 'table_name',
  },
];

import { Graph } from '@antv/x6'
import '@antv/x6-react-shape'

let H_Table=(props)=>{
  let list=props.list
  console.log(list)
  return(
    <Table dataSource={list} columns={columns} size={'small'}/>
  )
}

export default ()=>{
  let box=useRef()
  let [getlists,setlist]=useState([])
  let [user,setuser]=useState(true)
  let bodyH=document.body.clientHeight
  useEffect(()=>{
    let getlist = async() =>{
        await HttpService.post('/reportServer/dataModeling/bloodlationshipAnalysisDisplay',JSON.stringify({modelId: "793556228272816129", password: "123456"})).then(res=>{
        function setres(arr,i,narr){
          let sparr=JSON.parse(JSON.stringify(arr))
          let getarr=[...narr]
          sparr.sort((a,b)=>{return a.table_name-b.table_name})
          let s=0
          for(let n=sparr.length-1;n>0;n-=1){
            if(sparr[i].table_name===sparr[n].table_name){
              s=n
              break
            }
          }
          let myarr=[sparr.splice(0,s+1)]
          getarr.push(...myarr)
          if(sparr.length>0){
            return setres(sparr,0,getarr)
          }else{
            return getarr
          }
        }
          setuser(false)
          setlist([...setres(res,0,[])])
        })
    }
    if(user)(
        getlist()
    )
   
    console.log(getlists)
    let H=box.current.parentNode.clientHeight
    let W=box.current.parentNode.clientWidth
    console.log(W,H)
    box.current.style.width=W+'px'
    box.current.style.height=W+'px'
    const graph = new Graph({
      container:box.current,
      grid: true,
    })
    graph.drawBackground({
      color: '#f5f5ref5',
    })
    let  mygraph =(x,y,list)=>{//创建子血缘方法
      console.log(list)
      return graph.addNode({
        shape: 'react-shape',
        x:x,
        y:y,
        width:400,
        height:400,
        attrs: {
          body: {
            fill: '#fff',
            stroke: '#fff',
          },
        },
        component:<H_Table  list={list}/>
      })
    }
    const source=mygraph(700,250,getlists[0])//创建父血缘
    let arr =[
      {
        x:50,
        y:20,
        list:getlists[1]
      },
      {
        x:50,
        y:500,
        list:getlists[2]
      }
    ]
    let Dataex=arr.map((item,index)=>{//循环创建子
      return mygraph(item.x,item.y,item.list)
    })
    Dataex.forEach((item,index)=>{//子父连接
      graph.addEdge({
        source:item,
        target:source,
        router: {
          name: 'manhattan',
          args: { 
            step:50,
            padding: 300,
            startDirections: ['right'],
            endDirections: ['left'],
          },
        },
        attrs: {
          line: {
            stroke: '#722ed1',
          },
        },
      })
    })
    console.log(Dataex)
  },[getlists])
  return (<div ref={box}>
  </div>)
}



  
