/*
* @Author: Rosen
* @Date:   2018-01-23 19:59:56
* @Last Modified by:   Rosen
* @Last Modified time: 2018-01-26 12:49:37
*/
import React        from 'react';
import { Link,Redirect  }     from 'react-router-dom';
import User         from 'service/user-service.jsx'
import './top.scss';
import LocalStorge  from '../../util/LogcalStorge.jsx';
const localStorge = new LocalStorge();
const _user = new User();

class NavTop extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userCode: localStorge.getStorage('userInfo').userCode || ''
        }
    }
    // 退出登录
    onLogout(){
       
        localStorge.removeStorage('userInfo');
        this.setState({redirect: true});
        // _user.logout().then(res => {
        //     _mm.removeStorage('userInfo');
        //     window.location.href = '/login';
        // }, errMsg => {
        //     _mm.errorTips(errMsg);
        // });
    }
    render(){
        if (this.state.redirect) {
            return <Redirect push to="/login" />; //or <Redirect push to="/sample?a=xxx&b=yyy" /> 传递更多参数
        }        
        return (
            <div id="wrapper">
                <div  className="topbar">
        
        <div  className="topbar-left">
            <div  className="text-center">
                <a  className="logo" href="#/index"><i  className="md md-terrain"></i> <span >财务报表平台</span></a>
            </div>
        </div>
        
        <div  className="navbar navbar-default" role="navigation">
            <div  className="container">
               
                    <div  className="pull-left">
                        <button  className="button-menu-mobile open-left">
                            <i  className="fa fa-bars"></i>
                        </button>
                        <span  className="clearfix"></span>
                    </div>
                    <div  className="navbar-form pull-left ng-untouched ng-pristine ng-valid" noValidate="" role="search">
                        <div  className="form-group">
                            <input  className="form-control search-bar" placeholder="查找aa..." type="text"/>
                        </div>
                        <button  className="btn btn-search" type="submit"><i  className="fa fa-search"></i></button>
                    </div>

                    <ul  className="nav navbar-nav navbar-right pull-right">
                        <li  className="dropdown">
                            <a  aria-expanded="true" className="dropdown-toggle profile waves-effect waves-light" data-toggle="dropdown" href="javascript:void(0)"><i  className="md md-settings"></i></a>
                            <ul  className="dropdown-menu">
                                <li ><a  href=""><i  className="md md-file-download">插件下载</i></a></li>
                            </ul>
                        </li>
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
                        <li  className="hidden-xs">
                            <a  className="waves-effect waves-light" href="javascript:void(0)" id="btn-fullscreen"><i  className="md md-crop-free"></i></a>
                        </li>
                        
                        <li  className="dropdown">
                            <a  aria-expanded="true" className="dropdown-toggle profile" data-toggle="dropdown" href=""><img  alt="user-img" className="img-circle" src="../images/users/avatar-3.jpg"/> </a>
                            <ul  className="dropdown-menu">
                                <li ><a  href="javascript:void(0)"><i  className="md md-face-unlock"></i> 个人信息</a></li>
                                <li ><a  href="javascript:void(0)"><i  className="md md-settings"></i> 设置</a></li>
                                <li ><a  href="javascript:void(0)"><i  className="md md-lock"></i> 锁屏</a></li>
                                <li ><a  href="javascript:void(0)"><i  className="md md-settings-power"></i> 退出</a></li>
                            </ul>
                        </li>
                    </ul>
               
                
            </div>
        </div>
    </div>
    {/* <div className="navbar navbar-default top-navbar">
                <div className="navbar-header">
                    <Link className="navbar-brand" to="/"><b>欢迎使用</b>报表平台</Link>
                </div>

                <ul className="nav navbar-top-links navbar-right">
                    <li className="dropdown">
                        <a className="dropdown-toggle" href="javascript:;">
                            <i className="fa fa-user fa-fw"></i>
                            {
                                this.state.userCode
                                ? <span>欢迎，{this.state.userCode}</span>
                                : <span>欢迎您</span>
                            }
                            <i className="fa fa-caret-down"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-user">
                            <li>
                                <a onClick={() => {this.onLogout()}}>
                                    <i className="fa fa-sign-out fa-fw"></i>
                                    <span>退出登录</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div> */}
            </div>
            
        );
    }
}

export default NavTop;