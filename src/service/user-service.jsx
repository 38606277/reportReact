
import   HttpService  from '../util/HttpService.jsx';
class User{
    // 用户登录
    login(loginInfo){
        return HttpService.post(
           '/reportServer/user/Reactlogin',
           JSON.stringify(loginInfo));
    }
    // 检查登录接口的数据是不是合法
    checkLoginInfo(loginInfo){
        let userCode= loginInfo.UserCode,
            Pwd = loginInfo.Pwd;
        // 判断用户名为空
        if(typeof userCode !== 'string' || userCode.length ===0){
            return {
                status: false,
                msg: '用户名不能为空！'
            }
        }
        // 判断密码为空
        if(typeof Pwd !== 'string' || Pwd.length ===0){
            return {
                status: false,
                msg: '密码不能为空！'
            }
        }
        return {
            status : true,
            msg : '验证通过'
        }
    }
    encodePwd(pwd){
        return HttpService.post('/reportServer/user/encodePwd',pwd);
    }
    // 退出登录
    logout(){
        return HttpService.post('/user/logout.do',null);
    }
    getUserList(listParam){
        return HttpService.post(
            '/reportServer/formUser/getUserListReact',
            JSON.stringify(listParam)
         );
    }
    getUserListRole(listParam){
        return HttpService.post(
            '/reportServer/formUser/getUserListRole',
            JSON.stringify(listParam)
         );
    }
    getUserInfo(userId){
        return HttpService.post(
            '/reportServer/formUser/getUserInfoByUserId',
            JSON.stringify({id:userId})
         );
    }
    saveUserInfo(userInfo){
        if(userInfo._id=='null'){
            return HttpService.post('/reportServer/formUser/addUser',JSON.stringify(userInfo));
        }else{
            return HttpService.post('/reportServer/formUser/updateUser',JSON.stringify(userInfo));
        }
    }
    delUser(id){
        return HttpService.post('/reportServer/formUser/deleteUser',id);
    }
    getRoleList(){
        let url='/reportServer/rule/getRoleList';
        return HttpService.post(url,{});
    }
    getRoleListByUserId(userid){
        return HttpService.post('reportServer/auth/getRoleListByUserId',JSON.stringify({'userid':userid}));
    }

    UpdatePwd(userInfo){
        return HttpService.post('/reportServer/formUser/updatePwd',JSON.stringify(userInfo));
    }
}

export default User;