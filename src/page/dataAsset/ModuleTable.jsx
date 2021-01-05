import React,{useState} from 'react';
import { Table, Input, InputNumber, Popconfirm, Form ,Card,Button,Modal,message,Tag} from 'antd';


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


export default (props)=>{
    const {list}=props
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;
    const edit = (record) => {
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
          console.log(record,row)
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
      const columns=[
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '类型',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '大小',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title:"是否必填",
            dataIndex:'type',
            key:'type',
        },
        {
          title:'操作',
          dataIndex:"",
          render:(_,res)=>{
            return res.a?(<Button  shape="circle" onClick={()=>{
                console.log(1)
            }}>+</Button>):(<div>修改</div>)
              
          }  
        }
    ]
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
        <div>
            <Table
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
                scroll={{x:150,y:200}}
                 dataSource={data} 
                 showHeader={false}
                 columns={mergedColumns}
                 rowClassName="editable-row"
                 pagination={{
                   onChange: cancel,
                 }}
                 size={'small'}
                 bordered
                 title={()=>{
                     return <div>
                         表
                     </div>
                 }}
            >
            </Table> 
        </div>
    );
};