import React from 'react'
import { Card, Button, Table, Form, Input, Checkbox, Select, Radio, Icon, message, Modal, DatePicker, InputNumber, Switch } from 'antd'
import moment from 'moment';
import 'moment/locale/zh-cn'; 

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;


// moment.locales('zh-cn');
class User1 extends React.Component {

    // state = {};
    constructor() {
        super();
        this.state = {
            userInfo: {
                userName: "wwww",
                userPwd: "12345",
                birthday: moment('2018-05-01','YYYY-MM-DD')
            }

        };

    }
    componentDidMount() {
        this.props.form.setFieldsValue(this.state.userInfo);
    }
    handleSubmit1() {
        //    alert("ss")
        //    this.setState({
        //        userInfo:{
        //            userName:"xxxx"
        //        }
        //    })
        this.props.form.setFieldsValue(
            {
                userName: "kkkk",
                userPwd: "111111"
            }
        );
    }
    handleSubmit() {
        //alert("hello");
        let userInfo = this.props.form.getFieldsValue();
        console.log(JSON.stringify(userInfo))
        message.success(`${userInfo.userName} 保存成功!：${userInfo.userPwd}`)
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 8 }
        };

        const offsetLayout = {
            wrapperCol: {
                xs: 24,
                sm: {
                    span: 12,
                    offset: 4
                }
            }
        }

        return (
            <div id="page-wrapper">
            <div>
    <Button type="primary">Primary</Button>
    <Button>Default</Button>
    <Button type="dashed">Dashed</Button>
    <Button type="danger">Danger</Button>
  </div>,
            <Card title="用户登录">
                <Form layout="horizontal">
                    <FormItem label="用户名" {...formItemLayout}>
                        {getFieldDecorator('userName', {
                            initialValue: "system",
                            rules: [{ required: true, message: "用户名不参为空" }]
                        })(
                            <Input placeholder="用户名" />
                        )}
                    </FormItem>
                    <FormItem label="密码" {...formItemLayout}>
                        {getFieldDecorator('userPwd', {
                            initialValue: "system",
                            rules: [{ required: true, message: "密码不能为空" }]

                        })(
                            <Input type="password" placeholder="请输入密码" />
                        )}
                    </FormItem>
                    <FormItem label="生日" {...formItemLayout}>
                        {
                            getFieldDecorator('birthday', {
                                initialValue: moment('2018-08-08 11:11:11', moment.ISO_8601)
                            })(
                                <DatePicker
                                    showTime
                                    format="YYYY-MM-DD"
                                />
                            )
                        }
                    </FormItem>
                    {/* <FormItem label='开始时间' {...formItemLayout} >
                        {getFieldDecorator('startDate', {
                            initialValue:moment('2018-1-1'),
                            rules: [{ required: true, message: '请选择开始时间!' }],
                        })(
                            <DatePicker name='startDate'/>
                        )}
                    </FormItem> 


                    <FormItem label='失效时间' {...formItemLayout} >
                        {getFieldDecorator('endDate', {
                            initialValue:moment('2018-2-31','YYYY-MM-DD'),
                            rules: [{ required: true, message: '请选择失效时间!' }],
                        })(
                            <DatePicker/>
                        )}
                    </FormItem>*/}
                    <FormItem label="性别" {...formItemLayout}>
                        {
                            getFieldDecorator('sex', {
                                initialValue: '1'
                            })(
                                <RadioGroup>
                                    <Radio value="1">男</Radio>
                                    <Radio value="2">女</Radio>
                                </RadioGroup>
                            )
                        }
                    </FormItem>
                    <FormItem label="年龄" {...formItemLayout}>
                        {
                            getFieldDecorator('age', {
                                initialValue: 18
                            })(
                                <InputNumber />
                            )
                        }
                    </FormItem>
                    <FormItem label="当前状态" {...formItemLayout}>
                        {
                            getFieldDecorator('state', {
                                initialValue: '2'
                            })(
                                <Select>
                                    <Option value="1">咸鱼一条</Option>
                                    <Option value="2">风华浪子</Option>
                                    <Option value="3">北大才子一枚</Option>
                                    <Option value="4">百度FE</Option>
                                    <Option value="5">创业者</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem label="爱好" {...formItemLayout}>
                        {
                            getFieldDecorator('interest', {
                                initialValue: ['2', '5']
                            })(
                                <Select mode="multiple">
                                    <Option value="1">游泳</Option>
                                    <Option value="2">打篮球</Option>
                                    <Option value="3">踢足球</Option>
                                    <Option value="4">跑步</Option>
                                    <Option value="5">爬山</Option>
                                    <Option value="6">骑行</Option>
                                    <Option value="7">桌球</Option>
                                    <Option value="8">麦霸</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem label='用户角色' {...formItemLayout}>
                        {getFieldDecorator('isAdmin', {
                            initialValue: '1'
                        })
                            (
                            <Select name='isAdmin' style={{ width: 120 }}>
                                <Option value='0' >普通员工</Option>
                                <Option value='1' >管理员</Option>
                            </Select>

                            )}
                    </FormItem>
                    <FormItem label="是否已婚" {...formItemLayout}>
                        {
                            getFieldDecorator('isMarried', {
                                valuePropName: 'checked',
                                initialValue: true
                            })(
                                <Switch />
                            )
                        }
                    </FormItem>
                    <FormItem {...offsetLayout}>
                        <Button type="primary" onClick={() => this.handleSubmit()}>登 录</Button>
                        <Button type="primary" onClick={() => this.handleSubmit1()}>udate</Button>
                    </FormItem>
                </Form>
            </Card>
            </div>
        );
    }

}
export default User1 = Form.create({})(User1);