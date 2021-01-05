import React from 'react';
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
    const {list,columns}=props
    const [form] = Form.useForm();
    return (
        <div>
            <Table
                scroll={{x:150,y:200}} dataSource={list} columns={columns} size={'small'}
            >
            </Table> 
        </div>
    );
};