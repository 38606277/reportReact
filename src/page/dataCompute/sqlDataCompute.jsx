import React from 'react'
import { Form, Icon as LegacyIcon } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { BarsOutlined, SaveOutlined,DownloadOutlined,CaretRightOutlined,SyncOutlined } from '@ant-design/icons';
import { Card, Button, Table, Input,  Collapse ,  Select, message,  Modal,  Row,  Col} from 'antd';
import SplitPane  from 'react-split-pane';
import ExportJsonExcel from "js-export-excel";
import 'moment/locale/zh-cn';

import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/sql/sql';
import 'codemirror/theme/ambiance.css';
import 'codemirror/mode/shell/shell';
import 'codemirror/addon/display/placeholder'; 
import 'codemirror/addon/hint/show-hint.css'; // 用来做代码提示
import 'codemirror/addon/hint/show-hint.js'; // 用来做代码提示
import 'codemirror/addon/hint/sql-hint.js'; // 用来做代码提示

import HttpService from '../../util/HttpService.jsx';
import DbService from '../../service/DbService.jsx'
import "@babel/polyfill";
import './Query.scss';

const FormItem = Form.Item;
const Option = Select.Option;
const { Panel } = Collapse;
const dbService = new DbService();

function  callback(key) {
    console.log(key);
  }

class SqlCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dbList:[],
            list: [],
            columnlist: [],
            datalist: [],
            //定义下拉查找的数据
            loading: false,
            visible: false, qry_file: null,
            pageNum: 1, perPage: 10, totald: 0,name:"",id:"",fromdb:"",infoname:"",tables:{}
        };
    }
    componentDidMount() {
        //初始100%
        const h=document.getElementsByClassName('navbar-side')[0].offsetHeight
        const dom =document.getElementById('page-wrapper')
        dom.style.height=h+"px"
        this.resetInput();
        //查询DB定义
        dbService.getDbList().then(res => {
            this.setState({ dbList: res });
        });
        this.nameList();
       
    }

    nameList(){
         //查询查询类别定义
         HttpService.post("reportServer/selectsql/getAllPage", JSON.stringify({startIndex:this.state.pageNum,perPage:this.state.perPage,name:""}))
         .then(res => {
             if (res.resultCode == '1000') {
                 this.setState({ list: res.data.list });
             }
             else
                 message.error(res.message);
         });
    }

    resetInput(){
        this.props.form.setFieldsValue({name:"",fromdb:"",id:""});
        this.setState({infoname:"",tables:{}});
    }

    async  handleSubmit() {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                
                let formInfo = this.props.form.getFieldsValue();
                formInfo.selectsql = this.refs.editorsql.codeMirror.getValue();
                if(null==formInfo.id || ""==formInfo.id){
                    this.setState({visible:true});
                }else{
                    HttpService.post("reportServer/selectsql/saveSelectSql", JSON.stringify(formInfo))
                    .then(res => {
                        if (res.resultCode == "1000") {
                            if(res.data.result){
                                message.success(res.data.info);
                                this.props.form.setFieldsValue({ id: res.data.id });
                                this.setState({id:res.data.id});
                                this.nameList();
                            }else{
                                message.error(res.data.info);
                            }
                        }
                        else
                            message.error(res.message);
                    });
                }
            }
        });

    }

    showModal = () => {
        this.setState({
          visible: true,
        });
      };
    
      hideModal = () => {
        let formInfo = this.props.form.getFieldsValue();
        formInfo.selectsql = this.refs.editorsql.codeMirror.getValue();
        HttpService.post("reportServer/selectsql/saveSelectSql", JSON.stringify(formInfo))
        .then(res => {
            if (res.resultCode == "1000") {
                if(res.data.result){
                    message.success(res.data.info);
                    this.props.form.setFieldsValue({ id: res.data.id });
                    this.setState({id:res.data.id});
                    this.nameList();
                }else{
                    message.error(res.data.info);
                }
            }
            else
                message.error(res.message);
        });
        this.setState({
          visible: false,
        });

      };

      changeValue(e){
        this.setState({name:e.target.value});
        this.props.form.setFieldsValue({name:e.target.value});
        
      }
    onGenerateClick() {
        this.setState({ loading: true });
        let aSQL = this.refs.editorsql.codeMirror.getValue();
        const column=[];
        if(null==aSQL || ""==aSQL){
            this.setState({ loading: false });
            message.error("请输入SQL");
            return false;
        }
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const infofrom=this.props.form.getFieldsValue();
                HttpService.post("reportServer/selectsql/excueSelectSql", JSON.stringify({selectsql:aSQL,fromdb:infofrom.fromdb}))
                .then(res => {
                    this.setState({ loading: false });
                    if (res.resultCode == "1000") {
                        if(null!=res.data.data && res.data.result){
                            let obj = res.data.data[0];
                            for(var key in obj){
                                let json = {
                                    key: key, title: key.toUpperCase(), dataIndex: key 
                                };
                                column.push(json);
                            }
                            this.setState({
                                columnlist:column,
                                datalist:res.data.data
                            });
                            message.success(`查询成功！`)
                        }else{
                            message.error(res.data.info);
                        }
                       
                    }
                    else
                        message.error(res.message);
                });
            }else{
                this.setState({ loading: false });
            }
        });
        
    }
    setLeftMenu (val,item) {
        this.props.form.setFieldsValue({name:item.name,fromdb:item.fromdb,id:item.id});
        this.refs.editorsql.codeMirror.setValue(item.selectsql);
        this.setState({infoname:item.name});
    }
    sqlFormat() {
        let aSQL = this.refs.editorsql.codeMirror.getValue();
        if (null != aSQL && "" != aSQL) {
            HttpService.post("reportServer/query/sqlFormat", aSQL)
                .then(res => {
                    this.refs.editorsql.codeMirror.setValue(res.data);
                });
        }
    }
    
    // 字典页数发生变化的时候
    onPageNumdChange(pageNumd) {
        this.setState({
            pageNumd: pageNumd
        }, () => {
            this.loadModelData();
        });
    }
    //导出到Excel
    downloadExcel = () => {
        // currentPro 是列表数据
        const currentPro = this.state.columnlist;
        if(null!=currentPro){
            var option = {};
            let dataTable = [], keyList = [];
            if (currentPro) {
                for (let i in currentPro) {
                    dataTable.push(currentPro[i].title);
                    keyList.push(currentPro[i].key);
                }
            }
            const infofroms=this.props.form.getFieldsValue();
            option.fileName = infofroms.fromdb+"-"+infofroms.name;
            option.datas = [
                {
                    sheetData: this.state.datalist,
                    sheetName: 'sheet',
                    sheetFilter: keyList,
                    sheetHeader: keyList,
                }
            ];
            var toExcel = new ExportJsonExcel(option); //new
            toExcel.saveExcel();
        }
    }
  
    tableAndColnameList(val){
        //查询查询类别定义
        HttpService.post("reportServer/selectsql/getTableAndColumnList", JSON.stringify({fromdb:val}))
        .then(res => {
            if (res.resultCode == '1000') {
                this.setState({ tables: res.data.tables });
            }
            else
                message.error(res.message);
        });
   }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 10 },
            wrapperCol: { span: 14 }
        };
        return (
            <div id="page-wrapper" style={{ background: '#ECECEC', padding: '0px' }}>
                <div style={{height:"100%",position:"relative"}}>
                <SplitPane split="vertical"  minSize={200} defaultSize={200} style={{position:'relative'}}>
                        <Card bodyStyle={{ padding: '5px' }} style={{height:"100%"}} title="标题列表">
                        {   
                            this.state.list==null?'':this.state.list.map((item,key)=>{
                                return (<div key={key} style={{display:"flex",margin:"10px 0",padding:"1px 0",background:window.sessionStorage.H_leftColor*1===key?"#ccc":"",color:window.sessionStorage.H_leftColor*1===key?"#fff":""}}>
                                    <div style={{flex:'5',cursor: "pointer"}} onClick={()=>this.setLeftMenu(key,item)}><span style={{paddingLeft:'10px'}}>{key+1} </span><span style={{display:"inline-block",width:"20px"}}></span>{item.name}</div>
                                </div>)
                            })
                        }
                        </Card>
                        <SplitPane split="horizontal" maxSize={424} defaultSize={400}>
                        <Collapse defaultActiveKey={['1','2']} onChange={callback} style={{width:"100%"}}>
                        <Panel header="输入SQL" key="1">
                                <Row style={{margin: '-11px', marginLeft: '1px'}}>
                                    <FormItem >
                                            {getFieldDecorator('id')( 
                                                <Input id="id" name="id" value={this.state.id} style={{display:'none'}} />
                                            )}
                                        </FormItem>
                                        
                                        <FormItem >
                                            { getFieldDecorator('name')(
                                                    <Input  id="name" name="name" style={{display:'none'}}  />
                                            )}
                                        </FormItem>
                                    <Col >
                                        <Button icon={<SaveOutlined />} size='small' type="primary" onClick={() => this.handleSubmit()} style={{ marginRight: "10px" }}>保存</Button>
                                        <Button icon={<SyncOutlined />} onClick={() => this.resetInput()} size='small'  style={{ marginRight: "10px" }}>重置</Button>
                                        <Button icon={<CaretRightOutlined />} size='small'  loading={this.state.loading} onClick={() => this.onGenerateClick()} style={{ marginRight: "10px" }} >执行</Button>
                                        <Button icon={<BarsOutlined />} size='small'  onClick={() => this.sqlFormat()} style={{ marginRight: "10px" }}> 格式化</Button>
                                    </Col>
                                    <Col span={8}>
                                        <FormItem label="选择数据库" {...formItemLayout} style={{ marginBottom: "8px",marginTop:'-8px' }}>
                                        {
                                            getFieldDecorator('fromdb', {
                                                rules: [{ required: 'true', message: "必须选择数据库" }]
                                            })(
                                                <Select setValue={this.form} style={{ minWidth: '150px' }} onChange={(value)=>this.tableAndColnameList(value)} >
                                                    {this.state.dbList.map(item => <Option key={item.name} value={item.name}>{item.name}</Option>)}
                                                </Select>
                                            )
                                        }
                                            </FormItem>
                                    </Col>
                                    <Col>
                                        {this.state.infoname==""?"":<div >查询名称：&nbsp;&nbsp; {this.state.infoname}</div>}
                                    </Col>
                                    
                                </Row>
                                <CodeMirror 
                                    ref="editorsql" 
                                    value='' 
                                    style={{ height: '300px', width: '450px', border: "2px solid red" }} 
                                    options={{
                                        lineNumbers: true,//显示行号  
                                        mode: {name: "text/x-mysql"},//定义mode  
                                        extraKeys: { "Tab": "autocomplete" },//快捷键自动提示配置  
                                        theme: "default",
                                        hintOptions: {// 自定义提示选项
                                            completeSingle: false,// 当匹配只有一项的时候是否自动补全
                                            tables:this.state.tables
                                        }
                                    }}/>
                                </Panel>
                                </Collapse>
                        <Collapse defaultActiveKey={['1']} onChange={callback} style={{background:"#fff",height:"100%",position:"relative",zIndex:"10"}}>
                                <Panel header="查询结果" key="2" extra={
                                    <DownloadOutlined onClick={event => {
                                        this.downloadExcel();
                                        event.stopPropagation();
                                        }} />
                                }>
                                    <Table
                                        style={{width:'100%', maxWidth:'1000px',overflow:'auto'}}
                                        columns={this.state.columnlist}
                                        dataSource={this.state.datalist}
                                        >
                                    </Table>
                                </Panel>
                            </Collapse>
                        </SplitPane>
                    
                            
                    </SplitPane>
                </div>
                
                <Modal
                    title="查询名"
                    visible={this.state.visible}
                    onOk={this.hideModal}
                    onCancel={this.hideModal}
                    okText="确认"
                    cancelText="取消"
                    >请输入查询名
                    <Input id="name" name="name" value={this.state.name} onChange={e=>this.changeValue(e)} />
                    </Modal>
            </div >
        );
    }

}
export default SqlCreator = Form.create({})(SqlCreator);