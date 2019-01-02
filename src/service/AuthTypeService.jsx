import HttpService from '../util/HttpService.jsx';
export default class AuthTypeService {
    // 获取函数列表
    getAuthTypeList() {
        let url = "reportServer/authType/getAllAuthTypeList";
        let param = {
        };
  
        return HttpService.post(url,param);
    }
    getAuthType(name){
        let url="reportServer/authType/getAuthTypeListByName";
        return HttpService.post(url,name);
    }
    saveAuthType(info){
        if(info.authtype_id=='null'){
            let url="reportServer/authType/saveAuthType";
            return HttpService.post(url,JSON.stringify(info));
        }else{
            let url="reportServer/authType/updateAuthType";
            return HttpService.post(url,JSON.stringify(info));
        }
    }
    deleteAuthType(name){
        let url="reportServer/authType/deleteAuthType";
        return HttpService.post(url,name);
    }
    getDbList(){
        let url="reportServer/DBConnection/ListAll";
        return HttpService.post(url,{});
    }
}
