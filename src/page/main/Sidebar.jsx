import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Layout, Menu, Icon} from 'antd';
import queryService from '../../service/QueryService.jsx';

const { Header, Content, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const _query =new queryService();




export default class SiderBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categoryList:[],
        };

    }
    componentDidMount() {
        //获取报表列表
      _query.getSelectClassTree().then(response => {
          this.setState({categoryList:response});
      }, errMsg => {
          this.setState({
              categoryList : []
          });
      });
      
    }
    render() {
        const submun=this.state.categoryList.map((item,index)=>{
                const p= item.children.map((items,index)=>{
                    let toa='/query/QueryData/'+items.value;
                    return (<Menu.Item key={items.value}><Link to={toa}>{items.name}</Link></Menu.Item>);
                });
            return  <SubMenu key={item.name} title={item.name}>{p} </SubMenu>;
         });
         const collapsed=this.props.collapsed;
        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                theme="light"
                width='300px'
                style={{ overflow: 'auto', height: '100vh', left: 0 }}
            >
                <Menu theme="light" defaultSelectedKeys={['1']} mode="inline"  >
                    <Menu.Item key="sub" ><Link to='/'><Icon type="home" /><span>首页</span></Link></Menu.Item>
                    <SubMenu key="sub1" title={<span><Icon type="appstore" /><span>我的任务</span></span>}>
                        <Menu.Item key="/task/AgencyTaskList"><Link to='/task/AgencyTaskList'>代办任务</Link></Menu.Item>
                        <Menu.Item key="/task/taskList"><Link to='/task/taskList'>已办任务</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" title={<span><Icon type="table" /><span>数据查询</span></span>}>
                        <Menu.Item key="5"><Link to='/query/QueryData'>查询报表</Link></Menu.Item>
                        {this.state.categoryList.map(function (item) {
                                 return (<SubMenu key={item.name}
                                                  title={<span><Icon type="table"/><span>{item.name}</span></span>}>
                                     {item.children.map((vl)=>(
                                         <Menu.Item key={vl.value}><Link to={'/query/ExecQuery/'+vl.value}>{vl.name}</Link></Menu.Item>
                                     ))}
                                 </SubMenu>)
                             }
                         )
                     }
                        {/* <Menu.Item key="sub22"><Link to='/query/ExecQuery'>执行查询</Link></Menu.Item> */}
                    </SubMenu>
                    <SubMenu key="sub4" title={<span><Icon type="setting" /><span>系统管理</span></span>}>
                        <Menu.Item key="/user"><Link to='/user'>用户管理</Link></Menu.Item>
                        <Menu.Item key="/role"><Link to='/role'>角色管理</Link></Menu.Item>
                        <Menu.Item key="/rule"><Link to='/rule'>权限管理</Link></Menu.Item>
                        <Menu.Item key="authType"><Link to="/authType">权限类型管理</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub5" title={<span><Icon type="profile" /><span>函数管理</span></span>}>
                        {/* <Menu.Item key="/dbs"><Link to='/dbs'>数据源管理</Link></Menu.Item> */}
                        <Menu.Item key="/dbs"><Link to='/dbs'>数据源管理</Link></Menu.Item>
                        <Menu.Item key="/function/functionList"><Link to='/function/functionList'>函数管理</Link></Menu.Item>
                        <Menu.Item key="/query/QueryList"><Link to='/query/QueryList'>查询管理</Link></Menu.Item>
                        <Menu.Item key="/dict/DictList"><Link to='/dict/DictList'>数据字典</Link></Menu.Item>
                        <Menu.Item key="/query/CreateTemplate"><Link to='/query/CreateTemplate'>定义查询模板</Link></Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        )
    }
}


