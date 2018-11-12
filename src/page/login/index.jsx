/*
* @Author: Rosen
* @Date:   2018-01-25 17:37:22
* @Last Modified by:   Rosen
* @Last Modified time: 2018-01-26 12:29:31
*/
import React        from 'react';
import User         from '../../service/user-service.jsx'
import LocalStorge  from '../../util/LogcalStorge.jsx';
import {Card,Form}       from 'antd';

const localStorge = new LocalStorge();
const _user = new User();

import './index.scss';
//localStorge.getUrlParam('redirect')
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userCode: '',
            Pwd: '',
            redirect: localStorge.getStorage('lasurl') || '/'
        }
    }
    componentWillMount(){
        document.title = '登录 - report';
    }
    // 当用户名发生改变
    onInputChange(e){
        let inputValue  = e.target.value,
            inputName   = e.target.name;
        this.setState({
            [inputName] : inputValue
        });
    }
    onInputKeyUp(e){
        if(e.keyCode === 13){
            this.onSubmit();
        }
    }
    // 当用户提交表单
    onSubmit(){
        let loginInfo = {
            UserCode : this.state.UserCode,
            Pwd :this.state.Pwd,// "KfTaJa3vfLE=",
           //password : "admin",
            import:"",
            isAdmin:""
            },
            checkResult = _user.checkLoginInfo(loginInfo);
            checkResult.states=true;
        // 验证通过
        if(checkResult.status){
            _user.encodePwd(loginInfo.Pwd).then((response) => {
                loginInfo.Pwd=response.encodePwd;
                _user.login(loginInfo).then((response) => {
                    localStorge.setStorage('userInfo', response.data);
                    this.props.history.push(this.state.redirect);
                }, (errMsg) => {
                    localStorge.errorTips(errMsg);
                });
            }, (errMsg) => {
                localStorge.errorTips(errMsg);
            });
            
        }
        // 验证不通过
        else{
            localStorge.errorTips(checkResult.msg);
        }
            
    }
    render(){
        return (
            <div className="wrapper-page">
                <div className="panel panel-color panel-primary panel-pages">
                <div className="panel-heading bg-img"> 
                    <div className="bg-overlay"></div>
                    <h3 className="text-center m-t-10 text-white">登录报表平台<strong></strong> </h3>
                </div> 


                <div className="panel-body panel_border">
                <div className="form-horizontal m-t-20 ng-dirty ng-touched ng-valid">
                    <div style={{color:'#e51e30'}}></div>
                    <div className="form-group ">
                        
                        <input type="text"
                                    name="UserCode"
                                    className="form-control input-lg panel_border"
                                    placeholder="请输入用户名" 
                                    onKeyUp={e => this.onInputKeyUp(e)}
                                    onChange={e => this.onInputChange(e)}/>
                        
                    </div>

                    <div className="form-group">
                       
                        <input type="password" 
                                    name="Pwd"
                                    className="form-control input-lg panel_border" 
                                    placeholder="请输入密码" 
                                    onKeyUp={e => this.onInputKeyUp(e)}
                                    onChange={e => this.onInputChange(e)}/>
                       
                    </div>

                    {/* <div className="form-group ">
                       
                            <div className="checkbox checkbox-primary">
                                <input className="panel_border ng-untouched ng-pristine ng-valid" id="checkbox-signup" name="isRemenberUserInfo" type="checkbox"/>
                                <label htmlFor="checkbox-signup">
                                    	三天之内免登陆
                                </label>
                            </div>
                    </div> */}
                    
                    <div className="form-group text-center m-t-40">
                       
                        <button className="btn btn-primary btn-lg w-lg waves-effect waves-light"
                                onClick={e => {this.onSubmit(e)}}>登录</button>
                        
                    </div>
                    
					
                </div> 
                </div>  
            </div>
            </div>
            
        );
    }
}

export default Login;