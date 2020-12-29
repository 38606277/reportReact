import React,{useState,useEffect,useRef} from 'react'
import { Table, Tag, Space } from 'antd';
const columns = [
  {
    title: '表名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'id',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '内容',
    dataIndex: 'address',
    key: 'address',
  },
];
// const obj={
//   source:'指向',
//   children:[
//     {
//       list: [
//         {
//           key: '1',
//           name: 'jkqwdhq',
//           age: 32,
//           address: '西湖区湖底公园1号',
//         },
//         {
//           key: '2',
//           name: 'jhbj',
//           age: 42,
//           address: '西湖区湖底公园1号',
//         },
//       ]
//     },
//     {
//       list: [
//         {
//           key: '1',
//           name: '1234',
//           age: 32,
//           address: '西湖区湖底公园1号',
//         },
//         {
//           key: '2',
//           name: '12456',
//           age: 42,
//           address: '西湖区湖底公园1号',
//         },
//         {
//           key: '3',
//           name: '12456',
//           age: 42,
//           address: '西湖区湖底公园1号',
//         },
//         {
//           key: '4',
//           name: '12456',
//           age: 42,
//           address: '西湖区湖底公园1号',
//         },
//       ]
//     },
//     {
//       list: [
//         {
//           key: '1',
//           name: '1234',
//           age: 32,
//           address: '西湖区湖底公园1号',
//         },
//         {
//           key: '2',
//           name: '12456',
//           age: 42,
//           address: '西湖区湖底公园1号',
//         },
//         {
//           key: '3',
//           name: '12456',
//           age: 42,
//           address: '西湖区湖底公园1号',
//         },
//         {
//           key: '4',
//           name: '12456',
//           age: 42,
//           address: '西湖区湖底公园1号',
//         },
//       ]
//     },
//     {
//       list: [
//         {
//           key: '1',
//           name: '1234',
//           age: 32,
//           address: '西湖区湖底公园1号',
//         },
//         {
//           key: '2',
//           name: '12456',
//           age: 42,
//           address: '西湖区湖底公园1号',
//         },
//         {
//           key: '3',
//           name: '12456',
//           age: 42,
//           address: '西湖区湖底公园1号',
//         },
//         {
//           key: '4',
//           name: '12456',
//           age: 42,
//           address: '西湖区湖底公园1号',
//         },
//       ]
//     }
//   ]
// }
// const boxStyle={
//   width: '100%',
//   height: '100%',
//   display: 'flex',
//   alignItems: 'center'
// }
// export default ()=>{
//   let box_left=useRef()
//   let mycanvas=useRef()
//   let [ctxheight,setctxheight]=useState(0)//画布高度
//   let [ctxcenter,setctxcenter]=useState(0)//画布中部
//   useEffect(()=>{
//     let mylist=box_left.current.childNodes
//     let ctx=mycanvas.current.getContext('2d');
//     let arr=[]
//     mylist.forEach((item,index)=>{
//       item.style.height='200px'
//       item.style.marginBottom='10px'
//       item.style.border='1px solid #ccc'
//       if(item.offsetTop!==0){
//         arr.push(item.offsetTop-100)
//       }
//     })
//     let H=mylist.length*210
//     let C=H/2
//     setctxcenter(C)
//     setctxheight(H)
//     arr.forEach((item,index)=>{
//       ctx.beginPath();
//       ctx.strokeStyle = 'blue';
//       ctx.moveTo(20,item-30);
//       ctx.lineTo(230, ctxcenter+index*6-30);

//       // ctx.lineTo(200, ctxcenter+index*6-30);
//       // ctx.lineTo(230,ctxcenter+index*6)
//       ctx.stroke();
//       // console.log(item)
//     })
    
//   },[box_left,mycanvas,ctxheight,ctxcenter])
//   return (
//     <div style={{...boxStyle}}>
//       <div ref={box_left} style={{width:'40%'}}>
//         {
//           obj.children.map((item,index)=>{
//            return <Table dataSource={item.list} columns={columns} size='small' scroll={{x:200,y:80}} bordered={true}/>
//           })
//         }
//       </div>
//       <canvas id="stockGraph" width="250" height={ctxheight} ref={mycanvas}></canvas>
//       <div style={{width:'40%'}}>
//          <Table dataSource={ obj.children[3].list} columns={columns} size='small' scroll={{x:200,y:400}} bordered={true}/>
//       </div>
//     </div>
//   )
// }

import { Graph } from '@antv/x6'
import '@antv/x6-react-shape'


let  list= [
          {
            key: '1',
            name: '1234',
            age: 32,
            address: '西湖区湖底公园1号',
          },
          {
            key: '2',
            name: '12456',
            age: 42,
            address: '西湖区湖底公园1号',
          },
          {
            key: '3',
            name: '12456',
            age: 42,
            address: '西湖区湖底公园1号',
          },
          {
            key: '4',
            name: '12456',
            age: 42,
            address: '西湖区湖底公园1号',
          },
]


let H_Table=(props)=>{
  let list=props.list
  return(
    <Table dataSource={list} columns={columns} size={'small'}/>
  )
}
let arr =[
  {
    x:50,
    y:20,
    list:list
  },
  {
    x:50,
    y:500,
    list:list
  }
]
export default ()=>{
  let box=useRef()
  useEffect(()=>{
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
      return graph.addNode({
        shape: 'react-shape',
        x:x,
        y:y,
        width:200,
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
    const source=mygraph(500,200,list)//创建父血缘
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
  },[box])
  return (<div ref={box}>
  </div>)
}



  
