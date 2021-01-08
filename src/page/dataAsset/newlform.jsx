import React,{useState} from 'react'
import { Form, Input, Table, Button, Card, Col,Select, Radio,Pagination, message, Tabs, Divider, Tag ,Layout,Popconfirm,Row,InputNumber,Checkbox} from 'antd';
import ModuleTable from './ModuleTable'
const EditableCell = ({//栏位
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const Types=inputType==="number"? <InputNumber />:<Checkbox.Group options={[""]}/>//是inputnumber 还是选择
    const inputNode = inputType === 'text' ?<Input />  : Types;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
          >
            {...inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
  const EditableCell2=({//栏位
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    // const [none,setnone]=useState('')
    // const handleChange=(value)=>{
    //   setnone(value)
    // }
    const inputNode = inputType === 'name' ?<Input />  :   <Input />
    // <Select defaultValue="lucy" style={{ width: 120 }} value={none} onChange={handleChange}>
    //                                                             <Option value="jack">Jack</Option>
    //                                                             <Option value="lucy">Lucy</Option>
    //                                                             <Option value="disabled" disabled>
    //                                                               Disabled
    //                                                             </Option>
    //                                                             <Option value="Yiminghe">yiminghe</Option>
    //                                                           </Select>;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
          >
            {...inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
  const EditableCell3=({//栏位
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === 'name' ?<Input />  :   <Input />
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
          >
            {...inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
  const reme=(res,data,setdata)=>{
    console.log(data)
    let arr =data.filter(item=>{
      if(item.key!==res.key){
        return item
      }
    })
    setdata([...arr])
    console.log(arr)
  }
  const preservation=(G_data_source)=>{
    console.log(G_data_source)
  }
const titleList=[
    {
        title:"栏位",
        value:'xxx1'
    },
    {
        title:"索引",
        value:'xxx2'
    },
    {
        title:"外键",
        value:'xxx3'
    },
    {
        title:"选项",
        value:'xxx4'
    },
    {
        title:"注释",
        value:'xxx5'
    },
    {
        title:"预览",
        value:'xxx6'
    },
]
const MyTable=(props)=>{
  let {form,EditableCell,data,mergedColumns,cancel,formText}=props
  return(
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
      rowClassName={"editable-row"+formText}
      pagination={{
          onChange:cancel
      }}
      />
  </Form>
  )
}
export default (props)=>{
    const [G_data_source,setG_data_source]=useState([])//栏位
    const [editingKey, setEditingKey] = useState('');//栏位
    const [form] = Form.useForm();
    const isEditing = (record) => record.key === editingKey;//栏位
    const [formText,setformText]=useState('xxx1')

    const [Indexes,setIndexes]=useState([])//索引
    const [editingKey2, setEditingKey2] = useState('');
    const [form2] = Form.useForm();
    const isEditing2 = (record) => record.key === editingKey2;


    const [ForeignKey,setForeignKey]=useState([])
    const [editingKey3, setEditingKey3] = useState('');
    const [form3] = Form.useForm();
    const isEditing3 = (record) => record.key === editingKey3;
    const edit = (record,form,setEditingKey) => {
        form.setFieldsValue({
          title:'',
          dataIndex: '',
          ...record,
        });
        setEditingKey(record.key);
      };
    const cancel =async (record,data,setdata,setEditingKey,form) => {
      let key=record.key
        try {
        const row = await form.validateFields();//获取当前三个input中的数据
        console.log(row)
        const newData = [...data];
        const index = newData.findIndex((item) => key === item.key);
  
        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, { ...item, ...row });
          setdata(newData);
          setEditingKey('');
        } else {
          // newData.push(row);
          setdata([...newData]);
          setEditingKey('');
        }
      } catch (errInfo) {
        console.log('Validate Failed:', errInfo);
      }
    };
    
    const colimnsR = [//栏位
      {
        title: '名',
        dataIndex: 'name',
        width: '20%',
        editable: true,
      },
      {
        title: '类型',
        dataIndex: 'Class',
        width: '20%%',
        editable: true,
      },  
      {
        title:"长度",
        dataIndex:"len",
        width:"20%",
        editable: true,
      },
      {
        title:"小数点",
        dataIndex:"decimal",
        width:"10%",
        editable: true,
      },
      {
        title:"是否必填",
        dataIndex:"chek",
        width:"10%",
        editable: true
      },
      {
        title: '操作',
        dataIndex: 'x',
        render: (_, res) => {
          const editable = isEditing(res)
            return editable?(
              <div>
                <Tag onClick={()=>cancel(res,G_data_source,setG_data_source,setEditingKey,form)}>确定</Tag>
              </div>
            ):(<div>
              <Tag onClick={()=>edit(res,form,setEditingKey)}>修改</Tag>
              <Tag onClick={()=>reme(res,G_data_source,setG_data_source)}>删除</Tag>
            </div>)      
        },
      },
    ];
    const colimnsE=[//索引
      {
        title:"名",
        dataIndex:"name",
        width:"20%",
        editable:true
      },{
        title:"栏位",
        dataIndex:"Field",
        width:"20%",
        editable:true
      },{
        title:"索引类型",
        dataIndex:"FClass",
        width:"20%",
        editable:true
      },{
        title:"索引方法",
        dataIndex:"FCmethod",
        width:"20%",
        editable:true
      },,
      {
        title: '操作',
        dataIndex: 'x',
        render: (_, res) => {
          const editable = isEditing2(res)
            return editable?(
              <div>
                <Tag onClick={()=>cancel(res,Indexes,setIndexes,setEditingKey2,form2)}>确定</Tag>
              </div>
            ):(<div>
              <Tag onClick={()=>edit(res,form,setEditingKey2)}>修改</Tag>
              <Tag onClick={()=>reme(res,Indexes,setIndexes)}>删除</Tag>
            </div>)      
        },
      },
    ]
    const colimnsF=[//外键
      {
        title:"名",
        dataIndex:"name",
        width:"20%",
        editable:true
      },{
        title:"栏位",
        dataIndex:"Field",
        width:"20%",
        editable:true
      },{
        title:"索引类型",
        dataIndex:"FClass",
        width:"20%",
        editable:true
      },{
        title:"索引方法",
        dataIndex:"FCmethod",
        width:"20%",
        editable:true
      },,
      {
        title: '操作',
        dataIndex: 'x',
        render: (_, res) => {
          const editable = isEditing3(res)
            return editable?(
              <div>
                <Tag onClick={()=>cancel(res,editingKey3, setEditingKey3,setEditingKey3,form3)}>确定</Tag>
              </div>
            ):(<div>
              <Tag onClick={()=>edit(res,form3,setEditingKey3)}>修改</Tag>
              <Tag onClick={()=>reme(res,ForeignKey,setForeignKey)}>删除</Tag>
            </div>)      
        },
      },
    ]
      const mergedColumns = (data,text,isEditing)=>{
        return data.map((col) => {
          if (!col.editable) {
            return col;
          }
          const strinput={
            "xxx1":col.dataIndex === 'len'|| col.dataIndex === 'chek'?col.dataIndex === 'chek'?'check': 'number' : 'text',
            "xxx2":col.dataIndex ==='name'?'name':'text'
          }
          return {
            ...col,
            onCell: (record) => ({
              record,
              inputType:strinput[text],
              dataIndex: col.dataIndex,
              title: col.title,
              editing: isEditing(record),
            }),
          };
        });
      }
      const addGlist=(text)=>{//添加
        let str=''
        for(let i=0;i<26;i++){    
          str+=String.fromCharCode(65+i)+String.fromCharCode(97+i)+i
        }
        let n=Math.floor(Math.random()*str.length-1)
        let z=Math.floor(Math.random()*str.length-1)
        const arrobj={
          "xxx1":{
            myarr:[...G_data_source],
            setmyarr:setG_data_source,
            form:form,
            setEditingKey:setEditingKey,
          },
          "xxx2":{
            myarr:[...Indexes],
            setmyarr:setIndexes,
            form:form2,
            setEditingKey:setEditingKey2
          },
          "xxx3":{
            myarr:[...ForeignKey],
            setmyarr:setForeignKey,
            form:form3,
            setEditingKey:setEditingKey3
          }
        }
        const data=arrobj[text]
        const obj={
          "xxx1":{
            name:"",
            key:formText+data.myarr.length+'H'+str[n]+str[z],
            Class:"",
            len:"",
            decimal:"",
            chek:[]
          },
          "xxx2":{
            name:"",
            key:formText+data.myarr.length+'H'+str[n]+str[z],
            Field:"",
            FClass:"",
            FCmethod:""
          },
          "xxx3":{
            name:"",
            key:formText+data.myarr.length+'H'+str[n]+str[z],
            Field:"",
            Rlibrary:"",
            Rfrom:"",
            RField:""
          }
        }
        if(data.myarr.length>0){
          data.myarr.push({...obj[text]})
          data.setmyarr([...data.myarr])
          edit(data.myarr[data.myarr.length-1],data.form,data.setEditingKey)
        }else{
          let arr=[{...obj[text]}]
          data.setmyarr(arr)
          edit(arr[0],data.form,data.setEditingKey)
        }
      }
      const copy=(text)=>{
        const myobj={
          "xxx1":{
            arr:[...G_data_source],
            setarr:setG_data_source
          },
          "xxx2":{
            arr:[...Indexes],
            setarr:setIndexes
          },
            "xxx3":{
              arr:[...ForeignKey],
              setarr:setForeignKey
            }
        }
        const obj=myobj[text]
        if(myobj[text].arr.length>0){
          obj.arr.push({...obj.arr[obj.arr.length-1]['key']=obj.arr[obj.arr.length-1].key+(obj.arr.length-1+"")})
          obj.setarr([...obj.arr])
        }
      
      }
    const formList={
      "xxx1": <MyTable formText={formText} form={form} EditableCell={EditableCell} data={G_data_source} mergedColumns={mergedColumns(colimnsR,'xxx1',isEditing,form)} cancel={cancel}></MyTable>,//栏位
      "xxx2": <MyTable formText={formText} form={form2} EditableCell={EditableCell2} data={Indexes} mergedColumns={mergedColumns(colimnsE,'xxx2',isEditing2,form2)} cancel={cancel}></MyTable>,
      "xxx3": <MyTable formText={formText} form={form3} EditableCell={EditableCell3} data={ForeignKey} mergedColumns={mergedColumns(colimnsF,'xxx3',isEditing3,form3)} cancel={cancel}></MyTable>,
      "xxx4":<div>选项</div>,
      "xxx5":<div>注释</div>,
      "xxx6":<div>浏览</div>,
    }
    return(
        <Card>
            <div style={{display:'flow-root',backgroundColor: 'rgb(250, 250, 250)',margin:"20px 0"}}>
                <div style={{float:'left'}}>
                    <Radio.Group style={{ float: "left", marginRight: "30px" }}  defaultValue="xxx1 " buttonStyle="solid">
                        {
                            titleList.map((item,index)=>{
                                return (<Radio.Button value={item.value} key={index} onClick={()=>{setformText(item.value)}}>{item.title}</Radio.Button>)
                            })
                        }
                    </Radio.Group>
                </div>
                <Button onClick={()=>addGlist(formText)}>添加</Button>
                <Button onClick={()=>{copy(formText)
                  console.log('复制')
                }}>复制</Button>
                <Button type="primary" style={{float:"right"}}>保存</Button>
            </div>
            <div>
              {formList[formText]}
              {/* <></> */}
            </div>
        </Card>
    )
}