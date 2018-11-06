import HttpService from '../util/HttpService.jsx';
export default class QueryService {
    // 获取函数列表
    getCategoryList() {
        let url = "reportServer/select/getSelectClass";
        let param = {};  
        return HttpService.post(url,param);
    }
    // 获取函数列表
    getSelectClassTree() {
        let url = "reportServer/select/getSelectClassTree";
        let param = {};  
        return HttpService.post(url,param);
    }
    // 获取权限可访问列表
    getQueryClassTree(userId) {
        let url = "reportServer/auth/getMenuList";
        let param = {userId:userId};  
        return HttpService.post(url,JSON.stringify(param));
    }
    getReportNameList(name){
        let url="reportServer/select/getSelectName/"+name;
        return HttpService.post(url,{});
    }
    getQueryCriteria(selectClassId){
        let url="reportServer/query/getQueryParamByFuncID/"+selectClassId;
        return HttpService.post(url,{});
    }
    execSelect(selectClassId,selectID,param){
        let url="reportServer/query/execQuery/"+selectID+"/"+selectClassId;
        return HttpService.post(url,JSON.stringify(param));
    }
    getDictionaryList(param,page){
        let url="reportServer/dict/getDictValueByID/"+param;
        return HttpService.post(url,JSON.stringify(page));
    }
    getAllQueryClass(){
        let url = "reportServer/query/getAllQueryClass";  
        return HttpService.post(url, '');
    }
    saveQueryClass(param){
        let url = "reportServer/query/createQueryClassInfo";
        return HttpService.post(url, JSON.stringify(param));
    }
    updateQueryClass(param){
        let url = "reportServer/query/updateQueryClassInfo";
        return HttpService.post(url, JSON.stringify(param));
    }
    deleteQueryClass(param){
        let url = "reportServer/query/deleteQueryClassInfo";
        return HttpService.post(url, JSON.stringify(param));
    }
}
