import React,{useState} from 'react'
import { Form, Input, Table, Button, Card, Col,Select, Radio,Pagination, message, Tabs, Divider, Tag ,Layout,Popconfirm,Row,InputNumber,Checkbox} from 'antd';

export default  (props) => {
  console.log(props)
  const {data,columns}=props
  console.log(data)
  return (
    <Table dataSource={data} columns={columns} >

    </Table>
  )
};