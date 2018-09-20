import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Input, InputNumber, Popconfirm, Form, Select, Icon } from 'antd';
import { Button } from 'antd/lib/radio';
import { Card } from 'antd-mobile';

const data = [];
for (let i = 0; i < 3; i++) {
    data.push({
        key: i.toString(),
        name: `Edrward ${i}`,
        age: 32,
        address: `London. ${i}`,
    });
}
const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);


class EditableCell extends React.Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber />;
        }
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

export default class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data:props.data, editingKey: '' };
        this.columns = [
            {
                title: '参数ID',
                dataIndex: 'in_id',
                width: '20%',
                editable: true,
            },
            {
                title: '参数名字',
                dataIndex: 'in_name',
                width: '20%',
                editable: true,
            },
            {
                title: '参数类型',
                dataIndex: 'datatype',
                width: '13%',
                editable: true,
            },
            {
                title: '数据字典',
                dataIndex: 'dict',
                width: '20%',
                editable: true,
            },
            {
                title: '权限',
                dataIndex: 'auth',
                width: '15%',
                editable: true,
            },
            {
                title: '操作',
                dataIndex: 'operation',
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
                                        title="确认放弃保存?"
                                        onConfirm={() => this.cancel(record.key)}
                                    >
                                        <a>取消</a>
                                    </Popconfirm>
                                </span>
                            ) : (
                                    <a onClick={() => this.edit(record.key)}>编辑</a>
                                )}
                        </div>
                    );
                },
            },
        ];
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
            const newData = [...this.state.data];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                this.setState({ data: newData, editingKey: '' });
            } else {
                newData.push(row);
                this.setState({ data: newData, editingKey: '' });
            }
        });
    }

    cancel = () => {
        this.setState({ editingKey: '' });
    };
    componentWillReceiveProps(nextProps) {
        const { data } = this.state
        const newdata = nextProps.data.toString()
        if (data.toString() !== newdata) {
          this.setState({
            data: nextProps.data,
          })
        }
      }

    render() {
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
                    inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });

        return (
          
                <Table
                    components={components}
                  
                    dataSource={this.state.data}
                    columns={columns}
                    rowClassName="editable-row"
                    pagination={false}
                    size="small"
                />
         
        );
    }
}
