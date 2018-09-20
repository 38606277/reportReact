import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Avatar, Icon, Tooltip,Row, Col, Button, Dropdown, Card,Popover } from 'antd';
import './Layout.scss';
import logo from '../../asset/logo.png'

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

export default class MainLoyout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false,
            visible: false,
            ishow:'0',
           
        };

    }
    hide = () => {
        this.setState({
          visible: false,
        });
      }
      handleVisibleChange = (visible) => {
        this.setState({ visible });
      }
    toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      }
    onCollapse(collapsed) {
        console.log(collapsed);
        this.setState({ collapsed });
    }
    onselect(e) {

        this.setState({ ishow:e});
    }
    render() {
        const menu = (
            <Menu>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">个人资料</a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">退出</a>
                </Menu.Item>
            </Menu>
        );
        const contentsone = (
            <div>
                <ul  className="nav navbar-nav navbar-right pull-right">
                        <li  className="dropdown">
                            <a  aria-expanded="true" className="dropdown-toggle profile waves-effect waves-light" data-toggle="dropdown" href="javascript:void(0)"><i  className="md md-settings"></i></a>
                            <ul  className="dropdown-menu">
                                <li ><a  href=""><i  className="md md-file-download">插件下载</i></a></li>
                            </ul>
                        </li>
                        </ul>
            </div>
        );
        const ss=this.state.ishow;
        let contsss=null;
        if(ss=='1'){
            contsss=<ul  className="nav navbar-nav navbar-right pull-right">
                <li  className="dropdown hidden-xs">
                                <a  aria-expanded="true" className="dropdown-toggle waves-effect waves-light" data-toggle="dropdown" href="javascript:void(0)">
                                    <i  className="md md-notifications"></i> <span  className="badge badge-xs badge-danger">3</span>
                                </a>
                                <ul  className="dropdown-menu dropdown-menu-lg">
                                    <li  className="text-center notifi-title">通知</li>
                                    <li  className="list-group">
                                        
                                        <a  className="list-group-item" href="javascript:void(0)">
                                            <div  className="media">
                                                <div  className="pull-left">
                                                <em  className="fa fa-user-plus fa-2x text-info"></em>
                                                </div>
                                                <div  className="media-body clearfix">
                                                <div  className="media-heading">新用户注册</div>
                                                <p  className="m-0">
                                                    <small >你有10条未读的消息</small>
                                                </p>
                                                </div>
                                            </div>
                                        </a>
                                        
                                        <a  className="list-group-item" href="javascript:void(0)">
                                            <div  className="media">
                                                <div  className="pull-left">
                                                <em  className="fa fa-diamond fa-2x text-primary"></em>
                                                </div>
                                                <div  className="media-body clearfix">
                                                <div  className="media-heading">新闻设置</div>
                                                <p  className="m-0">
                                                    <small >有新的更新可用</small>
                                                </p>
                                                </div>
                                            </div>
                                        </a>
                                        
                                        <a  className="list-group-item" href="javascript:void(0)">
                                            <div  className="media">
                                                <div  className="pull-left">
                                                <em  className="fa fa-bell-o fa-2x text-danger"></em>
                                                </div>
                                                <div  className="media-body clearfix">
                                                <div  className="media-heading">更新</div>
                                                <p  className="m-0">
                                                    <small >有
                                                        <span  className="text-primary">2</span> 条新的更新可用</small>
                                                </p>
                                                </div>
                                            </div>
                                        </a>
                                        
                                        <a  className="list-group-item" href="javascript:void(0)">
                                            <small >看所有的通知</small>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                    </ul>;
        }else if(ss=='2'){
            contsss= <ul  className="nav navbar-nav navbar-right pull-right">
                        <li  className="dropdown">
                            <a  aria-expanded="true" className="dropdown-toggle profile waves-effect waves-light" data-toggle="dropdown" href="javascript:void(0)"><i  className="md md-settings"></i></a>
                            <ul  className="dropdown-menu">
                                <li ><a  href=""><i  className="md md-file-download">插件下载</i></a></li>
                            </ul>
                        </li>
                    </ul>;
        }else if(ss=='3'){
            contsss=<ul>
                        <li  className="hidden-xs">
                            <a  className="waves-effect waves-light" href="javascript:void(0)" id="btn-fullscreen"><i  className="md md-crop-free"></i></a>
                        </li>
                    </ul>;
         }else if(ss=='4'){
            contsss=
                 <ul>
                 <li  className="dropdown">
                             <a  aria-expanded="true" className="dropdown-toggle profile" data-toggle="dropdown" href=""><img  alt="user-img" className="img-circle" src="../images/users/avatar-3.jpg"/> </a>
                             <ul  className="dropdown-menu">
                                 <li ><a  href="javascript:void(0)"><i  className="md md-face-unlock"></i> 个人信息</a></li>
                                 <li ><a  href="javascript:void(0)"><i  className="md md-settings"></i> 设置</a></li>
                                 <li ><a  href="javascript:void(0)"><i  className="md md-lock"></i> 锁屏</a></li>
                                 <li ><a  href="javascript:void(0)"><i  className="md md-settings-power"></i> 退出</a></li>
                             </ul>
                         </li>
                </ul>;
        }
        const contenttwo = (
            <div>{contsss}
            </div>);
   
        
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Header style={{ background: '#4b9adf', color: '#FFFF', padding: 0, height: "50px", lineHeight: "50px" }} >
                    <div style={{ float: "left", paddingLeft:"10px", verticalAlign: "middle", width: "50%" }}>

                         <a href="javascript:;">
                            <img alt="logo" style={{ width: '30px', height: '30px' }} src={logo} />
                            <span style={{ marginLeft: "15px", color: "#ffffff", fontSize: "18px", fontWeight: "600" }}>财务报表平台</span>
                        </a>
                        <Tooltip title='缩回'>
                            <Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                            />
                           
                                
                            
                        </Tooltip>
                        <Tooltip>
                        <input type='text'className='search-bar' placeholder='查找...'/>
                        <button  className="btn-search" type="submit"><i  className="fa fa-search"></i></button>
                        </Tooltip>
                    </div>
                    <div style={{ float: "right", marginRight: "30px" }}>


                        <Tooltip>
                        <Popover
                            placement="bottom"
                            content={contenttwo}
                            trigger="click"
                            visible={this.state.visible}
                            onVisibleChange={this.handleVisibleChange}
                        >
                        <Button type="primary" onClick={()=>this.onselect('1')}><Icon type="setting" style={{ fontSize: '18px', color: '#ffffff' }}/></Button>
                        <Button type="primary" onClick={()=>this.onselect('2')}><Icon type="bell" style={{ fontSize: '18px', color: '#ffffff' }}/></Button>
                        {/* <Button type="primary" onClick={()=>this.onselect('3')}><Icon type="gateway" style={{ fontSize: '18px', color: '#ffffff' }}/></Button> */}
                        <Button type="primary" onClick={()=>this.onselect('4')}><Avatar size="large" icon="user" /></Button>
                        </Popover>         
                        
                        </Tooltip>

                        {/* <Tooltip>
                        <Popover
                            content={contenttwo}
                            title="通知"
                            trigger="click"
                            visible={this.state.visible}
                            onVisibleChange={this.handleVisibleChange}
                        >
                        <Button type="primary" onClick={()=>this.onselect('2')}><Icon type="bell" style={{ fontSize: '18px', color: '#ffffff' }}/></Button>
                        </Popover>
                                
                            
                        </Tooltip> 
                        <Tooltip title="使用文档">
                            <a
                                target="_blank"
                                href="https://pro.ant.design/docs/getting-started"
                                rel="noopener noreferrer"
                                style={{color:"#ECECEC"}} 
                                title="使用文档"
                            >
                                <Icon type="question-circle-o" style={{ fontSize: '18px', color: '#ffffff' }}/>
                            </a>
                        </Tooltip>*/}

                    </div>
                   
                </Header>

                <Layout>
                    <Sider
                        trigger={null}
                        collapsible
                        collapsed={this.state.collapsed}
                        onCollapse={() => this.onCollapse(this.state.collapsed)}
                        theme="dark"
                    >


                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline"  >

                            <Menu.Item key="sub"><Link to='/'><Icon type="home" />首页</Link></Menu.Item>
                            <SubMenu key="sub1" title={<span><Icon type="appstore" /><span>我的任务</span></span>}>
                                <Menu.Item key="/product/index"><Link to='/product/index'>代办任务</Link></Menu.Item>
                                <Menu.Item key="/product/taskList"><Link to='/product/taskList'>已办任务</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub4" title={<span><Icon type="setting" /><span>系统管理</span></span>}>
                                <Menu.Item key="/user/index"><Link to='/user/index'>用户管理</Link></Menu.Item>
                                <Menu.Item key="10">权限管理</Menu.Item>
                                <Menu.Item key="11">连接管理</Menu.Item>
                                <Menu.Item key="12">权限类型管理</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub5" title={<span><Icon type="solution" /><span>基础信息</span></span>}>
                                <Menu.Item key="/function/functionList"><Link to='/function/functionList'>函数管理</Link></Menu.Item>
                                <Menu.Item key="/query/QueryList"><Link to='/query/QueryList'>查询管理</Link></Menu.Item>
                                <Menu.Item key="14">数据字典</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Content>
                        {/* <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb> */}
                        <Card bodyStyle={{ padding: "1px", marginLeft: 2, background: '#fff', minHeight: 900 }}>
                            {this.props.children}
                        </Card>
                    </Content>
                    {/* <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer> */}
                </Layout>
            </Layout>
        );
    }
}

