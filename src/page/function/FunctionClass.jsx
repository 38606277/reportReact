
import React                from 'react';
import { Link }             from 'react-router-dom';
import Function                 from '../../service/FunctionService.jsx';
import Pagination           from 'antd/lib/pagination';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Table, Divider, Button, Card, Popconfirm, Tooltip, Input, message } from 'antd';
import  LocalStorge         from '../../util/LogcalStorge.jsx';
const FormItem = Form.Item;
const Search = Input.Search;
const localStorge = new LocalStorge();
const _function = new Function();
import './function.scss';
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  getInput = () => {
    
    return <Input />;
  };

  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {(form) => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [{
                      required: true,
                      message: `Please Input ${title}!`,
                    }],
                    initialValue: record[dataIndex],
                  })(this.getInput())}
                </FormItem>
              ) : restProps.children}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}
class FunctionClass extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list            : [],
            pageNum         : 1,
            perPage         : 10,
            listType        :'list',
            className:'',
            editingKey: ''
        };
        this.columns = [{
            title: 'ID',
            dataIndex: 'class_id',
            key: 'class_id',
            className:'headerRow',
          },{
            title: '类别名称',
            dataIndex: 'class_name',
            key: 'class_name',
            className:'headerRow',
            editable: true,
          },{
            title: '操作',
            dataIndex: '操作',
            className:'headerRow',
            render: (text, record) => {
                const editable = this.isEditing(record);
                return (
                  <div>
                    {editable ? (
                      <span>
                        <EditableContext.Consumer>
                          {form => (
                            <a
                              href="javascript:;"
                              onClick={() => this.save(form, record.key)}
                              style={{ marginRight: 8 }}
                            >
                              保存
                            </a>
                          )}
                        </EditableContext.Consumer>
                        <Popconfirm
                          title="确定取消吗?"
                          onConfirm={() => this.cancel(record.key)}
                        >
                          <a>取消</a>
                        </Popconfirm>
                      </span>
                    ) : (
                      <div><a onClick={() => this.edit(record.key)}>编辑</a>
                        <Divider type="vertical" />
                        <a onClick={()=>this.deleteFunctionClss(`${record.key}`)} href="javascript:;">删除</a>
                        </div>
                    )}
                  </div>
                );
              },
            },
          ];
    }
    componentDidMount(){
        this.loadFunctionClassList();
    }
    loadFunctionClassList(){
        let listParam = {};
        listParam.pageNum  = this.state.pageNum;
        listParam.perPage  = this.state.perPage;
       
        _function.getAllFunctionClass(listParam).then(response => {
            this.setState({list:response.data});
        }, errMsg => {
            this.setState({
                list : []
            });
            // _mm.errorTips(errMsg);
        });
    }
    // 页数发生变化的时候
    onPageNumChange(pageNum){
        this.setState({
            pageNum : pageNum
        }, () => {
            this.loadFunctionClassList();
        });
    }
    // 数据变化的时候
    onValueChange(e){
        let name    = e.target.name,
            value   = e.target.value.trim();
        this.setState({
            [name] : value
        });
    }
    
    deleteFunctionClss(id){
        if(confirm('确认删除吗？')){
            let obj={class_id:id};
            _function.deleteFunctionClss(obj).then(response => {
                message.success("删除成功");
                this.loadFunctionClassList();
            }, errMsg => {
                message.error("删除失败");
            });
        }
    }
    saveClick(value){
        if(value!=''  && value!=null){
            let obj={class_name:value};
            _function.saveFunctionClass(obj).then(response=>{
                if(response.resultCode == "1000"){
                    message.success("保存成功");
                    this.setState({className:''});
                }
                this.loadFunctionClassList();
            });
        }
        
    }
    onValueChange(e){
        let name = e.target.name,
            value = e.target.value.trim();
           this.setState({[name]:value});  
     }
     isEditing = (record) => {
        return record.key === this.state.editingKey;
      };
    
      edit(key) {
        this.setState({ editingKey: key });
      }
    
      save(form, key) {
        form.validateFields((error, row) => {
          if (error) {
            return;
          }
          const newData = [...this.state.list];
          const index = newData.findIndex(item => key === item.key);
          if (index > -1) {
            const item = newData[index];
            const obj=row;
            obj.class_id=key;
            _function.updateFunctionClass(obj).then(response=>{
                if(response.resultCode == "1000"){
                    newData.splice(index, 1, {
                        ...item,
                        ...row,
                    });
                    this.setState({ list: newData, editingKey: '' });
                }else{
                    message.error("保存失败");
                    this.loadFunctionClassList();
                }
            });
            
          } else {
            newData.push(row);
            this.setState({ list: newData, editingKey: '' });
          }
        });
      }
    
      cancel = () => {
        this.setState({ editingKey: '' });
      };
    
    render(){
        this.state.list.map((item,index)=>{
            item.key=item.class_id;
        })
        const components = {
            body: {
              row: EditableFormRow,
              cell: EditableCell,
            },
          };
      
          const columns = this.columns.map((col) => {
            if (!col.editable) {
              return col;
            }
            return {
              ...col,
              onCell: record => ({
                record,
                inputType: col.dataIndex === 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: this.isEditing(record),
              }),
            };
          });
        
       
        return (
            <div id="page-wrapper">
            <Card title="类别管理">
                <Tooltip>
                    <Search
                        placeholder="输入新类别名称"
                        enterButton="新建类别"
                        size="large"
                        style={{ width: 300,marginBottom:'10px' }}
                        name='className'
                        onSearch={value =>this.saveClick(value)}
                        />
                </Tooltip>
                <Table dataSource={this.state.list} columns={columns}  pagination={false}
                components={components} rowClassName="editable-row"/>
                 {/* <Pagination current={this.state.pageNum} 
                    total={this.state.total} 
                    onChange={(pageNum) => this.onPageNumChange(pageNum)}/>  */}
            </Card>
                
            </div>
        )
    }
}

export default FunctionClass;