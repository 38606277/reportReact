import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Layout, Menu, Avatar, Icon, Tooltip, Button, Card, Popover } from 'antd';
import './Layout.scss';
import LocalStorge from '../../util/LogcalStorge.jsx';
const localStorge = new LocalStorge();
const { Header, Content, Sider } = Layout;
import logo from '../../asset/logo.png'
import Loadable from 'react-loadable';
import loading from '../../util/loading.jsx'

export default class TopBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false,
            visible: false,
            ishow: '0',
            userCode: localStorge.getStorage('userInfo') == '' ? '' : localStorge.getStorage('userInfo').userCode,
            userid:localStorge.getStorage('userInfo') == '' ? '' : localStorge.getStorage('userInfo').id,
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
        this.setState({ collapsed });
    }
    onselect(e) {
        this.setState({ ishow: e });
    }
    // 退出登录
    onLogout() {
        localStorge.removeStorage('userInfo');
        localStorge.removeStorage('lasurl');
        this.setState({ redirect: true });
    }

    linkUserInfo(){
        this.props.history.push("/user/userView/"+this.state.userid);
    }
    render() {
        if (this.state.redirect) {
            return <Redirect push to="/login" />; //or <Redirect push to="/sample?a=xxx&b=yyy" /> 传递更多参数
        }
        // const menu = (
        //     <Menu>
        //         <Menu.Item>
        //             <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">个人资料</a>
        //         </Menu.Item>
        //         <Menu.Item>
        //             <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">退出</a>
        //         </Menu.Item>
        //     </Menu>
        // );

        const ss = this.state.ishow;
        let contsss = null;
        let showwei = 'bottom';
        if (ss == '1') {
            contsss = <li className="dropdown">
                <ul className="dropdown-menu">
                    <li ><a href=""><i className="md md-file-download">插件下载</i></a></li>
                </ul>
            </li>;
            showwei = 'bottomLeft';
        } else if (ss == '2') {
            contsss = <li className="dropdown hidden-xs">
                <ul className="dropdown-menu dropdown-menu-lg">
                    <li className="text-center notifi-title">通知</li>
                    <li className="list-group">

                        <a className="list-group-item" href="javascript:void(0)" style={{ cursor: 'pointer' }}>
                            <div className="media">
                                <div className="pull-left">
                                    <Icon type='user-add' style={{ fontSize: '30px', color: '#29b6f6' }} />
                                </div>
                                <div className="media-body clearfix">
                                    <div className="media-heading">新用户注册</div>
                                    <p className="m-0">
                                        <small >你有10条未读的消息</small>
                                    </p>
                                </div>
                            </div>
                        </a>

                        <a className="list-group-item" href="javascript:void(0)" style={{ cursor: 'pointer' }}>
                            <div className="media">
                                <div className="pull-left">
                                    <Icon type="mail" theme="outlined" style={{ fontSize: '30px', color: '#1e88e5' }} />
                                </div>
                                <div className="media-body clearfix">
                                    <div className="media-heading">新闻设置</div>
                                    <p className="m-0">
                                        <small >有新的更新可用</small>
                                    </p>
                                </div>
                            </div>
                        </a>

                        <a className="list-group-item" href="javascript:void(0)" style={{ cursor: 'pointer' }}>
                            <div className="media">
                                <div className="pull-left">
                                    <Icon type="bell" style={{ fontSize: '30px', color: '#ef5350' }} />
                                </div>
                                <div className="media-body clearfix">
                                    <div className="media-heading">更新</div>
                                    <p className="m-0">
                                        <small >有
                                                        <span className="text-primary">2</span> 条新的更新可用</small>
                                    </p>
                                </div>
                            </div>
                        </a>

                        <a className="list-group-item" href="javascript:void(0)" style={{ cursor: 'pointer' }}>
                            <small >看所有的通知</small>
                        </a>
                    </li>
                </ul>
            </li>;
            showwei = 'bottom';
        } else if (ss == '3') {
            contsss = <li className="hidden-xs">
                <a className="waves-effect waves-light" href="javascript:void(0)" id="btn-fullscreen"><i className="md md-crop-free"></i></a>
            </li>;
        } else if (ss == '4') {
            contsss = <li className="dropdown">
                <ul className="dropdown-menu">
                    <li style={{ margin: '10px' }}>
                        <Link to={"/user/userView/"+this.state.userid}>
                            <Icon type="user" theme="outlined" style={{ fontSize: '18px', color: '#0a0a0a' }} /> 
                            <span style={{ fontSize: '16px', marginLeft: '5px', color: '#0a0a0a' }}>个人信息</span>
                         </Link>
                    </li>
                    <li style={{ margin: '10px' }}><Link to={"/user/UpdatePwd/"+this.state.userid}>
                        <Icon type="key" theme="outlined" style={{ fontSize: '18px', color: '#0a0a0a' }} /> 
                        <span style={{ fontSize: '16px', marginLeft: '5px', color: '#0a0a0a' }}>密码修改</span></Link>
                    </li>
                    <li style={{ margin: '10px' }} ><a href="javascript:void(0)"><Icon type="setting" theme="outlined" style={{ fontSize: '18px', color: '#0a0a0a' }} />
                        <span style={{ fontSize: '16px', marginLeft: '5px', color: '#0a0a0a' }}>设置</span></a>
                    </li>
                    <li style={{ margin: '10px' }} ><a onClick={() => { this.onLogout() }}><Icon type="logout" theme="outlined" style={{ fontSize: '18px', color: '#0a0a0a' }} />
                        <span style={{ fontSize: '16px', marginLeft: '5px', color: '#0a0a0a' }}>退出</span> </a>
                    </li>
                </ul>
            </li>;
            showwei = 'bottomRight';
        }
        const contenttwo = (<div ><ul className="nav navbar-nav navbar-right pull-right">{contsss}</ul></div>);

        return (
            <div>
                <div style={{ float: "left", paddingLeft: "10px", verticalAlign: "middle", width: "50%" }}>

                        <a href="javascript:;">
                            <img alt="logo" style={{ width: '30px', height: '30px' }} src={logo} />
                            <span style={{ marginLeft: "15px", color: "#ffffff", fontSize: "18px", fontWeight: "600" }}>财务报表平台</span>
                        </a>
                        {/* <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16, marginLeft: 20 }}>
                            <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                        </Button>  */}
                        <Tooltip title='缩回'>
                            <Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                            />
                        </Tooltip>
                        {/* <Tooltip>
                            <input type='text' className='search-bar' placeholder='查找...' />
                            <button className="btn-search" type="submit"><i className="fa fa-search"></i></button>
                        </Tooltip> */}
                    </div>
                <div style={{ float: "right", marginRight: "30px" }}>
                        {
                            this.state.userCode
                                ? <span>欢迎，{this.state.userCode}</span>
                                : <span>欢迎您</span>
                        }
                        <Tooltip>
                            <Popover
                                placement={showwei}
                                content={contenttwo}
                                trigger="click"
                                visible={this.state.visible}
                                onVisibleChange={this.handleVisibleChange}
                            >
                                <Button type="primary" style={{ color: '#ffffff', background: 'transparent', borderColor: 'transparent' }} onClick={() => this.onselect('1')}>
                                    <Icon type="setting" style={{ fontSize: '18px', color: '#ffffff', background: 'transparent', borderColor: 'transparent' }} />
                                </Button>
                                <Button type="primary" style={{ background: 'transparent', borderColor: 'transparent' }} onClick={() => this.onselect('2')}>
                                    <Icon type="bell" style={{ fontSize: '18px', color: '#ffffff', background: 'transparent' }} />
                                </Button>
                                {/* <Button type="primary" onClick={()=>this.onselect('3')}><Icon type="fullscreen" style={{ fontSize: '18px', color: '#ffffff' }}/></Button> */}
                                <Button type="primary" onClick={() => this.onselect('4')} style={{ background: 'transparent', borderColor: 'transparent' }}>
                                    <Avatar size="{32}" icon="user" />
                                </Button>
                            </Popover>
                        </Tooltip>
                        
                    </div> 
            </div>   
        );
    }
}

