import React from 'react'
import { Card, Button, Table, Form, Input, Divider, Checkbox, Dropdown, Select, Radio, Icon, message, Modal, DatePicker, InputNumber, Switch, Row, Col, Tabs, Menu } from 'antd'
import moment from 'moment';
import 'moment/locale/zh-cn';
import { Draggable, Droppable } from 'react-drag-and-drop'


import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/sql/sql';
import 'codemirror/theme/ambiance.css';
import EditIn from './EditIn.jsx';
import EditOut from './EditOut.jsx';
import FunctionService from '../../service/FunctionService.jsx'
import HttpService from '../../util/HttpService.jsx';

import DbService from '../../service/DbService.jsx'
import './query.scss';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
const TabPane = Tabs.TabPane;
const ButtonGroup = Button.ButtonGroup;
const { Column, ColumnGroup } = Table;


const functionService = new FunctionService();
const dbService = new DbService();
const options = {

    lineNumbers: true,                //显示行号  
    mode: { name: "text/x-mysql" },          //定义mode  
    extraKeys: { "Ctrl": "autocomplete" },//自动提示配置  
    theme: "default"


};

// const abc = Loadable({
//     loader: () => import('./abc.jsx'),
//     loading: loading,
//     delay:3000
// });

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};



// moment.locales('zh-cn');
class CreateTemplate extends React.Component {

    allowDrop(ev) {
        ev.preventDefault();
    }

    drag(ev) {
        ev.dataTransfer.setData("Text", ev.target.id);
        alert(ev.target.id);
    }

    drop(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("Text");
        ev.target.appendChild(document.getElementById(data));
    }
    // constructor(props) {
    //     super(props);
    //     const { getFieldDecorator } = this.props.form;
    //     this.state = {
    //         list: [{
    //             in_name: '部门', render: '选择框'
    //         }, {
    //             in_name: '日期', render: '选择框'
    //         }],
    //         qryTemplate: <div ondrop={(event) => this.drop(event)} ondragover={(event) => this.allowDrop(event)}>
    //             <Card bodyStyle={{ padding: '5px', marginTop: '15px', minHeight: '50px', fontSize: '18px' }}>
    //                 <div style={{ textAlign: "center", verticalAlign: "middle" }}>XX查询报表</div>
    //             </Card>
    //             <Card bodyStyle={{ padding: '25px', minHeight: '200px' }}>
    //                 <div  >
    //                     <Form >
    //                         <Row>
    //                             <Col span={12}>
    //                                 <FormItem label=" 项目类别"  >
    //                                     {
    //                                         getFieldDecorator('class_id', {
    //                                             rules: [{ required: true, message: '函数名称是必须的' }],
    //                                         })(
    //                                             <Input draggable="true" ondragstart={() => this.drag(event)} style={{ minWidth: '150px' }} />
    //                                         )
    //                                     }
    //                                 </FormItem>
    //                             </Col>
    //                             <Col span={12}>
    //                                 <FormItem label=" 项目名称"    >
    //                                     {
    //                                         getFieldDecorator('class_id', {
    //                                             rules: [{ required: true, message: '函数名称是必须的' }],
    //                                         })(
    //                                             <Input style={{ minWidth: '150px' }} />
    //                                         )
    //                                     }
    //                                 </FormItem>
    //                             </Col>
    //                         </Row>
    //                         <Row>
    //                             <Col span={24}>
    //                                 <FormItem label=" 查询类别"    >
    //                                     {
    //                                         getFieldDecorator('class_id', {
    //                                             rules: [{ required: true, message: '函数名称是必须的' }],
    //                                         })(
    //                                             <Select style={{ minWidth: '300px' }} >
    //                                                 <Option value="heel">heel</Option>
    //                                             </Select>
    //                                         )
    //                                     }
    //                                 </FormItem>
    //                             </Col>
    //                         </Row>
    //                         <Row>
    //                             <Col span={24}>
    //                                 <FormItem label=" 查询类别"    >
    //                                     {
    //                                         getFieldDecorator('class_id', {
    //                                             rules: [{ required: true, message: '函数名称是必须的' }],
    //                                         })(
    //                                             <Input style={{ minWidth: '300px' }} />
    //                                         )
    //                                     }
    //                                 </FormItem>
    //                             </Col>
    //                         </Row>
    //                     </Form>
    //                 </div>
    //             </Card>
    //             <Card bodyStyle={{ padding: '5px', marginTop: '15px', minHeight: '300px' }}>
    //                 <div><Table pagination={false}>
    //                     <Column
    //                         title="查询条件"
    //                         dataIndex="in_name"
    //                         key="func_name"
    //                     />
    //                     <Column
    //                         title="显示控件"
    //                         dataIndex="render"
    //                         key="func_desc"
    //                     />
    //                     <Column
    //                         title="显示控件"
    //                         dataIndex="render"
    //                         key="func_desc"
    //                     />
    //                     <Column
    //                         title="显示控件"
    //                         dataIndex="render"
    //                         key="func_desc"
    //                     />
    //                     <Column
    //                         title="显示控件"
    //                         dataIndex="render"
    //                         key="func_desc"
    //                     />
    //                 </Table></div>
    //             </Card>
    //         </div >,
    //     };
    // }
    onSaveButtonClick() {
        this.setState({
            qryTemplate: <div>
                <Card bodyStyle={{ padding: '25px', minHeight: '200px' }}>
                    <div>查询条件111111</div>
                </Card>
                <Card bodyStyle={{ padding: '5px', marginTop: '15px', minHeight: '300px' }}>
                    <div>查询结果1111111</div>
                </Card>
            </div >
        });
    }

    render() {
        return (
            <div>
                <ul>
                    <Draggable type="fruit" data="banana"><li>Banana</li></Draggable>
                    <Draggable type="fruit" data="apple"><li>Apple</li></Draggable>
                    <Draggable type="metal" data="silver"><li>Silver</li></Draggable>
                </ul>
                <Droppable>
                    types={['fruit']}
                    onDrop={this.onDrop.bind(this)}
                    <div>hello</div>
                </Droppable>
            </div>)
    }
    onDrop(data) {
        console.log(data)
        // => banana 
    }
    // render() {



    //     return (

    //         <div id="page-wrapper" style={{ background: '#ECECEC', padding: '0px' }}>
    //             <Card title="创建模板" bodyStyle={{ padding: "5px" }} headStyle={{ height: '60px' }}
    //                 extra={
    //                     <span>
    //                         <Button style={{ marginLeft: 8 }} onClick={() => this.onSaveButtonClick()}>
    //                             保存 <Icon type="save" />
    //                         </Button>
    //                         <Button style={{ marginLeft: 8 }}>
    //                             关闭 <Icon type="close" />
    //                         </Button>
    //                     </span>

    //                 }>
    //                 <Form layout="inline">
    //                     <Row gutter={0}>
    //                         <Col span={6}>
    //                             <Card bodyStyle={{ padding: '8px' }}>
    //                                 <div style={{ padding: '15px' }}>
    //                                     <Input draggable="true" ondragstart={() => this.drag(event)} style={{ minWidth: '150px' }} />
    //                                 </div>
    //                                 <div style={{ padding: '15px' }}>
    //                                     <Input draggable="true" ondragstart={() => this.drag(event)} style={{ minWidth: '150px' }} />
    //                                 </div>
    //                                 <div style={{ padding: '15px' }}>
    //                                     <Select draggable="true" ondragstart={() => this.drag(event)} style={{ minWidth: '150px' }} />
    //                                 </div>
    //                             </Card>
    //                         </Col>

    //                         <Col span={18}>
    //                             <div >
    //                                 <Input draggable="true" ondragstart="alert('aaa')" style={{ minWidth: '150px' }} />
    //                             </div>
    //                             <div ondrop={(event) => this.drop(event)} ondragover={(event) => this.allowDrop(event)}
    //                                 style={{ height: '500px', backgroundColor: '#ececec' }}>aaa</div>
    //                             {/* {this.state.qryTemplate} */}
    //                         </Col>
    //                     </Row>
    //                 </Form>
    //             </Card>

    //         </div >
    //     );
    //}

}
export default CreateTemplate; //= Form.create({})(CreateTemplate);