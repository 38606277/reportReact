import React from 'react';

import { Form, Input, Select, Button, DatePicker, Card, Row, Col,message } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import LocalStorge from '../../util/LogcalStorge.jsx';
import HttpService from '../../util/HttpService.jsx';
const localStorge = new LocalStorge();
const FormItem = Form.Item;
const Option = Select.Option;



class temp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: this.props.match.params.userId,
            userName: '',
            isAdmin: '0',
            regisType: 'local',
            encryptPwd: '',
            startDate: '',
            endDate: '',
            description: '',
            userId: '',
            timer: null


        };
    }

    //初始化加载调用方法
    componentDidMount() {

        this.state.timer = setInterval(() => {

            HttpService.post('reportServer/temp/getMax', '').then(response => {
                // alert(response);
                this.props.form.setFieldsValue({ temp: response })
            }, errMsg => {
                alert("失败");
            });

        }, 500)

    }

    componentWillUnmount() {
        if (this.state.timer != null) {

            clearInterval(this.state.timer);

        }
    }

    //
    onReadButtonClick() {
        HttpService.post('reportServer/temp/getMax', '').then(response => {
            // alert(response);
            this.props.form.setFieldsValue({ temp: response })
        }, errMsg => {
            alert("失败");

        });

    }
    //保存时调用
    onSaveClick() {
        let formInfo = this.props.form.getFieldsValue();
       
            HttpService.post("reportServer/temp/add", JSON.stringify(formInfo))
            .then(res => {
                if (res.resultCode == "1000") {
                    message.success('保存成功！');
                    this.props.form.setFieldsValue({
                        name:'',
                        vist_date:'',
                        id_number:'',
                        contact:'',
                        corp:'',
                        workplace:'',
                        temp:''
                    })
                }
                else
                    message.error('保存失败：'+res.message);

            });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
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
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 12,
                    offset: 0,
                },
                sm: {
                    span: 8,
                    offset: 4,
                },
            },
        };

        return (
            <div id="page-wrapper">
                <Card title='体温测试'>
                    <Form onSubmit={this.handleSubmit}>
                        <Row>
                            <Col xs={24} sm={12}>
                                <FormItem {...formItemLayout} label="员工姓名">
                                    {getFieldDecorator('name', {
                                        rules: [{ required: true, message: '请输入员工姓名!' }],
                                    })(
                                        <Input type='text' name='name' />
                                    )}
                                </FormItem>

                            </Col>
                            <Col xs={24} sm={12}>
                                <FormItem {...formItemLayout} label='签到日期' >
                                    {getFieldDecorator('vist_date', {
                                        rules: [{ required: true, message: '必须输入日期!' }],
                                    })(
                                        <Input type='text' name='vist_date' />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={24} sm={12}>
                                <FormItem {...formItemLayout} label="身份证号">
                                    {getFieldDecorator('id_number', {
                                        rules: [],
                                    })(
                                        <Input type='text' name='id_number' />
                                    )}
                                </FormItem>

                            </Col>
                            <Col xs={24} sm={12}>
                                <FormItem {...formItemLayout} label="联系方式">
                                    {getFieldDecorator('contact', {
                                        rules: [],
                                    })(
                                        <Input type='text' name='contact'  />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>

                      
                        <Row>
                            <Col xs={24} sm={12}>
                                <FormItem   {...formItemLayout} label="所属部门" >
                                    {
                                        getFieldDecorator('corp', {
                                            rules: []
                                        })(
                                            <Select setValue={this.form} style={{}}>
                                                <Option value="财务部">财务部</Option>
                                                <Option value="采购部">采购部</Option>
                                                <Option value="能力中心">能力中心</Option>
                                            </Select>
                                        )
                                    }
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={12} >

                                <FormItem {...formItemLayout} label="工作楼层">
                                    {getFieldDecorator('workplace', {
                                        rules: [{ required: true, message: '请输入用户名!' }],
                                    })(
                                        <Input type='text' name='workplace'  />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                      
                        <Row>
                            <Col xs={24} sm={12}>
                                <FormItem {...formItemLayout} label="体温">
                                    {getFieldDecorator('temp', {
                                        rules: [],
                                    })(
                                        <Input type='text' name='userName' style={{fontSize:30}}/>
                                    )}
                                </FormItem>
                            </Col>


                        </Row>
                        <FormItem >
                            <Button onClick={() => this.onSaveClick()} type="primary" style={{width:'100px', marginLeft:'50px', marginRight:'10px'}}>保存</Button>
                            <Button href='#temp/templist' type="primary"  style={{width:'100px',marginRight:'100px'}}>退出</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}
export default Form.create()(temp);