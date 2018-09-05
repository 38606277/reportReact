import React        from 'react';
import { Link }     from 'react-router-dom';
import MUtil        from 'util/mm.jsx'
import User         from 'service/user-service.jsx'

import './../../App.css';
import PageTitle    from 'component/page-title/index.jsx';

import update from 'immutability-helper';
const _mm   = new MUtil();
const _user = new User();

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }


class UserInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userId:this.props.match.params.userId,
            userInfo:{
                userName:'',
                isAdmin:'',
                regisType:'',
                encryptPwd:'',
                userId:'',
                startDate:'',
                endDate:'',
                description:''
            }
        };
        this.selectOption = this.selectOption.bind(this);
    }
    
   selectOption(e){
        let name = e.target.name,
            value = e.target.value.trim();
        //this.state.userInfo.regisType= value;
        this.state.userInfo = update(this.state.userInfo, {[name]: {$apply: function(x) {return value;}}});
        this.setState(this.state.userInfo)           
    };
//初始化加载调用方法
    componentDidMount(){
        this.loadUserInfo();
    }

    //保存数据
    onSubmit(){
        console.log(this.state.userInfo);
    }
    
    //编辑字段对应值
    onValueChange(e){
        let name = e.target.name,
            value = e.target.value.trim();
            this.state.userInfo = update(this.state.userInfo, {[name]: {$apply: function(x) {return value;}}});
            this.setState(this.state.userInfo);
      
    }
    //加载数据
    loadUserInfo(){
        _user.getUserInfo(this.state.userId).then(res => {
            this.setState(res);
        }, errMsg => {
            this.setState({
                
            });
            _mm.errorTips(errMsg);
        });
    }
    render() {
       
        return (
        <div id="page-wrapper">
        <PageTitle title='编辑用户' />
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">用户姓名</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control" 
                                placeholder="请输入用户名称"
                                name="userName"
                                value={this.state.userInfo.userName}  onChange={(e) => this.onValueChange(e)}
                                />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">用户角色</label>
                        <div className="col-md-5">
                            <select type="text" className="form-control"  name="isAdmin" onChange={this.selectOption} value={this.state.userInfo.isAdmin} >
                                <option value='0' > 普通用户</option>
                                <option value='1'> 管理员</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">用户归属</label>
                        <div className="col-md-5">
                            <select type="text" className="form-control"  name="regisType"  onChange={this.selectOption}
                                 value={this.state.userInfo.regisType} >
                                <option value="erp" >ERP用户</option>
                                <option value="local"> 本地用户</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">用户密码</label>
                        <div className="col-md-5">
                            <input type="password" className="form-control" 
                                placeholder="请输入密码" 
                                name="encryptPwd"
                                value={this.state.userInfo.encryptPwd}  onChange={(e) => this.onValueChange(e)}
                               />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">确认密码</label>
                        <div className="col-md-5">
                            <input type="password" className="form-control" 
                                placeholder="请输入确认密码" 
                                name="ensurePwd"
                                value={this.state.userInfo.ensurePwd}  onChange={(e) => this.onValueChange(e)}
                               />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">用户编号</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control" 
                                placeholder="请输入密码" 
                                name="userId"
                                value={this.state.userInfo.userId}  onChange={(e) => this.onValueChange(e)}
                               />
                        </div>
                    </div>

                     
                    <div className="form-group">
                        <label className="col-md-2 control-label">生效时间</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control" 
                                placeholder="请输入密码" 
                                name="startDate"
                                value={this.state.userInfo.startDate}  onChange={(e) => this.onValueChange(e)}
                               />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">失效时间</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control" 
                                placeholder="请输入密码" 
                                name="endDate"
                                value={this.state.userInfo.endDate}  onChange={(e) => this.onValueChange(e)}
                               />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">备注</label>
                        <div className="col-md-3">
                       
                               <textarea className="form-control" 
                                name="description" value={this.state.userInfo.description}  onChange={(e) => this.onValueChange(e)}></textarea>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-offset-2 col-md-10">
                            <button type="submit" className="btn btn-primary" 
                                onClick={(e) => {this.onSubmit(e)}}>提交</button>
                        </div>
                    </div>
                </div>
            
        </div>
        
        )
  }
}


export default UserInfo;