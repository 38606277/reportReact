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
//             <Modal title={setstr+n+"导航"} visible={isModalVisible} onOk={()=>handleOk} onCancel={()=>setisModalVisible(!isModalVisible)}>
//               <p>
//                 <Form.Item
//                   label={n+"导航名称"}
//                   name="username"
//                 >
//                   <Input placeholder='请输入' value={username} onChange={(e)=>{setusername(e.target.value)}}/>
//                 </Form.Item>
//               </p>
//               <p>
//                 <Form.Item
//                   label={n+"导航路径"}
//                   name="urlname"
//                 >
//                   <Input placeholder='请输入' value={urlname} onChange={(e)=>{seturlname(e.target.value)}}/>
//                 </Form.Item>
//               </p>
//               <p>
//                 <Form.Item
//                   label={n+"导导航icon"}
//                   name="iconname"
//                 >
//                   <Input placeholder='请输入antd中的icn字段' value={iconname} onChange={(e)=>{seticonname(e.target.value)}}/>
//                 </Form.Item>
//               </p>
//             </Modal>
//         </Card>
//     )
// }








import React, { useState ,useEffect} from 'react';
import HttpService from '../../util/HttpService.jsx';
import { Table, Input, InputNumber, Popconfirm, Form } from 'antd';
import LocalStorge  from '../../util/LogcalStorge.jsx';
const localStorge = new LocalStorge();
const originData = [];

for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
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
  console.log(dataIndex)
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
export default ()=>{
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  let userId=localStorge.getStorage('userInfo').id;
  useEffect(()=>{
    (
      async () =>{
        await HttpService.post('/reportServer/auth/getMenuListNew',JSON.stringify({userId:userId})).then(res=>{
          let newdata=[]
          res.data.forEach((item,index)=>{
            newdata.push(
              {
                ...item,
                key:index,
                children: item.children.map((items,indexs)=>{
                  return {
                    ...items,
                    key:index+"_"+indexs
                  }
                })
              }
            ) 
          })
          console.log(newdata)  
          setData(newdata)
        })
      }
    )();
  },[])
  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = (record) => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: '导航名称',
      dataIndex: 'func_name',
      width: '25%',
      editable: true,
    },
    {
      title: '导航_icon',
      dataIndex: 'func_icon',
      width: '15%',
      editable: true,
    },
    {
      title: '导航地址',
      dataIndex: 'func_url',
      width: '40%',
      editable: true,
    },
    {
      title: '操作',
      dataIndex: 'x',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              取消修改
            </a>
            <Popconfirm title="确认是否修改?" onConfirm={()=>cancel(_)}>
              <a>修改</a>
            </Popconfirm>
          </span>
        ) : (
          <a disabled={editingKey !== ''} onClick={() => edit(record)}>
            修改主导航
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
  );
}