import React from 'react';
import { Input, Form } from 'antd';
import styles from './index.less'

const InputEF = (props) => {

    const { text, record, index } = props;
    const { name, rules } = props;
    const { disabled, placeholder, handleFieldChange } = props;
    const { tableForm } = props;

    tableForm.setFieldsValue({ [`${index}_${name}`]: text });

    return (

        <Form.Item
            className={styles.tableFormItem}
            name={`${index}_${name}`}
            rules={rules}
        >
            <Input
                disabled={disabled}
                value={text}
                onChange={(e) => {
                    handleFieldChange(e.target.value, name, record)
                }}
                placeholder={placeholder}
            />
        </Form.Item>

    )
}
export default InputEF;