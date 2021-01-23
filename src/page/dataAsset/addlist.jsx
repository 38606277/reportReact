// import React,{useState,useEffect} from 'react'

// import {Table,Tag,Card,Button ,Modal, Input,Form} from 'antd'
// import LocalStorge  from '../../util/LogcalStorge.jsx';
// const localStorge = new LocalStorge();
// let addlist=(statlist)=>{//添加主
//   let {setisModalVisible,setn,setsetstr}=statlist
//   setsetstr('添加一项')
//   setisModalVisible(true)
//   setn('主')
// };
// let handleOk =()=>{
//   setisModalVisible(false)
// };
// let addchildren=(statlist,record)=>{//添加子
//   let {setisModalVisible,setn,setsetstr}=statlist
//   console.log(record)
//   setisModalVisible(true)
//   setsetstr('添加一项')
//   setn('次')
// }
// let setSonList = (record,statlist) =>{
//   let {setisModalVisible,setn,setsetstr}=statlist
//   setsetstr('修改此项')
//   setisModalVisible(true)
//   setn('次')
//   console.log(record)
// }
// export default()=>{
//   let [list,setlist]=useState([]);
//   let [clisst,setclist]=useState([]);
//   let [username,setusername]=useState('');//主导航名称
//   let [urlname,seturlname]=useState('')//主导航路径
//   let [iconname,seticonname]=useState('')//主导航ICon
//   let [isModalVisible,setisModalVisible]=useState(false);
//   let userId=localStorge.getStorage('userInfo').id;
//   let [n,setn]=useState('')//记录是子还是父增加
//   let [setstr,setsetstr]=useState('添加')
//   let statlist={
//     list,setlist,clisst,setclist,username,setusername,urlname,seturlname,iconname,seticonname,isModalVisible,setisModalVisible,
//     n,setn,setstr,setsetstr
//   }
//     useEffect(()=>{
//       (
//         async () =>{
//          await HttpService.post('/reportServer/auth/getMenuListNew',JSON.stringify({userId:userId})).then(res=>{
//            let children=[]
//            let arr=res.data.map((item,index)=>{
//              console.log(item.children)
//              children.push(item.children)
//             return{ 
//               func_icon:item.func_icon,
//               func_name:item.func_name,
//               func_id:item.func_id,
//               func_url:item.func_url,
//               key:index}
//            })
//            setclist(children)
//            setlist(arr)

//          })
//         }
//       )();
//     },[])
//     const columns = [
//       { title: '主导航名称', dataIndex: 'func_name', key: 'func_name' },
//       { title: '主导航路径', dataIndex: 'func_url', key: 'func_url' },
//       { title: '主导icon图标', dataIndex: 'func_icon', key: 'func_icon' },
//       {
//         title: '操作',
//         dataIndex: '',
//         key: 'x',
//         render: (record) => <span>
//             <Tag color="#87d068" onClick={()=>{addchildren(statlist,record)}}>添加子节点</Tag>
//         </span>,
//       },
//     ];
//   const columns2=[
//     {
//       title:'子导航名称',
//       dataIndex: 'func_name',
//       key:'func_name'
//     },{ 
//       title: '子导航路径',
//        dataIndex: 'func_url',
//        key: 'func_url' },
//     {
//        title: '子导航icon图标', 
//        dataIndex: 'func_icon',
//         key: 'func_icon' 
//     },
//     {
//       title:'操作',
//       dataIndex:'',
//       key:'x',
//       render:(record)=>
//       <span>
//         <Tag color="#87d068" onClick={()=>setSonList(record,statlist)}>修改子节点</Tag>
//         <Tag color="#87d068">删除子节点</Tag>
//       </span>
//     }
//   ]
//     const expandedRowRender=(record,index)=>{//子列表
//       let arr= clisst[index].map((item,indexs)=>{
//         return {
//           ...item,
//           key:indexs
//         }
//       })
//         return (<Table columns={columns2} dataSource={arr}  pagination={false} bordered={true} size='small' 
//         style={
//           {
//             marginBottom:'20px',
//           }
//         }
//         title={()=>{
//           return (<div style={{textAlign:'center'}}>子序列</div>)
//         }} 
        
//         />)
//     }
//     return(
//         <Card title='侧导航设置'>
//           <Button type="primary" style={{float:'right',marginBottom:'20px'}} onClick={()=>addlist(statlist)}>增加新的主导航</Button>
//           <Table
//                 bordered={true}
//                 pagination={false}
//                 columns={columns}
//                 dataSource={list}
//                 expandable={{
//                 expandedRowRender: (record,index) =>{
//                   return expandedRowRender(record,index)
//                 }
//                 }}
//             />
            // <Modal title={setstr+n+"导航"} visible={isModalVisible} onOk={()=>handleOk} onCancel={()=>setisModalVisible(!isModalVisible)}>
            //   <p>
            //     <Form.Item
            //       label={n+"导航名称"}
            //       name="username"
            //     >
            //       <Input placeholder='请输入' value={username} onChange={(e)=>{setusername(e.target.value)}}/>
            //     </Form.Item>
            //   </p>
            //   <p>
            //     <Form.Item
            //       label={n+"导航路径"}
            //       name="urlname"
            //     >
            //       <Input placeholder='请输入' value={urlname} onChange={(e)=>{seturlname(e.target.value)}}/>
            //     </Form.Item>
            //   </p>
            //   <p>
            //     <Form.Item
            //       label={n+"导导航icon"}
            //       name="iconname"
            //     >
            //       <Input placeholder='请输入antd中的icn字段' value={iconname} onChange={(e)=>{seticonname(e.target.value)}}/>
            //     </Form.Item>
            //   </p>
            // </Modal>
//         </Card>
//     )
// }








import React, { useState ,useEffect} from 'react';
import HttpService from '../../util/HttpService.jsx';
import { Table, Input, InputNumber, Popconfirm, Form ,Card,Button,Modal,message,Tag} from 'antd';
import LocalStorge  from '../../util/LogcalStorge.jsx';
const localStorge = new LocalStorge();
const getList =(setData)=>{
  HttpService.post('/reportServer/menu/getAllList',null).then(res=>{
    if(res.resultCode==="1000"){
      setData(res.data)
    }
    // let newdata=[]
    // res.data.forEach((item,index)=>{
    //   newdata.push(
    //     {
    //       ...item,
    //       key:index,
    //       children: item.children.map((items,indexs)=>{
    //         return {
    //           ...items,
    //           key:index+"_"+indexs
    //         }
    //       })
    //     }
    //   ) 
    // })
  })
}
const addlist=(statlist)=>{//添加主
  // func_name  urlname iconname
  const {setisModalVisible,setStr}=statlist
  console.log("chenggong")
  setisModalVisible(true)
  setStr('主')
};
const addSon=(record,statlist)=>{
  const {setisModalVisible,setStr,setFid}=statlist
  setFid(record.func_id)
  setisModalVisible(true)
  setStr('次')
}
const isNullVerification=(arr,obj,method,fn)=>{//非空验证
  if(obj[arr.indexOf('')]){
    message.warning(obj[arr.indexOf('')])
    return 
  }
  fn()
  method(false)
}
const handleOk=(statlist)=>{
  const {setisModalVisible,urlname,iconname,func_name,str,Fid,setusername,seturlname,seticonname,addList}=statlist
  let TipsArr=[func_name,urlname]
  const TipsObj={//非空校验
    0:'导航名称必填',
    1:'导航路径必填',
  }
  isNullVerification(TipsArr,TipsObj,setisModalVisible,()=>{

    if(str==="主"){
      addList(null,0,func_name,urlname,iconname,null,null,null,null)
    }else{
      addList(null,Fid,func_name,urlname,iconname,null,null,null,null)
    }
    // console.log(1)
  })
}
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
  // console.log(inputNode)
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


const H_input = (props)=>{
  const {style,text,value,change}=props
    return (
      <div style={{display:'flex',height:'32px',lineHeight:'32px',margin:"10px 0",...style}}>
        <span style={{flex:'2'}}>{text}</span>
        <span style={{flex:'8'}}><span style={{display:'inline-block',width:"5%",textAlign:'center'}}>:</span><Input style={{width:'95%'}} placeholder='请输入' value={value} onChange={(e)=>{change(e.target.value)}}/></span>
      </div>
    )
}

export default ()=>{
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [isModalVisible,setisModalVisible]=useState(false)//控制弹窗
  const [str,setStr]=useState('')//是主菜'单还是次菜单
  const [func_name,setfunc_name]=useState('');//主导航名称
  const [urlname,seturlname]=useState('')//主导航路径
  const [iconname,seticonname]=useState('')//主导航ICon
  const [Fid,setFid]=useState(null)
  // const userId=localStorge.getStorage('userInfo').id;//获取用户id
  const addList =(func_id,func_pid,func_name,func_url,func_icon,func_type,func_desc,order,target)=>{
    const obj={
      func_id,
      func_pid,
      func_name,
      func_url,
      func_icon,
      func_type:"reactWeb",
      valid:1,
      func_desc,
      order,
      target
    }
    HttpService.post('/reportServer/menu/saveMenu',JSON.stringify({...obj})).then(res=>{
      if(res.resultCode==="1000"){
        message.success(res.message);
        getList(setData)
      }else{
        getList(setData)
        return
      }
    })
  }
  const remoList =(record)=>{
    HttpService.post('/reportServer/menu/deleteMenuById',JSON.stringify({func_id:record.func_id})).then(res=>{
      if(res.resultCode==="1000"){
        message.success(res.message);
        getList(setData);
      }else{
        getList(setData);
      }
    })
    
    // console.log(record)
  }
  const inputList=[//弹框input数据
    {
      text:'导航名称',
      variable:func_name,
      method:setfunc_name
    },
    {
      text:'导航路径',
      variable:urlname,
      method:seturlname
    },
    {
      text:'导航ICON',
      variable:iconname,
      method:seticonname
    }
  ]
  const statlist={
    isModalVisible,setisModalVisible,
    str,setStr,
    func_name,setfunc_name,
    urlname,seturlname,
    iconname,seticonname,
    Fid,setFid,addList
  }
  useEffect(()=>{
    (async()=>{
        await getList(setData)
    })();
  },[])
  useEffect(()=>{
    if(!isModalVisible){
      setfunc_name('')
      seturlname('')
      seticonname('')
    }
  },[isModalVisible])
  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    console.log(record)
    form.setFieldsValue({
      // name: '',
      // age: '',
      // address: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel =async (record) => {
    let key=record.key
     try {
      const row = await form.validateFields();//获取当前三个input中的数据
      // console.log(record,row)
      const obj= await{...record,...row}
      console.log(1)
      if(obj.func_name){
       await addList(obj.func_id,obj.func_pid,obj.func_name,obj.func_url,obj.func_icon,obj.func_type,obj.valid,obj.func_desc,obj.order,obj.target)
      }
          // (func_id,func_pid,func_name,func_url,func_icon,func_type,valid,func_desc,order,target)
      // 
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        // newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const save =  () => {
    setEditingKey('');
   
  };

  const columns = [
    {
      title: '导航名称',
      dataIndex: 'func_name',
      width: '25%',
      key:"func_name",
      editable: true,
    },
    {
      title: '导航_icon',
      dataIndex: 'func_icon',
      width: '15%',
      key:"func_icon",
      editable: true,
    },
    {
      title: '导航地址',
      dataIndex: 'func_url',
      width: '40%',
      key:"func_url",
      editable: true,
    },
    {
      title: '操作',
      dataIndex: 'x',
      key:"x",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save()}
              style={{
                marginRight: 8,
              }}
            >
              取消修改
            </a>
            <Popconfirm title="确认是否修改?" 
                        onConfirm={()=>cancel(record)}
                        onCancel={()=>save()}
                        okText="确认"
                        cancelText="取消"
            >
              <a>修改</a>
            </Popconfirm>
          </span>
        ) : ( 
          <a>
            <Tag disabled={editingKey !== ''} onClick={() => edit(record)} color="#87d068">修改</Tag>
            <Tag color="red" onClick={()=>remoList(record)}>删除</Tag>
            <Tag color="#108ee9" onClick={()=>{addSon(record,statlist)}}>添加</Tag>
          </a>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
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
  return (
    <Card title='侧导航设置'>
       <Button type="primary" style={{float:'right',marginBottom:'20px'}} onClick={()=>addlist(statlist)}>增加新的主导航</Button>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
      <Modal title={"添加"+str+"导航"} visible={isModalVisible} onOk={()=>handleOk(statlist)} onCancel={()=>setisModalVisible(!isModalVisible)}
              cancelText="取消" okText="确定"
      >
        {
          inputList.map((item,index)=>{
            return(
              <H_input key={index} text={str+item.text}  value={item.variable} change={item.method}/>
            )
          })
        }
      </Modal>
    </Card>
  );
}