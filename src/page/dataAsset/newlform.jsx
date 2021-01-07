import React,{useState} from 'react'
import { Form, Input, Table, Button, Card, Col,Select, Radio,Pagination, message, Tabs, Divider, Tag ,Layout,Popconfirm,Row} from 'antd';
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
  const reme=(res,G_data_source,setG_data_source)=>{
    let arr =G_data_source.filter(item=>{
      if(item.key!==res.key){
        return item
      }
    })
    setG_data_source([...arr])
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
export default ()=>{
    const [G_data_source,setG_data_source]=useState([])
    const [editingKey, setEditingKey] = useState('');
    const [form] = Form.useForm();
    const isEditing = (record) => record.key === editingKey;


    const edit = (record) => {
        // console.log(record)
        form.setFieldsValue({
          title: '',
          dataIndex: '',
          ...record,
        });
        setEditingKey(record.key);
      };
    
      const cancel =async (record) => {
        let key=record.key
         try {
          const row = await form.validateFields();//获取当前三个input中的数据
          console.log(row)
          const newData = [...G_data_source];
          const index = newData.findIndex((item) => key === item.key);
    
          if (index > -1) {
            const item = newData[index];
            newData.splice(index, 1, { ...item, ...row });
            setG_data_source(newData);
            setEditingKey('');
          } else {
            // newData.push(row);
            setG_data_source(newData);
            setEditingKey('');
          }
        } catch (errInfo) {
          console.log('Validate Failed:', errInfo);
        }
      };
    
      const save =  () => {
        setEditingKey('');
       
      };
    
      const colimnsR = [
        {
          title: 'fieldName',
          dataIndex: 'fieldName',
          width: '25%',
          editable: true,
        },
        {
          title: 'fieldType',
          dataIndex: 'fieldType',
          width: '15%',
          editable: true,
        },  
        {
          title: '操作',
          dataIndex: 'x',
          render: (_, res) => {
            const editable = isEditing(res)
              return editable?(
                <div>
                  <Tag onClick={()=>cancel(res)}>确定</Tag>
                </div>
              ):(<div>
                <Tag onClick={()=>reme(res,G_data_source,setG_data_source)}>删除</Tag>
                <Tag onClick={()=>edit(res)}>修改</Tag>
              </div>)      
          },
        },
      ];
      const mergedColumns = colimnsR.map((col) => {
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
      const addGlist=()=>{
        let str=''
        for(let i=0;i<26;i++){    
          str+=String.fromCharCode(65+i)+String.fromCharCode(97+i)+i
        }
        let n=Math.floor(Math.random()*str.length-1)
        let z=Math.floor(Math.random()*str.length-1)
        // console.log(G_data_source)
        if(G_data_source.length>0){
          let fieldNametext =G_data_source[G_data_source.length-1].fieldName
          let fieldTypetext =G_data_source[G_data_source.length-1].fieldType
          let obj={
            0:'请填写fieldName',
            1:'请填写fieldType'
          }
          let arr=[fieldNametext,fieldTypetext]
          if(obj[arr.indexOf('')]){
            message.warning(obj[arr.indexOf('')])
            return
          }
          console.log(fieldNametext,fieldTypetext)
          G_data_source.push({fieldName:'',fieldType:"",key:G_data_source.length+'H'+str[n]+str[z]})
          setG_data_source([...G_data_source])
          edit(G_data_source[G_data_source.length-1]) 
        }else{
      
         
          let arr=[{fieldName:'',fieldType:"",key:G_data_source.length+'H'}]
          setG_data_source(arr)
          edit(arr[0])
        }
      }
    return(
        <Card
            title="新建表格"
        >
            <div style={{display:'flow-root',backgroundColor: 'rgb(250, 250, 250)',margin:"20px 0"}}>
                <div style={{float:'left'}}>
                    <Radio.Group style={{ float: "left", marginRight: "30px" }}  defaultValue="xxx1 " buttonStyle="solid">
                        {
                            titleList.map((item,index)=>{
                                return (<Radio.Button value={item.value} key={index} onClick={()=>{console.log(item.value)}}>{item.title}</Radio.Button>)
                            })
                        }
                    </Radio.Group>
                </div>
                <Button type="primary" style={{float:"right"}}>保存</Button>
            </div>
            <div>
                <Form form={form} component={false}>
                    <Table
                    components={{
                        body: {
                        cell: EditableCell,
                        },
                    }}
                    bordered
                    dataSource={G_data_source}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: cancel,
                    }}
                    />
                </Form>
            </div>
        </Card>
    )
}