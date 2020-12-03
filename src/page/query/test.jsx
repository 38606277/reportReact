import React, { PureComponent } from 'react';
import { Form, Table, InputNumber } from 'antd';

export default class DTable extends PureComponent {

    changeInput = (record, value) => {
        const { data } = this.props;
        data[record.field] = value;
    }

    getRequired = () => {
        const { data } = this.props;
        const fields = initData.map(v => v.field);
        for (const item of fields) {
            if (data[item]) return true;
        }
        return false;
    }
    render() {
        const { form: { getFieldDecorator }, data, isCheck } = this.props;
        const isRequired = this.getRequired();
        const columns = [
            {
                title: '指标名称',
                dataIndex: 'indexName',
                width: '60%',
            },
            {
                title: '指标值',
                dataIndex: 'indexValue',
                width: '40%',
                render(text, record) {
                    if (isCheck) return data[record.field];
                    return (
                        <Form.Item
                            wrapperCol={{ span: 24 }}
                            style={{ marginBottom: 0 }}
                        >
                            {getFieldDecorator('indexValue' + data.professionalCategory + record.key, {
                                rules: [{ required: isRequired, message: ' ' }],
                                initialValue: data[record.field],
                            })(
                                <InputNumber
                                    style={{ width: '100%' }}
                                    placeholder={isRequired ? '此项必填' : '此项非必填'}
                                    min={0}
                                    onChange={(value) => { data[record.field] = value; }}
                                />
                            )}
                        </Form.Item>
                    );
                },
            },
        ];
        return (
            <Table
                loading={this.props.loading}
                dataSource={initData}
                columns={columns}
                bordered
                pagination={false}
                rowKey="key"
                scroll={{ y: '500px' }}
            />
        );
    }
}
//写死数据格式
const initData = [{
    key: '1',
    indexName: '类型不符合要求的标本数',
    indexValue: '',
    field: 'typeIncorredSpecimen',
}]
