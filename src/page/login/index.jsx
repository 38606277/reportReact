/*
* @Author: Rosen
* @Date:   2018-01-25 17:37:22
* @Last Modified by:   Rosen
* @Last Modified time: 2018-01-26 12:29:31
*/
import React from 'react';
import User from '../../service/user-service.jsx'
import LocalStorge from '../../util/LogcalStorge.jsx';
 import './index.css';

const localStorge = new LocalStorge();
const _user = new User();

import './index.scss';
//localStorge.getUrlParam('redirect')
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userCode: '',
            Pwd: '',
            redirect: localStorge.getStorage('lasurl') || '/'
        }
    }
    componentWillMount() {
        // document.title = '登录 - report';
    }
    // 当用户名发生改变
    onInputChange(e) {
        if (!e || !(e.target || e.currentTarget)) {
            return false;
        }
        let inputValue = e.target.value !== undefined ? e.target.value : e.currentTarget.value,
            inputName = e.target.name !== undefined ? e.target.name : e.currentTarget.name;
        this.setState({
            [inputName]: inputValue
        });
    }
    onInputKeyUp(e) {
        if (e.keyCode === 13) {
            this.onSubmit();
        }
    }
    // 当用户提交表单
    onSubmit() {
        let loginInfo = {
            UserCode: this.state.UserCode,
            Pwd: this.state.Pwd,// "KfTaJa3vfLE=",
            //password : "admin",
            import: "",
            isAdmin: ""
        },
            checkResult = _user.checkLoginInfo(loginInfo);
        checkResult.states = true;
        // 验证通过
        if (checkResult.status) {
            _user.encodePwd(loginInfo.Pwd).then((response) => {
                loginInfo.Pwd = response.encodePwd;
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
        else {
            localStorge.errorTips(checkResult.msg);
        }

    }
    render() {
        return (

            <div class="log_main">
                <h1 class="title" style={{color:"#666"}}><br/></h1>
                <div class="rygl_up" style={{float:"right",marginRight:"180px"}}>

                    <div id="content" >


                        <div class="denglu">
                            <input name="UserCode" type="text" placeholder="请输入用户名" class="denglu_num"
                              onKeyUp={e => this.onInputKeyUp(e)}
                              onChange={e => this.onInputChange(e)} 
                            />
                            <input name="Pwd"type="password"  placeholder="请输入密码" class="denglu_psd"
                             onKeyUp={e => this.onInputKeyUp(e)}
                             onChange={e => this.onInputChange(e)}
                            />
                            <div class="denglu_zidong">
                                <input name="" type="checkbox" value="" checked="checked" class="fuxuan" />
                                <span>下次自动登录</span>
                                <span style={{float:'right'}}>忘记密码?</span>
                            </div>
                            <a href="#"><input name="" type="button" value="登录" class="denglu_btn" 
                               onClick={e => { this.onSubmit(e) }}/></a>
                        </div>

                    </div>
                </div>
            </div>


          
        );
    }
}

export default Login;