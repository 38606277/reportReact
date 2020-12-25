import React,{useState,useEffect,useRef} from 'react'
import { Table, Tag, Space } from 'antd';
// const columns = [
//   {
//     title: '表名',
//     dataIndex: 'name',
//     key: 'name',
//   },
//   {
//     title: 'id',
//     dataIndex: 'age',
//     key: 'age',
//   },
//   {
//     title: '内容',
//     dataIndex: 'address',
//     key: 'address',
//   },
// ];
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
export default ()=>{
  let box=useRef()
  useEffect(()=>{
    box.current.style.width='1000px'
    box.current.style.height='1000px'
    const graph = new Graph({
      container:box.current,
      grid: true,
    })
    graph.drawBackground({
      color: '#f5f5ref5',
    })
    let setlist=(list)=>{
      let box=document.createElement('div')
      box.innerHTML=`<div><span>编号</span><span>id</span><span>表名</span><span>内容</span></div>`
      list.forEach((item,index)=>{
          let ad=document.createElement('div')
          for(let i in item){
            ad.innerHTML+=`<span>${item[i]}</span>`
          }
          box.style.width='200px'
          box.style.height='100%'
          box.style.overflowY ='scroll'
          box.appendChild(ad)
      })
      box.childNodes.forEach((item,inde)=>{
        item.style.display='flex'
        item.style.borderBottom='1px solid #ccc'
        item.childNodes.forEach((items,indexs)=>{
          items.style.flex='1'
          items.style.boxSizing='boder-box'
          items.style.paddingTop='5px'
          items.style.textAlign='center'
          if(indexs!==0){
            items.style.borderLeft='1px solid #ccc'
          }
        })
      })
      console.log(box.childNodes)
      return box
    }
    const source = graph.addNode({
      shape: 'html',
      x: 300,
      y: 160,
      width: 200,
      height: 150,
      html:setlist(list),
      attrs: {
        body: {
          fill: '#f5f5f5',
          stroke: '#d9d9d9',
        },
      },
    })
    
    const target = graph.addNode({
      shape: 'html',
      x: 600,
      y: 160,
      width: 200,
      height: 150,
      html:setlist(list),
      attrs: {
        body: {
          fill: '#f5f5f5',
          stroke: '#d9d9d9',
        },
      },
    })
    const target2 = graph.addNode({
      shape: 'html',
      x:20,
      y: 160,
      width: 200,
      height: 150,
      html:setlist(list),
      attrs: {
        body: {
          fill: '#f5f5f5',
          stroke: '#d9d9d9',
        },
      },
    })
    const targe3 =graph.addNode({
      x:20,
      y:380,
      width:200,
      height:150,
      data:[...list],
      html:{
        render(node){
          console.log(node)
          return (
            list.map(item=>{
              return <div>{item.key}</div>
            })
          )
        }
      }
    })
    graph.addEdge({
      source,
      target:target,
      // https://x6.antv.vision/zh/docs/api/registry/router#oneside
      router: {
        name: 'manhattan',
        args: {
          side: 'right',
          padding: 2000 ,
          
      maxDirectionChange:90,
        },
      },
      attrs: {
        line: {
          stroke: '#722ed1',
        },
      },
    })
    graph.addEdge({
      source,
      target:target2,
      // https://x6.antv.vision/zh/docs/api/registry/router#oneside
      router: {
        name: 'manhattan',
        vertices: [],
        args: {
          side: 'right',
          padding: 2000 ,
            maxDirectionChange:90,
        },
      },
      attrs: {
        line: {
          stroke: '#722ed1',
        },
      },
    })
    graph.addEdge({
      source,
      target:targe3,
      router: {
        name: 'manhattan',
        vertices: [],
        args: {
          side: 'right',
          padding: 2000 ,
            maxDirectionChange:90,
        },
      },
      attrs: {
        line: {
          stroke: '#722ed1',
        },
      },
    })
  },[box])
  return (<div ref={box}>

  </div>)
}



  
