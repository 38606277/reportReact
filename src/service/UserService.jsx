
import HttpService from '../common/HttpService.jsx';


import  LocalStorge  from '../common/LogcalStorge.jsx';



const localStorge = new LocalStorge();


export default class UserService {
   
    constructor(){
      
    }


    // 检查登录接口的数据是不是合法
    checkLoginInfo(loginInfo){
        let UserCode = loginInfo.UserCode,
            Pwd = loginInfo.Pwd;
        // 判断用户名为空
        if(typeof UserCode !== 'string' || UserCode.length ===0){
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
    // 退出登录
    logout(){
        return _mm.request({
            type    : 'post',
            url     : '/user/logout.do'
        });
    }

    //用户登录方法
    Login=(loginInfo)=>{
        let url = "reportServer/user/encodePwd";
        let pwd = loginInfo.Pwd;
        let encodePwd='';
        HttpService.post(url,pwd)
        
        .then((json)=>{
            loginInfo.Pwd=json.encodePwd;
            //alert( loginInfo.Pwd);
            return new Promise(function (resolve, reject) {
                console.log('start new Promise...');
                resolve(123);
            });

        })
        .then((p1)=>{
            console.log('login'+p1);
            let loginUrl = "reportServer/user/login";
            return  HttpService.post(loginUrl,JSON.stringify(loginInfo));

        })
        .then((res)=>{
            console.log("success!"+res.LOGINRESULT);
            localStorge.setStorage('userInfo', JSON.stringify(res));
            window.location.href="#/ListUser";
        });
     
    }
    
    // 获取用户列表
    getUserList = () => {

        let url = "reportServer/DBConnection/ListAll";
        let param = {
            name: 'Hubot',
            login: 'hubot'
        };
  
        return HttpService.post(url,param);

    }



}
