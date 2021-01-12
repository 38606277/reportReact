import React from 'react';
import { Checkbox, Form } from 'antd';
import styles from '../../../components/EditForm/index.less'

const CHEKC = (props) => {

    const { text, record, index } = props;
    const { name, rules } = props;
    const {  handleFieldChange } = props;
    const { tableForm } = props;

    tableForm.setFieldsValue({ [`${index}_${name}`]: text });

    return (

        <Form.Item
            className={styles.tableFormItem}
            name={`${index}_${name}`}
            rules={rules}
        >
            <Checkbox
                checked={text}
                onChange={(e) => {
                    handleFieldChange(e.target.checked, name, record)
                }}
            />
        </Form.Item>

    )
}
export default CHEKC;