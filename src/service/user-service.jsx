/*
* @Author: Rosen
* @Date:   2018-01-25 21:21:46
* @Last Modified by:   Rosen
* @Last Modified time: 2018-01-31 13:33:42
*/
import MUtil        from 'util/mm.jsx'

const _mm   = new MUtil();

class User{
    // 用户登录
    login(loginInfo){
        return _mm.request({
            type: 'post',
            // url: '/manage/user/login.do',
           // data: loginInfo
           url:'/reportServer/user/Reactlogin',
           data: JSON.stringify(loginInfo)
        });
    }
    // 检查登录接口的数据是不是合法
    checkLoginInfo(loginInfo){
        let userCode= $.trim(loginInfo.UserCode),
            Pwd = $.trim(loginInfo.Pwd);
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
        return _mm.request({
            type    : 'post',
            url     : '/reportServer/user/encodePwdReact',
            data    :JSON.stringify({Pwd:pwd})
        });
    }
    // 退出登录
    logout(){
        return _mm.request({
            type    : 'post',
            url     : '/user/logout.do'
        });
    }
    getUserList(listParam){
        return _mm.request({
            type    : 'post',
            url     : '/reportServer/formUser/getUserListReact', //'/manage/user/list.do',
            data    : JSON.stringify(listParam)
           
        });
    }
    getUserInfo(userId){
        return _mm.request({
            type    : 'post',
            url     : '/reportServer/formUser/getUserInfoByUserId', //'/manage/user/list.do',
            data    : JSON.stringify({id:userId})
           
        });
    }
    saveUserInfo(userInfo){
        return _mm.request({
            type    : 'post',
            url     : userInfo._id=='null'?'/reportServer/formUser/addUser':'/reportServer/formUser/updateUser', //'/manage/user/list.do',
            data    : JSON.stringify(userInfo)
           
        });
    }

}

export default User;