import React        from 'react';
import { Link }     from 'react-router-dom';
import MUtil        from 'util/mm.jsx'
import User         from 'service/user-service.jsx'
import { Form, Icon, Input, Button } from 'antd';
import './../../App.css';
import PageTitle    from 'component/page-title/index.jsx';
const _mm   = new MUtil();
const _user = new User();
const FormItem = Form.Item;
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }


class UserInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userId:this.props.match.params.userId,
            userInfo:''
        };
        this.tade = this.tade.bind(this);
    }
    tade(e){
        let value = e.target.value;
        this.setState({isAdmin: value})
 
   };
    componentDidMount(){
        this.loadUserInfo();
    }
    // 加载商品详情
    // loadProduct(){
    //     // 有id的时候，表示是编辑功能，需要表单回填
    //     if(this.state.id){
    //         _product.getProduct(this.state.id).then((res) => {
    //             let images = res.subImages.split(',');
    //             res.subImages = images.map((imgUri) => {
    //                 return {
    //                     uri: imgUri,
    //                     url: res.imageHost + imgUri
    //                 }
    //             });
    //             res.defaultDetail = res.detail;
    //             this.setState(res);
    //         }, (errMsg) => {
    //             _mm.errorTips(errMsg);
    //         });
    //     }
    // }
    // 简单字段的改变，比如商品名称，描述，价格，库存
    onValueChange(e){
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({
            [name] : value
        });
    }
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
        <PageTitle title={this.state.id ? '编辑用户' : '添加用户'} />
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">用户姓名</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control" 
                                placeholder="请输入商品名称"
                                name="userName"
                                value={this.state.userInfo.userName}
                                />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">用户角色</label>
                        <div className="col-md-5">
                            <select type="text" className="form-control"  name="isAdmin" value={this.state.userInfo.isAdmin} onChange={this.tade}>
                               
                                <option value='0' > 普通用户</option>
                                <option value='1'> 管理员</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">用户密码</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control" 
                                placeholder="请输入商品描述" 
                                name="isAdmin"
                                value={this.state.userInfo.isAdmin}
                               />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品价格</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" className="form-control" 
                                    placeholder="价格" 
                                    name="price"
                                    value={this.state.price}
                                    onChange={(e) => this.onValueChange(e)}/>
                                <span className="input-group-addon">元</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品库存</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" className="form-control" 
                                    placeholder="库存" 
                                    name="stock"
                                    value={this.state.stock}
                                    onChange={(e) => this.onValueChange(e)}/>
                                <span className="input-group-addon">件</span>
                            </div>
                            
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
        
        );
  }
}


export default UserInfo;