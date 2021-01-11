import React from 'react';
import { Select, Form } from 'antd';
const { Option } = Select;
import styles from './index.less'

const SelectEF = (props) => {

    const { text, record, index } = props;
    const { name, rules } = props;
    const { placeholder, handleFieldChange } = props;
    const { disabled, dictData, keyName, valueName } = props;
    const { tableForm } = props;

    const formName = `${index}_${name}`;

    tableForm.setFieldsValue({ [formName]: text });

    return (
        <Form.Item
            className={styles.tableFormItem}
            name={formName}
            rules={rules}
        >
            <Select
                disabled={disabled}
                allowClear
                placeholder={placeholder}
                onChange={(value) => {
                    handleFieldChange(value, name, record)
                }}>
                {dictData.map(item => <Option key={`${formName}_${item[keyName]}`} value={item[keyName]}>{item[valueName]}</Option>)}
            </Select>
        </Form.Item>)
}
export default SelectEF;