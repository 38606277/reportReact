



export default class LocalStorage {
    // 跳转登录
    doLogin(){
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
    }
    // 成功提示
    successTips(successMsg) {
        alert(successMsg || '操作成功！');
    }
    // 错误提示
    errorTips(errMsg) {
        alert(errMsg || '好像哪里不对了~');
    }
    // 获取URL参数
    getUrlParam(name){
        // param=123&param1=456
        let queryString = window.location.href.split('#')[1] || '',
            reg         = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            result      = queryString.match(reg);

            // console.log("/query/QueryClass");
        return result ? decodeURIComponent(queryString) : null;
    }
    // 本地存储
    setStorage(name, value) {
        var curTime = new Date().getTime();
        //localStorage.setItem(key,JSON.stringify({data:value,time:curTime}));

        let dataType = typeof value;
        // json对象
        if (dataType === 'object') {
            window.localStorage.setItem(name, JSON.stringify({data:value,time:curTime}));

           // window.localStorage.setItem(name, JSON.stringify(data));
        }
        // 基础类型
        else if (['number', 'string', 'boolean'].indexOf(dataType) >= 0) {
            window.localStorage.setItem(name, JSON.stringify({data:value,time:curTime}));
        }
        // 其他不支持的类型
        else {
            alert('该类型不能用于本地存储');
        }
    }
    // 取出本地存储内容
    getStorage(name) {
        let data = window.localStorage.getItem(name);

        if (data && name!="lasurl") {
            let exp=1000*60*5*60;//1000*60*5*60
            let dataObj = JSON.parse(data);
            let t=new Date().getTime() - dataObj.time;
            if (t>exp) {
                window.localStorage.removeItem(name);
                let lasturl = window.location.href.split('#')[1] || '';
                window.localStorage.setItem('lasurl', lasturl);
                alert('登录信息已过期，请重新登录！');
                return '';
            }else{
                //console.log("data="+dataObj.data);
                //console.log(JSON.parse(dataObj.data));
                return dataObj.data;
            }
        } else {
            if(null!=data && 'null'!=data && ''!=data){
                return data;
            }else{
                return '';
            }
        }

        // if (data) {
        //     return JSON.parse(data);
        // }
        // else {
        //     return '';
        // }
    }
    // 删除本地存储
    removeStorage(name) {
        window.localStorage.removeItem(name);
    }
}