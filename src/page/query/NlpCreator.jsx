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
    editing: false,
  }

  toggleEdit = () => {
    const editing = !this.state.editing;
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
      this.toggleEdit();
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

    state = {};
    func_data = {};
    constructor(props) {
        super(props);
        this.state = {
            //定义状态
            tableData: [],
            columnData: [],
            //定义下拉查找的数据
            dbList: [],
            funcClassList: [],
            dbname:'',
            tableName:''
        };
    }
    componentDidMount() {
        //查询DB定义
        dbService.getDbList()
            .then(res => {
                this.setState({ dbList: res });
            });
    }

   
    onSaveClick=()=> {
        //this.child.setFormValue(res.data.in);
        console.log(this.state.columnList);
        let formInfo={"dbname":this.state.dbname,"tableName":this.state.tableName,"columnList":this.state.columnList}
        HttpService.post("reportServer/nlp/updateColumn", JSON.stringify(formInfo))
            .then(res => {
                if (res.resultCode == "1000") {
                    message.success(`更新成功！`)
                }
                else
                    message.error(res.message);
            });
    }
    dbChange(e){
        this.setState({
            dbname:e
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
        let param={'dbname':this.state.dbname,'tableName':e}
        this.setState({tableName:e});
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
       
        const dictionaryColumns = [{
            title: '字段名',
            dataIndex: 'COLUMN_NAME',
            key: 'COLUMN_NAME',
        }, {
            title: '字段类型',
            dataIndex: 'DATA_TYPE',
            key: 'DATA_TYPE',
            editable: true,
        }, {
            title: '字段长度',
            dataIndex: 'COLUMN_SIZE',
            key: 'COLUMN_SIZE',
            editable: true,
        }, {
            title: '是否允许为空',
            dataIndex: 'NULLABLE',
            key: 'NULLABLE',
            editable: true,
        }, {
            title: '字段注释',
            dataIndex: 'COMMENTS',
            key: 'COMMENTS',
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
                                        
                                            <Select setValue={this.form} style={{ minWidth: '300px' }} onChange={(e)=>this.dbChange(e)}>
                                                {this.state.dbList==null?null:this.state.dbList.map(item => <Option key={item.name} value={item.name}>{item.name}</Option>)}
                                            </Select>
                                        
                                    }
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col  xs={24} sm={12}>
                                <FormItem label="表名"   {...formItemLayout}  >
                                    {
                                        <Select style={{ minWidth: '300px' }}  onChange={(e)=>this.tableChange(e)}>
                                                {this.state.tableData==null?null:this.state.tableData.map(item => <Option key={item} value={item}>{item}</Option>)}
                                        </Select>
                                    }
                                </FormItem>
                            </Col>
                        </Row>
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