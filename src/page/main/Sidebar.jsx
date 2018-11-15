import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Layout, Menu, Icon} from 'antd';
import queryService from '../../service/QueryService.jsx';
import  LocalStorge         from '../../util/LogcalStorge.jsx';
const localStorge = new LocalStorge();
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
       let param=''
        if(undefined!=localStorge.getStorage('userInfo') && ''!=localStorge.getStorage('userInfo')){
            param= localStorge.getStorage('userInfo').id;
        }
      _query.getQueryClassTree(param).then(response => {
          this.setState({categoryList:response});
      }, errMsg => {
          this.setState({
              categoryList : []
          });
      });
      
    }

    threeformSubmenusChild(obj,index,indexs){
        let cHtml=<div></div>;
        let childArray=obj.children;
        if("undefined"!=typeof(childArray)&&childArray.length>0) {
            cHtml = childArray.map((item, index) => {
                return this.threeformSubmenusChild(item,obj.value,index);
            });
            return <SubMenu key={obj.name==undefined?obj.func_name+(indexs):obj.name+(indexs)} title={<span><Icon type='folder' /><span>{obj.name==undefined?obj.func_name:obj.name}</span></span>}>{cHtml}</SubMenu>
        }else{
            return <Menu.Item key={obj.name+index} ><Link to={'/query/ExecQuery/'+obj.value+'/'+index+'/'+obj.name+'/null'}><Icon type={childArray==undefined?'table':'folder'} /><span>{obj.name==undefined?obj.func_name:obj.name}</span></Link></Menu.Item>
        }


    }
    formSubmenusChild(obj){
        let cHtml=<div></div>;
        let childArray=obj.children;
        if("undefined"!=typeof(childArray)&&childArray.length>0) {
          cHtml = childArray.map((item, index) => {
                return this.formSubmenusChild(item);
            });
            return <SubMenu key={obj.func_name} title={<span><Icon type={obj.func_icon} /><span>{obj.func_name}</span></span>}>{cHtml}</SubMenu>
        }else{
            return <Menu.Item key={obj.func_name} ><Link to={obj.func_url}><Icon type={obj.func_icon} /><span>{obj.func_name}</span></Link></Menu.Item>
        }


    }
    render() {
        let html=this.state.categoryList.map((obj,index)=> {
            if ("undefined"!=typeof(obj.children)&&obj.children.length>0) {
                if(obj.func_id=='1001'){
                    return this.threeformSubmenusChild(obj,obj.func_id,index);

                }else{
                    return this.formSubmenusChild(obj);

                }
            } else {
                //这里的routeurl是路由地址，是自定义的一个属性
                return <Menu.Item key={"sub"+index} ><Link to={obj.func_url}><Icon type={obj.func_icon} /><span>{obj.func_name}</span></Link></Menu.Item>
            }
        });
         const collapsed=this.props.collapsed;
        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                theme="light"
                width='250px'
                style={{ overflow: 'auto', height: '100vh', left: 0 }}
            >
                <Menu theme="light" defaultSelectedKeys={['1']} mode="inline"  >
                {html}
                    {/* <Menu.Item key="sub" ><Link to='/'><Icon type="home" /><span>首页</span></Link></Menu.Item>
                    <SubMenu key="sub1" title={<span><Icon type="appstore" /><span>我的任务</span></span>}>
                        <Menu.Item key="/task/AgencyTaskList"><Link to='/task/AgencyTaskList'>代办任务</Link></Menu.Item>
                        <Menu.Item key="/task/taskList"><Link to='/task/taskList'>已办任务</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" title={<span><Icon type="table" /><span>数据查询</span></span>}>
                        <Menu.Item key="sub5"><Link to='/query/QueryData'>数据查询</Link></Menu.Item>
                        <Menu.Item key="5dd"><Link to='/query/Contaier'>Box</Link></Menu.Item>
                        {this.state.categoryList.map(function (item,index) {
                                 return (<SubMenu key={item.name+index}
                                                  title={<span><Icon type="table"/><span>{item.name}</span></span>}>
                                     {item.children.map((vl,index)=>(
                                         <Menu.Item key={vl.name+vl.value}><Link to={'/query/ExecQuery/'+item.name+'/'+vl.name}>{vl.name}</Link></Menu.Item>
                                     ))}
                                 </SubMenu>)
                             }
                         )
                     }
                    </SubMenu>
                    <SubMenu key="sub4" title={<span><Icon type="setting" /><span>系统管理</span></span>}>
                        <Menu.Item key="/user"><Link to='/user'>用户管理</Link></Menu.Item>
                        <Menu.Item key="/role"><Link to='/role'>角色管理</Link></Menu.Item>
                        <Menu.Item key="/rule"><Link to='/rule'>权限管理</Link></Menu.Item>
                        <Menu.Item key="authType"><Link to="/authType">权限类型管理</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub5" title={<span><Icon type="profile" /><span>函数管理</span></span>}>
                        <Menu.Item key="/dbs"><Link to='/dbs'>数据源管理</Link></Menu.Item>
                        <Menu.Item key="/function/functionList"><Link to='/function/functionList'>函数管理</Link></Menu.Item>
                        <Menu.Item key="/query/QueryList"><Link to='/query/QueryList'>查询管理</Link></Menu.Item>
                        <Menu.Item key="/dict/DictList"><Link to='/dict/DictList'>数据字典</Link></Menu.Item>
                        <Menu.Item key="/query/CreateTemplate"><Link to='/query/CreateTemplate'>定义查询模板</Link></Menu.Item>
                    </SubMenu> */}
                </Menu>
            </Sider>
        )
    }
}


