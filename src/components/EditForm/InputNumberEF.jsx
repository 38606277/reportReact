import React from 'react';
import { InputNumber, Form } from 'antd';
import styles from './index.less'

const InputNumberEF = (props) => {

    const { text, record, index } = props;
    const { name, rules } = props;
    const { disabled, precision, placeholder, handleFieldChange, onChange } = props;
    const { tableForm } = props;

    tableForm.setFieldsValue({ [`${index}_${name}`]: text });

    return (

        <Form.Item
            className={styles.tableFormItem}
            name={`${index}_${name}`}
            rules={rules}
        >
            <InputNumber
                precision={precision}
                value={text}
                min={0}
                disabled={disabled}
                onChange={(value) => {
                    if (handleFieldChange) {
                        handleFieldChange(value, name, record)
                    }

                    if (onChange) {
                        onChange(value, name, record)
                    }
                }}
                placeholder={placeholder}
            />
        </Form.Item>

    )
}
export default InputNumberEF;