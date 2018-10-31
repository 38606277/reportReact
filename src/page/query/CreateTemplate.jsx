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
                render: <div>项目编码<Input id="0" value="aa" draggable="true" onDragStart={(event) => this.drag(event)} style={{ width: '100px' }} /></div>
            },
            {
                name: "项目类型",
                render: <div id="1" draggable="true" onDragStart={(event) => this.drag(event)}>项目类型:<Select value="bb" style={{ width: '100px' }} /></div>
            },
            {
                name: "创建时间",
                render: <div>创建时间<Input id="2" value="cc" draggable="true" onDragStart={(event) => this.drag(event)} style={{ width: '100px' }} /></div>
            },
            {
                name: "项目经理",
                render: <div>项目经理<Input id="3" value="dd" draggable="true" onDragStart={(event) => this.drag(event)} style={{ width: '100px' }} /></div>
            }
            ],
            inLayout: [{
                render: <div />
            }, {
                render: <div />
            }, {
                render: <div />
            }, {
                render: <div />
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



    drop(ev, colIndex) {
        // alert(ev.dataTransfer.getData("param"));
        // ev.preventDefault();
        let param = ev.dataTransfer.getData("param");
        // let aInput = this.state.in[param];
        // let t = ev.target.id;
        // this.state.in[1] = aInput;
        let aIn = this.state.in[param];
        let inLayout = this.state.inLayout;
        inLayout[colIndex] = aIn;
        //com[key] = <Input value="aa" />;
        this.setState({ inLayout: inLayout });
    }
    drag(ev) {
        ev.dataTransfer.setData("param", ev.target.id);
    }
    onSaveButtonClick(){
        alert(this.refs.in.innerHTML);
    }

    render() {
        return (

            <div id="page-wrapper" style={{ background: '#ECECEC', padding: '0px' }}>
                <Card title="创建模板" bodyStyle={{ padding: "5px" }} headStyle={{ height: '60px' }}
                    extra={
                        <span>
                            <Button style={{ marginLeft: 8 }} onClick={() => this.onSaveButtonClick()}>
                                保存 <Icon type="save" />
                            </Button>
                            <Button style={{ marginLeft: 8 }}>
                                关闭 <Icon type="close" />
                            </Button>
                        </span>

                    }>
                    <Row gutter={0}>

                        <Col span={6}>
                            <Card>
                                {this.state.in.map((item, index) =>
                                    <Row>
                                        <Col>{item.render}</Col>
                                    </Row>)

                                }
                            </Card>
                        </Col>

                        <Col span={18}>


                            <Card  ref='in'>
                                <Row>
                                    {
                                        // Object.keys(this.state.components).map((key) =>
                                        //     <Col style={{ border: "1px solid red", height: "80px", width: "400px" }}
                                        //         onDrop={(ev) => this.drop(ev, key)}
                                        //         onDragOver={(ev) => ev.preventDefault()}>
                                        //         {this.state.components[key]}
                                        //     </Col>)
                                        this.state.inLayout.map((item, index) => {
                                        if(index)  
                                        return(
                                        <Col span={12} style={{ border: "1px dotted #785", height: "50px" }}
                                           onDrop={(ev) => this.drop(ev, index)}
                                           onDragOver={(ev) => ev.preventDefault()}>
                                            {item.render}
                                        </Col>);
                                            
                                        })

                                    }
                                </Row>


                            </Card>

                        </Col>
                    </Row>
                </Card>

            </div >
        );
    }

}
export default CreateTemplate; //= Form.create({})(CreateTemplate);