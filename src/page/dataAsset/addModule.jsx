import React, { useState ,useEffect,useRef} from 'react';
import {Card,Input,Form,Select,Tag ,Button} from 'antd';
import { Graph,Path } from '@antv/x6';
import '@antv/x6-react-shape';
import H_Table from './ModuleTable.jsx';
import './addModule.scss';
const { TextArea } = Input;
const { Option } = Select;

const mygraph =(graph,x,y,list)=>{//创建子血缘方法
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
export default ()=>{
    const box=useRef();//放画布元素
    const [majorList,setmajorList]=useState(null);//主表数据
    const [secondaryList ,setSecondaryList]=useState([]);//次表数据
    const [w,setW]=useState(0);//获取画布宽
    const [graph,setgraph]=useState(null)
    const [Name,setName]=useState('')//模型名称
    const [Lass,setLass]=useState('')//获取类
    const [Area,setArea]=useState('')//文本域内容
    const DataObj={
        majorList,setmajorList,
        secondaryList ,setSecondaryList,
        w,setW,
        graph,setgraph
    };
    useEffect(()=>{
        const W=box.current.parentNode.clientWidth;
        setW(W)
        box.current.style.height=w+'px';
        box.current.style.boxShadow="5px 5px 5px 5px #eee";
        Graph.registerConnector(//自定义连线
            'curve',
            (sourcePoint, targetPoint) => {
              const path = new Path()
              path.appendSegment(Path.createSegment('M', sourcePoint))
              path.appendSegment(
                Path.createSegment(
                  'C',
                  sourcePoint.x+90,
                  sourcePoint.y+20,
                  targetPoint.x-100,
                  targetPoint.y,
                  targetPoint.x,
                  targetPoint.y,
                ),
              )
              return path.serialize()
            },
            true,
          )
        const graphm = new Graph({//生成画布
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
        setgraph(graphm)
    },[w])
    const addMajorModuel=()=>{
        let index=secondaryList.length//获取多少个子表
        const y=Math.floor(w/2)-175
        const x=Math.floor(w/2)-100
        mygraph(graph,x,y,[{a:2}])
        console.log(x)
        console.log('添加主模型')
    }
    return (
        <Card 
            title="新建模型"
            className='H_addModule'
        >
            <Form
                name="horizontal_login" layout="inline"
            >
                <div className='H_addModule_Name'>
                    <div className='H_addModule_NameText'>模型名称<span>：</span></div>
                    <Input className='H_addModule_NameInput' value={Name} onChange={(e)=>{setName(e.target.value)}}/>
                </div>
                <div className='H_addModule_Lass'>
                    <div className='H_addModule_LassTitle'>数据类型<span>：</span></div>
                    <Select className='H_addModule_LassSelect' defaultValue="lucy" style={{ width: 120 }} onChange={setLass}>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="disabled">
                            Disabled
                        </Option>
                        <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                </div>
            </Form>
            <div className='H_addModule_Explain'>
                <div className='H_addModule_ExplainText'>说明 <span>：</span></div>
                <div className='H_addModule_ExplainArea'>
                    <TextArea rows={6} value={Area} onChange={(e)=>setArea(e.target.value)} style={{resize:"none"}}/>
                </div>
            </div>
            <div>
                <div className="H_addModule_btnList">
                    <div className='H_addModule_btnListAdd'>
                        <Tag color="#2db7f5" onClick={()=>{addMajorModuel()}}>新建主表</Tag>
                        <Tag color="#f50">新建副表</Tag>
                    </div>
                    <Button className='H_addModule_btnListPre' type="primary">保存</Button>
                </div>
                <div ref={box}></div>
            </div>
        </Card>
    );
};