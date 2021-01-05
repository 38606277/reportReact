import React,{useState,useEffect,useRef} from 'react'
import { Table, Tag, Space,Card ,Select  } from 'antd';
import HttpService from '../../util/HttpService.jsx';
import { Graph,Path } from '@antv/x6'
import '@antv/x6-react-shape'
const {Option}=Select 
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
    title: 'table_name',
    dataIndex: 'table_name',
    key: 'table_name',
  },
];

const list=[
  {
    column_name:'表1',
    column_type:'表1',
    table_name:'表1'
  },
  {
    column_name:'表1',
    column_type:'表1',
    table_name:'表1'
  },
  {
    column_name:'表1',
    column_type:'表1',
    table_name:'表1'
  },
  {
    column_name:'表1',
    column_type:'表1',
    table_name:'表1'
  },
]
let H_Table=(props)=>{
  let list=props.list
  return(
    <Table 
    showHeader={false}
        scroll={{x:150,y:200}} dataSource={list} columns={columns} size={'small'}
        
    />
  )
}
export default ()=>{
  let box=useRef()
  let [getlists,setlist]=useState([])
  useEffect(()=>{
    // let H=box.current.parentNode.clientHeight
    let W=box.current.parentNode.clientWidth
    // box.current.style.width=W+'px'
    box.current.style.height=W+'px'
    box.current.style.boxShadow="5px 5px 5px 5px #eee"
    Graph.registerConnector(
      'curve',
      (sourcePoint, targetPoint) => {
        const path = new Path()
        path.appendSegment(Path.createSegment('M', sourcePoint))
        path.appendSegment(
          Path.createSegment(
            'C',
            sourcePoint.x,
            sourcePoint.y,
            targetPoint.x,
            targetPoint.y,
            targetPoint.x,
            targetPoint.y,
          ),
        )
        return path.serialize()
      },
      true,
    )
    const graph = new Graph({
      container:box.current,
      grid: true,
      background: {
        color: '#fff', // 设置画布背景颜色
      },
      grid: {
        size: 1,      // 网格大小 10px
        visible: true, // 渲染网格背景
      },
    })
    let  mygraph =(x,y,list)=>{//创建子血缘方法
      return graph.addNode({
        shape: 'react-shape',
        x:x,
        y:y,
        width:200,
        height:350,
        attrs: {
          body: {
            fill: '#fff',
            stroke: '#fff',
          },
        },
        component:<H_Table  list={list}/>
      })
    }
    const source=mygraph(350,200,list)//创建父血缘
    let mylist=[list,list,list]
    let arr=mylist.map((item,index)=>{
        return {
            x:index%2!==0?600:50,
            y:index%2!==0?index*300:index%2*300,
            direction:index%2!==0?'right':"left",
            list:list
        }
    })
    console.log(arr)
    let Dataex=arr.map((item,index)=>{//循环创建子
      return {
          obj:mygraph(item.x,item.y,item.list),
          direction:item.direction
      }
    })
    Dataex.forEach((item,index)=>{//子父连接 cell: source, anchor: 'bottom', connectionPoint: 'anchor'
      graph.addEdge({
        source:{cell:source,anchor:item.direction, connectionPoint: 'anchor'},
        target:{ cell: item.obj, anchor: item.direction==='left'?'right':'left', connectionPoint: 'anchor' },
        connector: { name: 'curve' },
        router: {
          name: 'manhattan'
        },
        attrs: {
          line: {
            stroke: 'skyblue',
          },
        },
      })
    })
  },[getlists])
  return (<Card title="数据血缘">
    <div ref={box}></div>
  </Card>
  )
}