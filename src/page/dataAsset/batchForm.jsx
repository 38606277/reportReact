import React, { useState ,useEffect,useRef} from 'react';
import { Form, Icon as LegacyIcon } from '@ant-design/compatible';
import {
    Table,
    Divider,
    Button,
    Card,
    Tree,
    Input,
    Spin,
    Row,
    Col,
    Select,
    Tooltip,
    Radio,
    Modal,
    Tag,
    Popconfirm,
    message,
    Collapse,
    Popover 
} from 'antd';
import HttpService from '../../util/HttpService.jsx';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/sql/sql';
import 'codemirror/theme/ambiance.css';
import 'codemirror/mode/shell/shell';
import 'codemirror/addon/display/placeholder'; 
import 'codemirror/addon/hint/show-hint.css'; // 用来做代码提示
import 'codemirror/addon/hint/show-hint.js'; // 用来做代码提示
import 'codemirror/addon/hint/sql-hint.js'; // 用来做代码提示
import DbService from '../../service/DbService.jsx'
const FormItem = Form.Item;
const Option = Select.Option;
const dbService = new DbService();
const { Panel } = Collapse;
const formItemLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 }
};
export default (props)=>{
    const {TbatchForm,n,y,ModData}=props
    const editorsql=useRef();
    const [dbList,setdbList]=useState([])//数据库
    const [Dbname,setDbname]=useState("")//所选中数据库
    const [TypeList,setTypeList]=useState([])//数据库有类型
    const [TypeName,setTypeName]=useState("")//数据库类型
    const ok=()=>{
        y()
    }
    const on=()=>{
        n()
    }
    useEffect(()=>{
        dbService.getDbList().then(res => {
            setdbList(res );
        });
        getTypelist("dbtype")
        setDbname(ModData.db_type)
        setTypeName(ModData.db_source)
    },[TbatchForm])
    console.log(ModData)
    const getTypelist=(dict_code)=>{
        HttpService.post("reportServer/mdmDict/getDictValueByDictCode", JSON.stringify({dict_code}))
        .then(res => {
            if (res.resultCode == '1000') {
                setTypeList( res.data);
            }
            else
                message.error(res.message);
        });
    }
    return (<Modal 
            title={"批量建表"}
            cancelText='取消'
            okText='保存'
            visible={TbatchForm}
            destroyOnClose={true}
            onOk={()=>ok()}
            width={1200}
            onCancel={()=>{
                on()
            }}
        >
            <Collapse accordion>
                <Panel header="输入" key="1">
                    <Row>
                    <Col>
                        <FormItem label="选择数据库" {...formItemLayout} style={{ marginBottom: "8px",marginTop:'-8px' }}>
                                <Select value={Dbname} size="small" style={{ minWidth: '100px' }} onChange={(value)=>setDbname(value)} >
                                    {dbList.map(item => <Option key={item.name} value={item.name}>{item.name}</Option>)}
                                </Select>
                            </FormItem>
                        </Col>
                        <Col>
                            <FormItem label="选择类型" {...formItemLayout} style={{ marginBottom: "8px",marginTop:'-8px' }}>
                                <Select value={TypeName} style={{ minWidth: '100px' }} onChange={value=>setTypeName(value)}>
                                    {TypeList.map(item => <Option key={item.value_name} value={item.value_name}>{item.value_name}</Option>)}
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <CodeMirror 
                        ref={editorsql}
                        value='' 
                        style={{ height: '300px', width: '450px', border: "2px solid red" }} 
                        options={{
                            lineNumbers: true,//显示行号  
                            mode: {name: "text/x-mysql"},//定义mode  
                            extraKeys: { "Tab": "autocomplete" },//快捷键自动提示配置  
                            theme: "default",
                            hintOptions: {// 自定义提示选项
                                completeSingle: false,// 当匹配只有一项的时候是否自动补全
                            }
                    }}/>
                </Panel>
                <Panel header="输出" key="2">
                    <Table
                        style={{width:'100%', maxWidth:'1000px',overflow:'auto'}}
                        columns={[]}
                        dataSource={[]}
                        >
                    </Table>
                </Panel>
            </Collapse >
           
    </Modal>)
}