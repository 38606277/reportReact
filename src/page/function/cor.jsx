import React, { Component } from 'react';
import { Row, Col, Input, Button, Form } from 'antd';
import 'antd/dist/antd.css';
const FormItem = Form.Item;
const { TextArea } = Input;
 
export default class Cor extends Component {
 
  constructor(props) {
    super(props)
    this.state = {
      //初始化数组长度
      arrSize: 1,
      keyWord: [],
      name: [],
      description: []
    }
    //初始化数组
    this.arr = [<span>dddd<Input/></span>,<Input/>]
  }
  //定义需要复制的控件，并合理布局
  generateROW() {
    return (
      <Row >
        <FormItem
          label="知识点关键字"
          labelCol={{ span: 11, offset: 1 }}
          wrapperCol={{ span: 10 }}
        >
          <Input style={{ width: 100, height: 28 }} />
        </FormItem>
        <FormItem
          label="资源关键字"
          labelCol={{ span: 11, offset: 1 }}
          wrapperCol={{ span: 10 }}
        >
          <Input style={{ width: 100, height: 28 }} />
        </FormItem>
        
      </Row >
    )
  }
  //单击+时实现复制控件操作
  handlePlus() {
    this.arr.push(this.generateROW())
    this.setState({ arrSize: this.state.arrSize + 1 })
  }
  //单击-时实现删除最下面的一行
  handleMinus() {
    this.arr.pop()
    this.setState({ arrSize: this.state.arrSize - 1 })
  }
  render() {
    return (
       <div >
             {/* 通过map对数组进行呈现 */
              this.arr.map(v => v)
             }
            <Button icon="plus" size="small" type="primary" ghost onClick={this.handlePlus.bind(this)} />
            <Button icon="minus" size="small" type="primary" ghost onClick={this.handleMinus.bind(this)} />
       </div>
    );
  }
}