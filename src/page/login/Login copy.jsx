import React from 'react'
import { Form, Input, Button, Card, Row, Col } from 'antd'
const FormItem = Form.Item;
import './Login.css';

class Login extends React.Component {



    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div id="b">
                <Row>
                    <Col span={8}>col-8</Col>
                    <Col span={8}><Card title="登录报表平台">
                        <Form className="login-form">
                            <FormItem>
                                {getFieldDecorator('username', {
                                    initialValue: 'admin',
                                    rules: [{ validator: this.checkUsername }]
                                })(
                                    <Input placeholder="用户名" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('password', {
                                    initialValue: 'admin',
                                    rules: [{ validator: this.checkPassword }]
                                })(
                                    <Input type="password" placeholder="密码" wrappedcomponentref={(inst) => this.pwd = inst} />
                                )}
                            </FormItem>
                            <FormItem>
                                <Button type="primary" onClick={window.location = "#/"} className="login-form-button">
                                    登录
                    </Button>
                            </FormItem>
                        </Form>
                    </Card></Col>
                    <Col span={8}>col-8</Col>
                </Row>

            </div>
        )
    }
}
export default Login= Form.create({})(Login);
