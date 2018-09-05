/*
* @Author: Rosen
* @Date:   2018-01-25 17:37:22
* @Last Modified by:   Rosen
* @Last Modified time: 2018-01-26 12:29:31
*/
import React        from 'react';
import MUtil        from 'util/mm.jsx'
import User         from 'service/user-service.jsx'

const _mm   = new MUtil();
const _user = new User();

import './index.scss';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userCode: '',
            Pwd: '',
            redirect: _mm.getUrlParam('redirect') || '/'
        }
    }
    componentWillMount(){
        document.title = '登录 - MMALL ADMIN';
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
            _user.encodePwd(loginInfo.Pwd).then((res) => {
                loginInfo.Pwd=res;
                _user.login(loginInfo).then((res) => {
                    _mm.setStorage('userInfo', res);
                    this.props.history.push(this.state.redirect);
                }, (errMsg) => {
                    _mm.errorTips(errMsg);
                });
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            });
            
        }
        // 验证不通过
        else{
            _mm.errorTips(checkResult.msg);
        }
            
    }
    render(){
        return (
            <div className="col-md-4 col-md-offset-4">
                <div className="panel panel-default login-panel">
                    <div className="panel-heading">欢迎登录 - 报表平台</div>
                    <div className="panel-body">
                        <div>
                            <div className="form-group">
                                <input type="text"
                                    name="UserCode"
                                    className="form-control"
                                    placeholder="请输入用户名" 
                                    onKeyUp={e => this.onInputKeyUp(e)}
                                    onChange={e => this.onInputChange(e)}/>
                            </div>
                            <div className="form-group">
                                <input type="password" 
                                    name="Pwd"
                                    className="form-control" 
                                    placeholder="请输入密码" 
                                    onKeyUp={e => this.onInputKeyUp(e)}
                                    onChange={e => this.onInputChange(e)}/>
                            </div>
                            <button className="btn btn-lg btn-primary btn-block"
                                onClick={e => {this.onSubmit(e)}}>登录</button>
                        </div>
                    </div>
                </div>
            </div>
                    
        );
    }
}

export default Login;