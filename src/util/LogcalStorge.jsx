



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
        let queryString = window.location.search.split('?')[1] || '',
            reg         = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            result      = queryString.match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    }
    // 本地存储
    setStorage(name, data) {
        let dataType = typeof data;
        // json对象
        if (dataType === 'object') {
            window.localStorage.setItem(name, JSON.stringify(data));
        }
        // 基础类型
        else if (['number', 'string', 'boolean'].indexOf(dataType) >= 0) {
            window.localStorage.setItem(name, data);
        }
        // 其他不支持的类型
        else {
            alert('该类型不能用于本地存储');
        }
    }
    // 取出本地存储内容
    getStorage(name) {
        let data = window.localStorage.getItem(name);
        if (data) {
            return JSON.parse(data);
        }
        else {
            return '';
        }
    }
    // 删除本地存储
    removeStorage(name) {
        window.localStorage.removeItem(name);
    }
}