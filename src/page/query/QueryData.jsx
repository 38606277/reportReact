/*
* 查询模板文件
*/
import React from 'react';
import ReactDOM from 'react-dom';
import { Card, Button, Divider, Input, Form, Icon, Row, Col, Select, Table } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const Column = Table.Column;


class QueryData extends React.Component {


    render() {

        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Card title='在建工程完工情况查询'  style={{marginTop:'1px'}} bodyStyle={{ padding: '25px'}} extra={ <div>
                        <a href="#">查询 </a>
                        <Divider type="vertical" />
                        <a href="#">保存到excel</a>
                        <Divider type="vertical" />
                        <a href="#">打印</a>
                    </div>}>
                   
                    <div>
                        <Form layout="inline">
                            <Row>
                                <Col span={12}>
                                    <FormItem label=" 项目类别"    >
                                        {
                                            getFieldDecorator('class_id', {
                                                rules: [{ required: true, message: '函数名称是必须的' }],
                                            })(
                                                <Input style={{ minWidth: '300px' }} />
                                            )
                                        }
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem label=" 项目名称"    >
                                        {
                                            getFieldDecorator('class_id', {
                                            })(
                                                <Input style={{ minWidth: '300px' }} />
                                            )
                                        }
                                    </FormItem>
                                </Col>
                            </Row>
                            <Divider dashed style={{marginTop:'5px',marginBottom:'5px'}}/>
                            <Row>
                                <Col span={12}>
                                    <FormItem label=" 查询类别"    >
                                        {
                                            getFieldDecorator('class_id', {
                                                rules: [{ required: true, message: '函数名称是必须的' }],
                                            })(
                                                <Select style={{ minWidth: '300px' }} >
                                                    <Option value="heel">heel</Option>
                                                </Select>
                                            )
                                        }
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem label=" 项目开工日期"    >
                                        {
                                            getFieldDecorator('class_id', {
                                            })(
                                                <Input style={{ minWidth: '300px' }} />
                                            )
                                        }
                                    </FormItem>
                                </Col>
                            </Row>
                            <Divider  dashed style={{marginTop:'5px',marginBottom:'5px'}}/>
                            <Row>
                                <Col span={24}>
                                    <FormItem label=" 查询类别"    >
                                        {
                                            getFieldDecorator('class_id', {
                                                rules: [{ required: true, message: '函数名称是必须的' }],
                                            })(
                                                <Input style={{ minWidth: '300px' }} />
                                            )
                                        }
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                   </Card>
                   <Card style={{marginTop:'10px'}}>
                    <div><Table pagination={false}>
                        <Column
                            title="查询条件"
                            dataIndex="in_name"
                            key="func_name"
                        />
                        <Column
                            title="显示控件"
                            dataIndex="render"
                            key="func_desc"
                        />
                        <Column
                            title="显示控件"
                            dataIndex="render"
                            key="func_desc"
                        />
                        <Column
                            title="显示控件"
                            dataIndex="render"
                            key="func_desc"
                        />
                        <Column
                            title="显示控件"
                            dataIndex="render"
                            key="func_desc"
                        />
                    </Table></div>
                </Card>
            </div >
        )
    }
}
export default QueryData = Form.create()(QueryData);
