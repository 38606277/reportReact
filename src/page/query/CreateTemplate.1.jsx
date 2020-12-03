import React from 'react'
import { CloseOutlined, SaveOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import {
    Card,
    Button,
    Table,
    Input,
    Divider,
    Checkbox,
    Dropdown,
    Select,
    Radio,
    message,
    Modal,
    DatePicker,
    InputNumber,
    Switch,
    Row,
    Col,
    Tabs,
    Menu,
} from 'antd';
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
import { array } from 'prop-types';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
const TabPane = Tabs.TabPane;
const ButtonGroup = Button.ButtonGroup;
const { Column, ColumnGroup } = Table;





class CreateTemplate extends React.Component {

    state = {};
    constructor(props) {
        super(props);

        this.state = {
            in: [{
                name: "项目编码",
                render: <Input id="项目编码" value="aa" draggable="true" onDragStart={(event) => this.drag(event)} style={{ width: '100px' }} />
            },
            {
                name: "项目类型",
                render: <Input id="项目类型" value="bb" draggable="true" onDragStart={(event) => this.drag(event)} style={{ width: '100px' }} />
            },
            {
                name: "创建时间",
                render: <Input id="创建时间" value="cc" draggable="true" onDragStart={(event) => this.drag(event)} style={{ width: '100px' }} />
            },
            {
                name: "项目经理",
                render: <Input id="项目经理" value="dd" draggable="true" onDragStart={(event) => this.drag(event)} style={{ width: '100px' }} />
            }
            ],
            inLayout: [{
                render: <div/>
            },{
                render: <div/>
            },{
                render: <div/>
            },{
                render: <div/>
            }
            ],
            project: "aaa",
            components: {
                c1: <Input id="1" value="1" />,
                C2: <Input id="1" value="2" />,
                C3: <Input id="1" value="3" />
            }
        }
    }
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

    drop(ev, colIndex) {
        // alert(ev.dataTransfer.getData("param"));
        // ev.preventDefault();
        let param = ev.dataTransfer.getData("param");
        // let aInput = this.state.in[param];
        // let t = ev.target.id;
        // this.state.in[1] = aInput;
        let aIn=this.state.in[param];
        let inLayout = this.state.inLayout;
        inLayout[colIndex]=aIn;
        //com[key] = <Input value="aa" />;
        this.setState({ inLayout: inLayout });
    }
    drag(ev) {
        ev.dataTransfer.setData("param", ev.target.id);
    }

    // render() {
    //     return (
    //         <div>
    //             <Card id="div1" onDrop={(ev) => this.drop(ev)} style={{ width: '198px', height: '66px', padding: '10px', border: '1px solid #aaaaaa' }}
    //                 onDragOver={(ev) => ev.preventDefault()}>
    //                 {/* <Row>
    //                     <Col onDrop={(ev) => this.drop(ev)}   onDragOver={(ev) => ev.preventDefault()}>col1{this.state.aComponet}</Col>
    //                     <Col>col2</Col>
    //                 </Row>
    //                  */}
    //                 {this.state.aComponet}
    //             </Card>
    //             <Input id="drag1" draggable="true"
    //                 onDragStart={(event) => this.drag(event)} style={{width:'100px'}} />
    //             <Input id="drag2" draggable="true"
    //                 onDragStart={(event) => this.drag(event)} style={{width:'100px'}}/>
    //         </div>)
    // }
    render() {



        return (
            <div id="page-wrapper" style={{ background: '#ECECEC', padding: '0px' }}>
                <Card title="创建模板" bodyStyle={{ padding: "5px" }} headStyle={{ height: '60px' }}
                    extra={
                        <span>
                            <Button style={{ marginLeft: 8 }} onClick={() => this.onSaveButtonClick()}>
                                保存 <SaveOutlined />
                            </Button>
                            <Button style={{ marginLeft: 8 }}>
                                关闭 <CloseOutlined />
                            </Button>
                        </span>

                    }>
                    <Row gutter={0}>
                        <Form layout="inline">
                            <Col span={10}>
                                <Card>
                                    {this.state.in.map((item) =>
                                        <Row>
                                            <Col>{item.name}</Col>
                                            <Col>{item.render}</Col>
                                        </Row>)

                                    }
                                </Card>
                            </Col>

                            <Col span={14}>


                                <Card >
                                    <Row>
                                        {
                                            // Object.keys(this.state.components).map((key) =>
                                            //     <Col style={{ border: "1px solid red", height: "80px", width: "400px" }}
                                            //         onDrop={(ev) => this.drop(ev, key)}
                                            //         onDragOver={(ev) => ev.preventDefault()}>
                                            //         {this.state.components[key]}
                                            //     </Col>)
                                            this.state.inLayout.map((item,index) =>
                                                <Col style={{ border: "1px solid red", height: "80px", width: "400px" }}
                                                    onDrop={(ev) => this.drop(ev, colindex)}
                                                    onDragOver={(ev) => ev.preventDefault()}>
                                                    {item.render}
                                                </Col>)

                                        }
                                    </Row>


                                </Card>

                            </Col>
                        </Form>
                    </Row>
                </Card>

            </div >
        );
    }

}
export default CreateTemplate; //= Form.create({})(CreateTemplate);