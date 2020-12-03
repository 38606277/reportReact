import React from 'react'
import { DownOutlined } from '@ant-design/icons';
import {
    Card,
    Button,
    Dropdown,
    message,
    Modal,
    DatePicker,
    InputNumber,
    Switch,
    Row,
    Col,
    Tabs,
    Menu,
} from 'antd';

import SqlCreator from './SqlCreator.jsx';
import ProcedureCreator from './ProcedureCreator.jsx';
import HttpCreator from './HttpCreator.jsx';



export default class QueryCreator extends React.Component {

    state = {};
    func_data = {};
    constructor(props) {
        super(props);
        // alert(this.props.match.params.funcid);
        this.state = {
            //定义窗体参数
            action: this.props.match.params.action,
            qry_id: this.props.match.params.id,
            qry_type: this.props.match.params.qry_type,
            qry_type_name:'SQL语句',
            creator: <SqlCreator qry_type={this.state.qry_type} action= {this.props.match.params.action} qry_id={this.props.match.params.id} />,

        }
    }

    onChangeQryType(e){
        if(e.key=='sql')
        {
            this.setState({
            qry_type_name:'SQL语句',
            qry_type:'sql',
            creator:<SqlCreator qry_type={this.state.qry_type} action={this.state.action} qry_id={this.state.qry_id} />});

        }else if(e.key=='procedure')
        {
            this.setState({
                qry_type_name:'存储过程',
                qry_type:'procedure',
                creator:<ProcedureCreator qry_type={this.state.qry_type} action={this.state.action} qry_id={this.state.qry_id} />});
        }else if(e.key=='http')
        {
            this.setState({ 
            qry_type_name:'HTTP请求',
            qry_type:'http',
            creator:<HttpCreator qry_type={this.state.qry_type} action={this.state.action} qry_id={this.state.qry_id} />});
        }
      
    }

    render() {
        return (
            <div id="page-wrapper" style={{ background: '#ECECEC', padding: '0px' }}>
                <Card title={this.state.action == 'create' ? '创建查询' : '编辑查询'} bordered={false} bodyStyle={{ padding: "5px" }} headStyle={{ height: '60px' }}
                    extra={<Dropdown overlay={(
                        <Menu onClick={(e)=>this.onChangeQryType(e)}>
                            <Menu.Item key="sql">sql语句</Menu.Item>
                            <Menu.Item key="procedure">存储过程</Menu.Item>
                            <Menu.Item key="http">http请求</Menu.Item>
                        </Menu>
                    )}>
                        <Button style={{ marginLeft: 8 }}>
                        {this.state.qry_type_name}  <DownOutlined />
                        </Button>
                    </Dropdown>}>
                    {this.state.creator}
                </Card>

            </div >
        );
    }

}
