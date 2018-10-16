
import React                from 'react';
import { Link }             from 'react-router-dom';
import AuthType             from '../../../service/AuthTypeService.jsx';
import {Table,Divider,Button,Card, Tooltip}  from 'antd';
const db = new AuthType();

class AuthTypeList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list : []
        };
    }
    componentDidMount(){
        this.loadDbList();
    }
    loadDbList(){
        let listParam = {};
        db.getAuthTypeList(listParam).then(response => {
            this.setState({list:response.data});
        }, errMsg => {
            this.setState({
                list : []
            });
        });
    }
    
    deleteAuthType(name){
        if(confirm('确认删除吗？')){
            db.deleteAuthType(name).then(response => {
                alert("删除成功");
                this.loadDbList();
            }, errMsg => {
                alert("删除失败");
            });
        }
    }
    

    render(){
        this.state.list.map((item,index)=>{
            item.key=index;
        })
        const dataSource = this.state.list;
        let self = this;
          const columns = [{
            title: '权限类型名称',
            dataIndex: 'value',
            key: 'value',
            render: function(text, record, index) {
               return <Link to={ `/authType/authTypeView/${record.value}` }>{text}</Link>;
             } 
          },{
            title: '权限类型描述',
            dataIndex: 'name',
            key: 'name'
          },{
            title: '操作',
            dataIndex: '操作',
            render: (text, record) => (
                <span>
                  <Link to={ `/authType/authTypeInfo/${record.value}` }>编辑</Link><Divider type="vertical" />
                  <a onClick={()=>this.deleteAuthType(`${record.value}`)} href="javascript:;">删除</a>
                </span>
              ),
          }];
       
        return (
            <div id="page-wrapper">
            <Card title="权限类型管理">
                <Button href="#/authType/authTypeInfo/null" style={{ float: "right", marginRight: "30px",marginBottom:"10px"  }} type="primary">新建权限类型</Button>
                <Table dataSource={dataSource} columns={columns}  pagination={false} style={{marginTop:'30px'}}/>
            </Card>
                
            </div>
        )
    }
}

export default AuthTypeList;