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
        let url = "reportServer/auth/getMenuListNew";
        let param = {userId:userId};  
        return HttpService.post(url,JSON.stringify(param));
    }
    //获取staticReport目录下的文件目录
    getMyReports(){
        let url = "reportServer/web/getDirectory";
        return HttpService.post(url,null);
    }
    //获取需要进行替换的访问目录路径
    MyReportUrl(){
        let url = "reportServer/web/MyReportUrl";
        return HttpService.post(url,null);
    }
    getReportNameList(name){
        let url="reportServer/select/getSelectName/"+name;
        return HttpService.post(url,{});
    }
    getQueryCriteria(selectClassId){
        let url="reportServer/query/getQueryParam/"+selectClassId;
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
    selectLinkValue(qryId,outId){
        let url = "reportServer/query/getQueryOutLink/"+qryId+"/"+outId;;
        return HttpService.post(url,{});
    }

     // 获取权限可访问列表
     getQueryClassTreetwo(userId) {
        let url = "reportServer/auth/getClassId";
        let param = {userId:userId};  
        return HttpService.post(url,JSON.stringify(param));
    }
    getQryNameByClassId(obj){
        let url = "reportServer/auth/getQryNameByClassId";
        return HttpService.post(url,JSON.stringify(obj));
    }
    getAllQueryNameList(param){
        let url = "reportServer/query/getAllQueryNameList";
        return HttpService.post(url,JSON.stringify(param));
    }
    getCubeListInAuth(userId){
        let url = "reportServer/auth/getCubeListInAuth";
        let param = {userId:userId};  
        return HttpService.post(url,JSON.stringify(param));
    }
    getDashboardListInAuth(userId){
        let url = "reportServer/auth/getDashboardListInAuth";
        let param = {userId:userId};  
        return HttpService.post(url,JSON.stringify(param));
    }
}
