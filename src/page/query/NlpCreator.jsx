import React from 'react'
import { Card, Button, Table, Form, Input,Avatar,List,Pagination, Divider, Checkbox, Dropdown, Select, Radio, Icon, message, Modal, DatePicker, InputNumber, Switch, Row, Col, Tabs, Menu } from 'antd'
import HttpService from '../../util/HttpService.jsx';
import DbService from '../../service/DbService.jsx'
import './nlp.scss';

const FormItem = Form.Item;
const Option = Select.Option;
const dbService = new DbService();


const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: true,
  }

  toggleEdit = () => {
     const editing = !this.state.editing;
    //const editing =true;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  }

  save = (e) => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      //this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  }

  render() {
    const { editing } = this.state;
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>
            {(form) => {
              this.form = form;
              return (
                editing ? (
                  <FormItem style={{ margin: 0 }}>
                    {form.getFieldDecorator(dataIndex, {
                      rules: [{
                        required: true,
                        message: `${title} is required.`,
                      }],
                      initialValue: record[dataIndex],
                    })(
                      <Input
                        ref={node => (this.input = node)}
                        onPressEnter={this.save}
                        onBlur={this.save}
                      />
                    )}
                  </FormItem>
                ) : (
                  <div
                    className="editable-cell-value-wrap"
                    style={{ paddingRight: 24 }}
                    onClick={this.toggleEdit}
                  >
                    {restProps.children}
                  </div>
                )
              );
            }}
          </EditableContext.Consumer>
        ) : restProps.children}
      </td>
    );
  }
}
class NlpCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tid:this.props.match.params.tid,
            dbList: [],
            dbname:"",
            tableData: [],
            tableName:"",
            table_nlp1: "",
            table_nlp2: "",
            table_nlp3: "",
            table_nlp4: ""       
        };
    }
    componentDidMount() {
        //查询DB定义
        dbService.getDbList()
            .then(res => {
                this.setState({ dbList: res });
            });
        if(this.state.tid!=null  && this.state.tid!="" ){
          let pinfo={table_id:this.state.tid}
          HttpService.post("reportServer/nlp/getInfoByTableId", JSON.stringify(pinfo))
          .then(res=>{
              this.setState({
                dbname:res.data.db.table_db,
                tableData:res.data.tableList,
                tableName:res.data.db.table_name,
                table_nlp1: res.data.db.table_nlp1,
                table_nlp2: res.data.db.table_nlp2,
                table_nlp3: res.data.db.table_nlp3,
                table_nlp4: res.data.db.table_nlp4   
              });

              let param={'dbname':res.data.db.table_db,'tableName':res.data.db.table_name}
              HttpService.post("reportServer/nlp/getColumnList",JSON.stringify(param))
              .then(res => {
                  if (res.resultCode == "1000") {
                      this.setState({columnList: res.data});
                      message.success(`查询成功！`)
                  }else{
                    message.error(res.message);
                  }
              });
          })
        }
    }

   
    onSaveClick=()=> {
        let formInfo={"dbname":this.state.dbname,
                      "tableName":this.state.tableName,
                      "table_nlp1": this.state.table_nlp1,
                      "table_nlp2": this.state.table_nlp2,
                      "table_nlp3": this.state.table_nlp3,
                      "table_nlp4": this.state.table_nlp4,   
                      "columnList":this.state.columnList}
        if(this.state.dbname!="" && this.state.tableName!=""){              
            HttpService.post("reportServer/nlp/updateColumn", JSON.stringify(formInfo))
            .then(res => {
                if (res.resultCode == "1000") {
                    message.success(`更新成功！`);
                    window.location.href="#/query/NlpList";
                }
                else
                    message.error(res.message);
            });
        }else{
          alert("数据库与表名都不能为空");
        }    
    }
    dbChange(e){
        this.setState({
            dbname:e,
            columnList:[],
            tableData:[],
            tableName:"",
            table_nlp1: "",
            table_nlp2: "",
            table_nlp3: "",
            table_nlp4: ""    
        })
        HttpService.post("reportServer/nlp/getTable", e)
        .then(res => {
            if (res.resultCode == "1000") {
                this.setState({tableData: res.data});
                message.success(`查询成功！`)
            }
            else
                message.error(res.message);
        });
    }
    tableChange(e){
        this.setState({tableName:e, 
                      columnList:[], 
                      table_nlp1: "",
                      table_nlp2: "",
                      table_nlp3: "",
                      table_nlp4: ""
                  });
        let param={'dbname':this.state.dbname,'tableName':e}
        HttpService.post("reportServer/nlp/getColumnList",JSON.stringify(param))
        .then(res => {
            if (res.resultCode == "1000") {
                this.setState({columnList: res.data});
                message.success(`查询成功！`)
            }
            else
                message.error(res.message);
        });
    }
    handleSave = (row) => {
        const newData = [...this.state.columnList];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ columnList: newData });
      }
     
      onChangeV(e) {
        let id=e.target.id;
        let v=e.target.value;
        this.state[id]=v;
        this.setState({[id]:v});
    }
    render() {
       
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
          if (null != this.state.columnList) {
            this.state.columnList.map((item, index) => {
                item.key = index;
            });
        }
        const dictionaryColumns = [{
            title: '字段名',
            dataIndex: 'COLUMN_NAME',
            key: 'COLUMN_NAME',
        }, {
            title: '字段类型',
            dataIndex: 'DATA_TYPE',
            key: 'DATA_TYPE',
        }, {
            title: '字段长度',
            dataIndex: 'COLUMN_SIZE',
            key: 'COLUMN_SIZE',
        }, {
            title: '是否允许为空',
            dataIndex: 'NULLABLE',
            key: 'NULLABLE',
        }, {
            title: '字段注释',
            dataIndex: 'COMMENTS',
            key: 'COMMENTS',
        }, {
            title: '自然语言一',
            dataIndex: 'FIELD_NLP1',
            key: 'FIELD_NLP1',
            editable: true,
        }, {
            title: '自然语言二',
            dataIndex: 'FIELD_NLP2',
            key: 'FIELD_NLP2',
            editable: true,
        }, {
            title: '自然语言三',
            dataIndex: 'FIELD_NLP3',
            key: 'FIELD_NLP3',
            editable: true,
        }, {
            title: '自然语言四',
            dataIndex: 'FIELD_NLP4',
            key: 'FIELD_NLP4',
            editable: true,
        }, {
            title: '是否主键',
            dataIndex: 'PRIMARY',
            key: 'PRIMARY',

        }];
        const components = {
            body: {
              row: EditableFormRow,
              cell: EditableCell,
            },
          };
          const columns = dictionaryColumns.map((col) => {
            if (!col.editable) {
              return col;
            }
            return {
              ...col,
              onCell: record => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave: this.handleSave,
              }),
            };
          });
        return (
            <div id="page-wrapper" style={{ background: '#ECECEC', padding: '0px' }}>
                <Card title={this.state.action == 'create' ? '创建查询' : '编辑查询'} bordered={false} bodyStyle={{ padding: "5px" }} headStyle={{ height: '40px' }}
                    extra={<div>
                        <Button type="primary" htmlType="button" onClick={this.onSaveClick} style={{ marginRight: "10px" }}>保存</Button>
                        <Button icon="list" onClick={() => window.location = '#/query/QueryList'} style={{ marginRight: "10px" }}   >退出</Button>
                    </div>}>
                   
                          <Row>
                            <Col  xs={24} sm={12}>
                                <FormItem label="选择数据库" {...formItemLayout}  style={{ marginBottom: "5px" }}>
                                    {
                                        
                                            <Select setValue={this.form}  value={this.state.dbname} style={{ minWidth: '300px' }} onChange={(e)=>this.dbChange(e)}>
                                                {this.state.dbList==null?null:this.state.dbList.map(item => 
                                                <Option key={item.name} value={item.name} >{item.name}</Option>
                                                )}
                                            </Select>
                                        
                                    }
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col  xs={24} sm={12}>
                                <FormItem label="表名"   {...formItemLayout}  >
                                    {
                                      <div>
                                        <Select style={{ minWidth: '300px' }} id="tableName" name="tableName" value={this.state.tableName} onChange={(e)=>this.tableChange(e)}>
                                                {this.state.tableData==null?null:this.state.tableData.map(item => <Option key={item} value={item}>{item}</Option>)}
                                        </Select>
                                        
                                        </div>
                                    }
                                </FormItem>
                            </Col>
                        </Row>
                        
                            
                        {this.state.tableName==""?null:
                        <div>
                            <Row>
                                <Col  xs={24} sm={12}>
                                <FormItem label="自然语言一"   {...formItemLayout}  >
                                        {
                                          <Input style={{ minWidth: '300px' }}  id="table_nlp1" name="table_nlp1" value={this.state.table_nlp1} onChange={(v)=>this.onChangeV(v)} placeholder="请输入自然语言一"/>
                                
                                  } </FormItem>
                                
                              </Col>
                                <Col  xs={24} sm={12}>
                                <FormItem label="自然语言二"   {...formItemLayout}  >
                                        {
                                          <Input style={{ minWidth: '300px' }}  id="table_nlp2" name="table_nlp2" value={this.state.table_nlp2} onChange={(v)=>this.onChangeV(v)} placeholder="请输入自然语言二"/>
                                          }</FormItem>
                                </Col>
                            </Row>  
                            
                            <Row>
                                <Col  xs={24} sm={12}>
                                <FormItem label="自然语言三"   {...formItemLayout}  >
                                {
                                    <Input style={{ minWidth: '300px' }}  id="table_nlp3" name="table_nlp3" value={this.state.table_nlp3} onChange={(v)=>this.onChangeV(v)} placeholder="请输入自然语言三"/>
                                  }</FormItem>
                              </Col>
                                <Col  xs={24} sm={12}>
                                <FormItem label="自然语言四"   {...formItemLayout}  >
                                {
                                    <Input style={{ minWidth: '300px' }}  id="table_nlp4" name="table_nlp4" value={this.state.table_nlp4} onChange={(v)=>this.onChangeV(v)} placeholder="请输入自然语言四"/>
                                  }</FormItem>
                                </Col>
                            </Row>  
                        </div>
                       }   
                           <Row>
                               <Col>
                               <Table ref="diction" columns={columns} components={components}
                                    rowClassName={() => 'editable-row'}
                                dataSource={this.state.columnList} size="small" bordered pagination={false} />
                               </Col>
                           </Row>
                </Card>
            </div >
        );
    }

}
export default NlpCreator;