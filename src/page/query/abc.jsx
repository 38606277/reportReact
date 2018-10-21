/*
* 查询模板文件
*/
import React from 'react';
import { Card, Button, Divider, Input, Form, FormItem, Icon, Row, Col } from 'antd';




export default class abc extends React.Component {


    render() {



        
        return (
            <div>
               <Card bodyStyle={{ padding: '25px', minHeight: '200px' }}>
                   <div>查询条件</div>
               </Card>
               <Card bodyStyle={{ padding: '5px', marginTop: '15px', minHeight: '300px' }}>
                   <div>查询结果</div>
               </Card>
            </div >
        )
    }
}
