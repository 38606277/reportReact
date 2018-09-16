import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon, Row, Col, Button, Dropdown, Card } from 'antd';
import './Layout.scss';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

export default class MainLoyout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false,
        };

    }


    onCollapse(collapsed) {
        console.log(collapsed);
        this.setState({ collapsed });
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
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Header style={{ background: '#4b9adf', color: '#FFFF', padding: 0, height: "50px",lineHeight:"50px" }} >
                    <div style={{ float: "left",textAlign:"center",verticalAlign: "middle",width:"200px" }}>
                      
                       <span><Icon type="appstore" /><span style={{ marginLeft:"15px", color: "#ffffff", fontSize: "18px",fontWeight: "600" }}>财务报表平台</span></span>
                           {/* <span><h1 style={{ color: "#ffffff", fontSize: "16px",fontWeight: "700" }}>报表平台</h1></span> */}
                  
                        {/* <span >
                           
                            <h1 style={{ color: "#ffffff", fontSize: "20px",fontWeight: "700" }}>报表平台</h1>
                        </span>
                        <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16, marginLeft: 20 }}>
                            <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                        </Button> */}
                    </div>
                    <div style={{ float: "right", marginRight: "30px" }}>
                        
                        <span><Icon type="appstore" /><Icon type="home" /><Icon type="search" /></span>
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link" href="#">
                                我的 <Icon type="down" />
                            </a>
                        </Dropdown>,
                              {/* <a href="#">退出</a> */}
                    </div>
                    {/* <Row>
                            <Col span={3}>
                                <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16, marginLeft: 20 }}>
                                    <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                                </Button>
                            </Col>
                            <Col span={18}>
                                    <span>欢迎</span>
                              
                                    <a href="#">退出</a>
                                    <span style={{ width: "100px" }}>       </span>
                            </Col>
                        </Row> */}






                </Header>

                <Layout>
                    <Sider
                        collapsible
                        collapsed={this.state.collapsed}
                        onCollapse={() => this.onCollapse(this.state.collapsed)}
                        theme="light"
                    >


                        <Menu theme="light" defaultSelectedKeys={['1']} mode="inline"  >

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
                        <Card bodyStyle={{ padding:"1px", marginLeft: 2, background: '#fff', minHeight: 900 }}>
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

