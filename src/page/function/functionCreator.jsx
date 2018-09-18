import React from 'react'
import { Card, Button, Table, Form, Input, Divider, Checkbox, Select, Radio, Icon, message, Modal, DatePicker, InputNumber, Switch, Row, Col } from 'antd'
import moment from 'moment';
import 'moment/locale/zh-cn';

import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/sql/sql';
import 'codemirror/theme/ambiance.css';
import EditableTable from './EditTable.jsx';
import FunctionService from '../../service/FunctionService.jsx'
import DbService from '../../service/DbService.jsx'

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;

const functionService = new FunctionService();
const dbService = new DbService();
const options = {

    lineNumbers: true,                //显示行号  
    mode: { name: "text/x-mysql" },          //定义mode  
    extraKeys: { "Ctrl": "autocomplete" }//自动提示配置  


};

var data = [
    {
        "in_name": "b",
        "isformula": "false",
        "datatype": "varchar",
        "func_id": 36,
        "dict": "数据字典/会计科目",
        "in_id": "period_num"
    },
    {
        "in_name": "a",
        "isformula": "false",
        "datatype": "varchar",
        "func_id": 36,
        "dict": "数据字典/查询公司信息",
        "in_id": "period_year"
    }
];

var data1 = [
    {
        "in_name": "b",
        "isformula": "false",
        "datatype": "varchar",
        "func_id": 36,
        "dict": "数据字典/会计科目",
        "in_id": "period_num"
    }
];

// for (let i = 0; i < 3; i++) {
//     data.push({
//         key: i.toString(),
//         name: `Edrward ${i}`,
//         age: 32,
//         address: `London. ${i}`,
//     });
// }

// moment.locales('zh-cn');
class functionCreator extends React.Component {

     state = {};
    constructor(props) {
        super(props);
        // alert(this.props.match.params.funcid);
        this.state = {
            
            inData:[],
            outData:data1,
            list:[],
            dblist:[],
            funcid:this.props.match.params.funcid,
            userInfo: {
                userName: "wwww",
                userPwd: "12345",
                birthday: moment('2018-05-01', 'YYYY-MM-DD')
            }

        };



    }
    componentDidMount() {
        //this.loadUserList();
       
        functionService.getFunctionByID(this.state.funcid)
            .then(res => {
                //this.setState({ list: res })
                //console.log(this.state.list);
                // this.inData=JSON.stringify(data);
                const  ddd = [
                    {
                        "in_name": "b",
                        "isformula": "false",
                        "datatype": "varchar",
                        "func_id": 36,
                        "dict": "数据字典/会计科目",
                        "in_id": "period_num"
                    }
                ];
                this.setState({inData:res.in});
                this.setState({outData:res.out});
                this.props.form.setFieldsValue(res);
                //this.refs.editorsql.codeMirror.setValue=JSON.stringify(res.program);
                var a = this.refs.editorsql;
                a.codeMirror.setSize('450px', '500px');
                a.codeMirror.border = "solid  1px";
                a.codeMirror.setValue(res.program);
                //  alert(JSON.stringify(res.out));
                //  alert(JSON.stringify(this.state.outData));
                //this.setState({data:this.res});

              //  console.log(this.state.data);
            });

        dbService.getDbList()
        .then(res => {
            this.setState({dblist:res});
        } );

        //this.props.form.setFieldsValue(this.state.userInfo);
       
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
    onGenerateClick(){
        let aSQL=this.refs.editorsql.codeMirror.getValue();
        
        functionService.getSqlInOut(aSQL)
        .then(res => {
           if(res.resultCode=1000)
           {
             alert(JSON.stringify(res.data));
             message.success('生成成功!')
             this.setState({inData:res.data});
           }else
           {
              message.error(res.message);
           }
        } );
        
       
        
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 8 }
        };
        const formItemLayout1 = {
            labelCol: { span: 5 },
            wrapperCol: { span: 10 }
        };

        const formItemLayout2 = {
            labelCol: { span: 5 },
            wrapperCol: { span: 15 }
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

        const columns = [{
            title: '参数名',
            dataIndex: 'userId',
            key: 'userId',
            width: '150px'
        }, {
            title: '参数说明',
            dataIndex: 'userName',
            key: 'userName',
            width: '150px',
            render: function (text, record, index) {
                return <Link to={`/user/userInfo/${record.id}`}>{text}</Link>;
            }
        }, {
            title: '参数类型',
            dataIndex: 'description',
            key: 'description',
            width: '150px'
        }, {
            title: '数据字典',
            dataIndex: 'isAdminText',
            key: 'isAdminText',
            width: '150px'
        }, {
            title: '数据权限',
            dataIndex: 'creationDate',
            key: 'creationDate',
            width: '150px'
        }];

        const rowObject = {
            minRows: 4, maxRows: 600
        }

        return (


            // <div id="page-wrapper" style={{ background: '#ECECEC', padding: '10px' }}>


            <Card title="创建函数" bodyStyle={{ padding: "3px" }}>
                <Row gutter={1}>

                    <Col span={10}>
                        <Card bodyStyle={{ padding: "3px" }}>
                            <Button icon="plus" onClick={()=>this.onGenerateClick()} size="small" style={{ marginRight: "10px" }} >生成函数</Button>
                            <Button icon="edit" style={{ marginRight: "10px" }} size="small" >保存</Button>
                            <Button icon="delete" style={{ marginRight: "10px" }} size="small"  >退出</Button>
                            {/* <Divider orientation="left">选择数据库</Divider> */}
                            <Form layout="horizontal">
                                <FormItem label="选择数据库" labelCol={{ span: 6 }} wrapperCol={{ span: 10 }}>
                                    {
                                        getFieldDecorator('db', {
                                            initialValue: '0'
                                        })(
                                            <Select>
                                            {this.state.dblist.map(d => <Option key={d.name}>{d.name}</Option>)}
                                                {/* <Option value="0">ERP</Option>
                                                <Option value="1">预算</Option>
                                                <Option value="2">BI</Option>
                                                <Option value="3">Form</Option> */}
                                            </Select>
                                        )
                                    }
                                </FormItem>
                                <Divider orientation="left">输入SQL</Divider>
                                <div style={{ height: '600px', border: "1px" }}>
                              <CodeMirror ref="editorsql" value='select * from AAA' style={{ height: '600px', border: "1px" }} options={options} />
                              
                          
                                   
                                </div>

                            </Form>
                        </Card>
                    </Col>

                    <Col span={14}>
                        <Card bodyStyle={{ padding: '1px' }}>
                            <FormItem label="函数名称" style={{ marginBottom: "1px" }} {...formItemLayout1}>
                                {
                                    getFieldDecorator('id', {
                                        initialValue: ''
                                    })(

                                        <Input suffix={<Icon type="search" className="certain-category-icon" />} />
                                    )
                                }
                            </FormItem>
                            <FormItem label="函数说明" {...formItemLayout2}>
                                {
                                    getFieldDecorator('desc', {
                                        initialValue: ''
                                    })(
                                        <Input />

                                    )
                                }
                            </FormItem>


                            <Divider orientation="left">输入参数</Divider>

                            {/* <Table columns={columns} /> */}
                            <EditableTable data={this.state.inData} />



                            <Divider orientation="left">输出参数</Divider>

                            <EditableTable data={this.state.outData}/>
                        </Card>
                    </Col>
                </Row>
            </Card>

            // </div >
        );
    }

}
export default functionCreator = Form.create({})(functionCreator);